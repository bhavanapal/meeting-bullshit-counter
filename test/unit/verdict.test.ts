import { describe, expect, it } from 'vitest';
import { getVerdict } from '../../src/services/metrics/Verdict.js';

describe('getVerdict', () => {
  it('returns productive verdict', () => {
    expect(getVerdict(85)).toBe('Highly productive');
  });
});
