import { describe, expect, it } from 'vitest';
import { GermanState } from '../types/GermanState';
import { parseStateParam, parseStateQuery } from './stateQuery';

describe('parseStateParam', () => {
  it('accepts slugs and enum codes', () => {
    expect(parseStateParam('berlin')).toBe(GermanState.BE);
    expect(parseStateParam('BE')).toBe(GermanState.BE);
    expect(parseStateParam('nordrhein-westfalen')).toBe(GermanState.NW);
  });

  it('returns null for unknown values', () => {
    expect(parseStateParam('mars')).toBeNull();
    expect(parseStateParam(null)).toBeNull();
  });
});

describe('parseStateQuery', () => {
  it('reads the state query parameter', () => {
    expect(parseStateQuery('?state=berlin')).toBe(GermanState.BE);
    expect(parseStateQuery('state=BY&other=1')).toBe(GermanState.BY);
  });
});
