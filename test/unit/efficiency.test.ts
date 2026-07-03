import { describe, expect, it } from 'vitest';
import { calculateEfficiency } from '../../src/services/metrics/efficiency.js';

describe('calculateEfficiency', () => {
  it('returns score between 0 and 100', () => {
    const score = calculateEfficiency(20, 10, 80, 2);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});
