export function calculateEfficiency(
  repetitionScore: number,
  fillerPercentage: number,
  clarityScore: number,
  actionItems: number,
): number {
  console.log('EFFICIENCY INPUTS', {
    repetitionScore,
    fillerPercentage,
    clarityScore,
    actionItems,
  });

  const score =
    clarityScore * 0.4 +
    (100 - repetitionScore) * 0.3 +
    (100 - fillerPercentage) * 0.2 +
    Math.min(actionItems * 5, 10);
  console.log('RAW SCORE', score);

  return Math.round(Math.max(0, Math.min(100, score)));
}
