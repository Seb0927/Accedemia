import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { 
  loadWcagRuleMap, 
  loadWcagFileMap, 
  extractWcagComponents, 
  getWcagData, 
} from "@/lib/wcag";
import { Lesson } from "@/types/curriculum";

export async function GET(_: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const filePath = join(process.cwd(), "public", "curriculum", "lessons", `${params.id}.md`);

  if (!existsSync(filePath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const content = readFileSync(filePath, "utf-8");

  // Add WCAG information to the response
  const ruleMap = loadWcagRuleMap();
  const fileMap = loadWcagFileMap();
  const { principleNum, guidelineNum, criteriaNum } = extractWcagComponents(params.id);
  const wcagData = getWcagData(
    ruleMap, 
    fileMap, 
    principleNum, 
    guidelineNum, 
    criteriaNum,
  );

  return NextResponse.json({ 
    id: params.id, 
    content,
    title: wcagData.title,
    principle: wcagData.principle,
    guideline: wcagData.guideline,
    success_criteria: wcagData.successCriteria,
    file_path: wcagData.filePath,
  } as Lesson);
}