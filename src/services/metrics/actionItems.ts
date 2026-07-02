export function calculateActionItems(transcript: string): string[] {
  const actionPatterns = [
    /we need to/i,
    /need to/i,
    /will\s+\w+/i,
    /let'?s/i,
    /should implement/i,
    /should/i,
    /assign.*to/i,
    /follow up/i,
    /action item/i,
    /owner/i,
    /deadline/i,
  ];

  const sentences = transcript
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return sentences.filter((sentence) => actionPatterns.some((pattern) => pattern.test(sentence)));
}