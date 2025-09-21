import { WcagRuleMap, WcagFileMap } from "./types";

export function lookupWcagRuleInfo(
  ruleMap: WcagRuleMap, 
  principleNum: string, 
  guidelineNum: string, 
  criteriaNum: string,
): { principle: string; guideline: string; successCriteria: string; title: string } {
  try {
    const principle = ruleMap[principleNum]?.name || "";
    const guideline = ruleMap[principleNum]?.guidelines[guidelineNum]?.name || "";
    const successCriteria = ruleMap[principleNum]?.guidelines[guidelineNum]?.criteria[criteriaNum]?.name || "";
    const title = ruleMap[principleNum]?.guidelines[guidelineNum]?.criteria[criteriaNum]?.title || "";
    
    return { principle, guideline, successCriteria, title };
  } catch (error) {
    console.error("Error finding rule information:", error);
    return { principle: "", guideline: "", successCriteria: "", title: "" };
  }
}

// Single responsibility: Look up file path
export function lookupWcagFilePath(
  fileMap: WcagFileMap,
  principleNum: string,
  guidelineNum: string,
  criteriaNum: string,
): string {
  try {
    return fileMap[principleNum]?.[guidelineNum]?.[criteriaNum]?.file || "/";
  } catch (error) {
    console.error("Error finding file path:", error);
    return "/";
  }
}