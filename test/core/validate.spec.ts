import { expect, test } from 'vitest';
import validate from '../../src/core/validate.js';

test('validate - should return false for empty code', () => {
    const code = '';
    const result = validate(code);
    const expected = false;
    expect(result).toBe(expected);
});

test('validate - should return true for "auto" code', () => {
    const code = 'auto';
    const result = validate(code);
    const expected = true;
    expect(result).toBe(expected);
});

test('validate - should return false for invalid code', () => {
    const code = 'zzz';
    const result = validate(code);
    const expected = false;
    expect(result).toBe(expected);
});

test('validate - should return true for valid code', () => {
    const code = 'en';
    const result = validate(code);
    const expected = true;
    expect(result).toBe(expected);
});
