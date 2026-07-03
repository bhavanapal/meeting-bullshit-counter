import { describe, expect, it } from 'vitest';
import { calculateClarity } from '../../src/services/metrics/clarity.js';

describe('calculateClarity', () => {
  it('return less than 100 when vague words exist', () => {
    const result = calculateClarity('I think maybe this is kind of okay');
    expect(result).toBeLessThan(100);
  });
});
