export function extractWcagComponents(id: string): { 
  principleNum: string; 
  guidelineNum: string; 
  criteriaNum: string 
} {
  const parts = id.split("-");
  return {
    principleNum: parts[1] || "",
    guidelineNum: parts[2] || "",
    criteriaNum: parts[3] || "",
  };
}