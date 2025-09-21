export interface SuccessCriterion {
  name: string;
  level: string;
  description: string;
  title: string;
}

export interface Guideline {
  name: string;
  description: string;
  criteria: Record<string, SuccessCriterion>;
}

export interface Principle {
  name: string;
  description: string;
  guidelines: Record<string, Guideline>;
}

export interface WcagRuleMap {
  [principleNum: string]: Principle;
}