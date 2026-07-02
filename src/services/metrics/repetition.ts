export function calculateRepetition(transcript: string): number {
  const text = transcript.toLowerCase();

  const repetitivePhrases = [
    'circle back',
    'revisit',
    'already discussed',
    'as discussed',
    'as mentioned',
    'follow up',
    'touch base',
    'sync up',
    'take this offline',
    'going in circles',
  ];

  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length === 0) {
    return 0;
  }

  let phraseHits = 0;

  for (const phrase of repetitivePhrases) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const matches = text.match(new RegExp(`\\b${escaped}\\b`, 'gi'));

    phraseHits += matches?.length ?? 0;
  }

  const sentenceCounts = new Map<string, number>();

  for (const sentence of sentences) {
    sentenceCounts.set(sentence, (sentenceCounts.get(sentence) || 0) + 1);
  }

  let duplicateHits = 0;

  for (const count of sentenceCounts.values()) {
    if (count > 1) {
      duplicateHits += count - 1;
    }
  }

  const totalHits = phraseHits + duplicateHits;

  return Math.min(100, Math.round((totalHits / sentences.length) * 100));
}
