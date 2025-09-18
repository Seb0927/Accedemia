import { readFileSync } from "fs";
import { join } from "path";
import { WcagRuleMap } from "./types";

// Extract WCAG components from an ID (e.g., "wcag-1-2-3")
export function extractWcagComponents(id: string): { principleNum: string; guidelineNum: string; criteriaNum: string } {
  const parts = id.split("-");
  return {
    principleNum: parts[1] || "",
    guidelineNum: parts[2] || "",
    criteriaNum: parts[3] || "",
  };
}

// Look up WCAG information from the rule map
export function lookupWcagInfo(
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

// Load the WCAG rule map
export function loadWcagRuleMap(): WcagRuleMap {
  const ruleMapPath = join(process.cwd(), "public", "curriculum", "wcag_rule_map.json");
  return JSON.parse(readFileSync(ruleMapPath, "utf-8"));
}