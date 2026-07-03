import { describe, expect, it } from 'vitest';
import { calculateActionItems } from '../../src/services/metrics/actionItems.js';

describe('calculateActionItems', () => {
  it('extracts action items', () => {
    const result = calculateActionItems('We need to fix authentication. Let us assign this task.');
    expect(result.length).toBeGreaterThan(0);
  });
});
