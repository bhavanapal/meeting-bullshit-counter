import { describe, expect, it } from 'vitest';
import { calculateRepetition } from '../../src/services/metrics/repetition.js';

describe('calculateReptition', () => {
  it('returns 0 for empty text', () => {
    expect(calculateRepetition('')).toBe(0);
  });

  it('detects repeated phrases', () => {
    const score = calculateRepetition('We should circle back. We should circle back.');
    expect(score).toBeGreaterThan(0);
  });
});
