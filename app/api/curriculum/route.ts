import { NextResponse } from 'next/server';
import { readdirSync } from 'fs';
import { join } from 'path';
import { loadWcagRuleMap, extractWcagComponents, lookupWcagInfo } from '@/lib/wcag/utils';

export async function GET() {
  const dir = join(process.cwd(), 'public', 'curriculum', 'lessons');
  const ruleMap = loadWcagRuleMap();
  
  const files = readdirSync(dir);
  const lessons = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const id = file.replace('.md', '');
      
      const { principleNum, guidelineNum, criteriaNum } = extractWcagComponents(id);
      const { principle, guideline, successCriteria, title } = lookupWcagInfo(
        ruleMap, principleNum, guidelineNum, criteriaNum,
      );
      
      return {
        id,
        title,
        principle,
        guideline,
        success_criteria: successCriteria,
      };
    });

  return NextResponse.json(lessons);
}