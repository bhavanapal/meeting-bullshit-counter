export function calculateClarity(transcript: string): number {
  const vagueWords = [
    'maybe',
    'perhaps',
    'kind of',
    'sort of',
    'might',
    'possibly',
    'basically',
    'actually',
    'i think',
  ];

  const words = transcript.toLowerCase().split(/\s+/);

  let vagueCount = 0;

  for (const phrase of vagueWords) {
    const matches = transcript
      .toLowerCase()
      .match(new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'));
    vagueCount += matches?.length ?? 0;
  }

  const totalWords = transcript.split(/\s+/).filter(Boolean).length;

  if (totalWords === 0) {
    return 100;
  }

  const clarity = 100 - (vagueCount / words.length) * 100;

  return Math.max(0, Math.min(100, Math.round(clarity)));
}
