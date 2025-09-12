import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { promises as fs } from "fs";
import path from "path";

// Initialize Gemini API with environment variable
const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || "" });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      lessonTitle,
      successCriterion,
      originalCode,
      studentCode,
    } = body;

    // Validate required fields
    if (!successCriterion || !studentCode) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 },
      );
    }

    // Load instructions from the file
    const instructions = await fetchEvaluationInstructions();

    // Create prompt for the model
    const prompt = `
    # Evaluate Web Accessibility

    ## Lesson Information
    - Title: ${lessonTitle}
    - Criterion: ${successCriterion}

    ## Code to Evaluate
    Original Code (inaccessible):
    \`\`\`
    ${originalCode}
    \`\`\`

    Student Solution:
    \`\`\`
    ${studentCode}
    \`\`\`

    ${instructions}
    `;

    // Generate content with the model
    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            success: {
              type: Type.BOOLEAN,
              description: "Whether the student's solution meets the accessibility requirements",
            },
            explanation: {
              type: Type.STRING,
              description: "Clear explanation of why the solution succeeds or fails",
            },
            technique: {
              type: Type.STRING,
              description: "The specific WCAG technique applied or that should have been applied",
            },
          },
          required: ["success", "explanation", "technique"],
          propertyOrdering: ["success", "explanation", "technique"],
        },
      },
    });

    const text = result.text;

    if (!text) {
      return NextResponse.json(
        { error: "Empty response from Gemini model" },
        { status: 500 },
      );
    }

    try {
      // Parse the text directly without modifications
      const evaluationResult = JSON.parse(text);
      return NextResponse.json(evaluationResult);
    } catch (error) {
      console.error("Failed to parse Gemini response:", error);
      
      // If direct parsing fails, try a more lenient approach
      try {
        // Remove any potential markdown code block markers if present
        const cleanText = text.replace(/```json\s*|\s*```/g, "");
        const evaluationResult = JSON.parse(cleanText);
        return NextResponse.json(evaluationResult);
      } catch {
        return NextResponse.json(
          { error: "Failed to parse evaluation result", rawResponse: text },
          { status: 500 },
        );
      }
    }
  } catch (error) {
    console.error("Evaluation error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate code", message: error },
      { status: 500 },
    );
  }
}

// Helper function to fetch the evaluation instructions
async function fetchEvaluationInstructions() {
  try {
    const instructionsPath = path.join(process.cwd(), "public", "curriculum", "llms.md");
    return await fs.readFile(instructionsPath, "utf-8");
  } catch (error) {
    console.error("Failed to read instructions from filesystem:", error);
    return "";
  }
}