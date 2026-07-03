import { calculateFillers } from '../../src/services/metrics/filler.js';
import { describe, expect, it } from 'vitest';

describe('calculateFillers', () => {
  it('returns filler percentage', () => {
    const result = calculateFillers('um basically I think this looks good');
    expect(result).toBeGreaterThan(0);
  });
});
