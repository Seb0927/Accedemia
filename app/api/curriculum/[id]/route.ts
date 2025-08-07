import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { loadWcagRuleMap, extractWcagComponents, lookupWcagInfo } from '@/lib/wcag/utils';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const filePath = join(process.cwd(), 'public', 'curriculum', 'lessons', `${params.id}.md`);

  if (!existsSync(filePath)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const content = readFileSync(filePath, 'utf-8');
  
  // Add WCAG information to the response
  const ruleMap = loadWcagRuleMap();
  const { principleNum, guidelineNum, criteriaNum } = extractWcagComponents(params.id);
  const { principle, guideline, successCriteria } = lookupWcagInfo(
    ruleMap, principleNum, guidelineNum, criteriaNum
  );

  return NextResponse.json({ 
    id: params.id, 
    content,
    principle,
    guideline,
    success_criteria: successCriteria,
  });
}