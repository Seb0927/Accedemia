import { NextResponse } from "next/server";
import { readdirSync } from "fs";
import { join } from "path";
import { 
  loadWcagRuleMap, 
  extractWcagComponents, 
  getWcagRuleData,
} from "@/lib/wcag";
import { Lesson } from "@/types/curriculum";

export async function GET() {
  try {
    const dir = join(process.cwd(), "public", "curriculum", "lessons");
    const ruleMap = loadWcagRuleMap();
    
    const files = readdirSync(dir);
    const lessons = files
      .filter(file => 
        file.endsWith(".md") && 
        !["wcag-2-1-1.md", "wcag-2-5-4.md", "template.md"].includes(file),
      )
      .map((file): Lesson => {
        const id = file.replace(".md", "");
        
        const { principleNum, guidelineNum, criteriaNum } = extractWcagComponents(id);
        const wcagData = getWcagRuleData(
          ruleMap, 
          principleNum, 
          guidelineNum, 
          criteriaNum,
        );
        
        return {
          id,
          title: wcagData.title,
          principle: wcagData.principle,
          guideline: wcagData.guideline,
          success_criteria: wcagData.successCriteria,
        };
      });

    return NextResponse.json(lessons);
    
  } catch (error) {
    console.error("Error loading curriculum:", error);
    return NextResponse.json(
      { error: "Failed to load curriculum" }, 
      { status: 500 },
    );
  }
}