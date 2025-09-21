import { readFileSync } from "fs";
import { join } from "path";
import { WcagRuleMap, WcagFileMap } from "./types";

export function loadWcagRuleMap(): WcagRuleMap {  
  try {
    const ruleMapPath = join(process.cwd(), "public", "curriculum", "wcag_rule_map.json");
    return JSON.parse(readFileSync(ruleMapPath, "utf-8"));
  } catch (error) {
    console.error("Error loading WCAG rule map:", error);
    return {};
  }
}

export function loadWcagFileMap(): WcagFileMap {
  try {
    const fileMapPath = join(process.cwd(), "public", "curriculum", "wcag_file_map.json");
    return JSON.parse(readFileSync(fileMapPath, "utf-8"));
  } catch (error) {
    console.error("Error loading WCAG file map:", error);
    return {};
  }
}