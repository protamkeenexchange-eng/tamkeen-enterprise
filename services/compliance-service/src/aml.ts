export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'BLOCKED';

export interface AMLInput {
  userId: string;
  amount: number;
  country?: string;
  velocityScore?: number;
  flagged?: boolean;
}

export function runAMLCheck(input: AMLInput): { risk: RiskLevel; reasons: string[] } {
  const reasons: string[] = [];
  let score = 0;

  if (input.amount > 10000) {
    score += 40;
    reasons.push('High transaction amount');
  }

  if (input.velocityScore && input.velocityScore > 80) {
    score += 30;
    reasons.push('High transaction velocity');
  }

  if (input.flagged) {
    score += 50;
    reasons.push('User previously flagged');
  }

  if (input.country && ['IR', 'KP', 'SY'].includes(input.country)) {
    score += 60;
    reasons.push('Sanctioned or high-risk jurisdiction');
  }

  if (score >= 80) return { risk: 'BLOCKED', reasons };
  if (score >= 50) return { risk: 'HIGH', reasons };
  if (score >= 20) return { risk: 'MEDIUM', reasons };

  return { risk: 'LOW', reasons };
}