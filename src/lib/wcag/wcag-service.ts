import { WcagRuleMap, WcagFileMap, WcagLessonData } from "./types";
import { lookupWcagRuleInfo, lookupWcagFilePath } from "./lookups";

export function getWcagData(
  ruleMap: WcagRuleMap,
  fileMap: WcagFileMap,
  principleNum: string,
  guidelineNum: string,
  criteriaNum: string,
): WcagLessonData {
  const ruleInfo = lookupWcagRuleInfo(ruleMap, principleNum, guidelineNum, criteriaNum);
  const filePath = lookupWcagFilePath(fileMap, principleNum, guidelineNum, criteriaNum);
  
  return {
    ...ruleInfo,
    filePath,
  };
}

export function getWcagRuleData(
  ruleMap: WcagRuleMap,
  principleNum: string,
  guidelineNum: string,
  criteriaNum: string,
) {
  return lookupWcagRuleInfo(ruleMap, principleNum, guidelineNum, criteriaNum);
}
