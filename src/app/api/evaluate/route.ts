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
      successCriterion,
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
    
    // Load the specific prompt for this criterion
    const promptContent = await fetchPromptForCriterion(successCriterion);
    
    if (!promptContent) {
      return NextResponse.json(
        { error: `No prompt found for criterion: ${successCriterion}` },
        { status: 404 },
      );
    }

    // Create prompt for the model
    const prompt = `
    ${promptContent}

    ${studentCode}
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
          },
          required: ["success", "explanation"],
          propertyOrdering: ["success", "explanation"],
        },
        systemInstruction: instructions,
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

// Helper function to fetch the prompt for a specific criterion
async function fetchPromptForCriterion(criterion: string) {
  try {
    // Extract WCAG number (e.g., "1.1.1" from "1.1.1 Non-text Content (Level A)")
    const wcagNumberMatch = criterion;
    
    if (!wcagNumberMatch) {
      console.error(`Could not extract WCAG number from criterion: ${criterion}`);
      return null;
    }
    
    const wcagFileName = `${criterion}.md`;
    const promptPath = path.join(process.cwd(), "public", "curriculum", "prompts", wcagFileName);
    
    try {
      return await fs.readFile(promptPath, "utf-8");
    } catch (fileError) {
      console.error(`Prompt file not found: ${wcagFileName}`, fileError);
      // If specific file not found, try using the template
      const templatePath = path.join(process.cwd(), "public", "curriculum", "prompts", "template.md");
      return await fs.readFile(templatePath, "utf-8");
    }
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return null;
  }
}