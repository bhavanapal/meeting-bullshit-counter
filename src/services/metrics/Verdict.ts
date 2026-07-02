export function getVerdict(score: number): string {
  if (score >= 80) return 'Highly productive';

  if (score >= 60) return 'Moderately productive';

  if (score >= 40) return 'Average meeting, Needs improvement';

  return 'Mostly wasteful';
}