export function calculateFillers(transcript: string): number {
  const fillers = [
    'um',
    'uh',
    'like',
    'basically',
    'actually',
    'you know',
    'maybe',
    'sort of',
    'I think',
    'I think maybe',
    'sounds good',
    'looks good',
    'great',
    'okay',
    'kind of',
    'looks good',
    'we should discuss',
    'lets talk about',
    'we can explore',
  ];

  const lowerTranscript = transcript.toLowerCase();

  let fillerCount = 0;

  for (const filler of fillers) {
    const escaped = filler.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const matches = lowerTranscript.match(new RegExp(`\\b${escaped}\\b`, 'gi'));

    fillerCount += matches?.length ?? 0;
  }

  const totalWords = transcript.trim().split(/\s+/).filter(Boolean).length;

  if (totalWords === 0) return 0;

  return Number(((fillerCount / totalWords) * 100).toFixed(2));
}