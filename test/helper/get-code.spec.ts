import { expect, test } from 'vitest';
import getCode from '../../src/helper/get-code';
import getLocale from '../../src/helper/get-locale';

test('getCode - should return "auto" when no code or language is provided and adaptive is false', () => {
    const result = getCode(undefined, false);
    expect(result).toBe('auto');
});

test('getCode - should return the locale when no code or language is provided and adaptive is true', () => {
    const result = getCode(undefined, true);
    const expected = getLocale();
    expect(result).toBe(expected);
});

test('getCode - should return the provided code when it is a valid language code', () => {
    const result = getCode('en');
    expect(result).toBe('en');
});

test('getCode - should return the provided code when it is a valid language code (uppercase)', () => {
    const result = getCode('EN');
    expect(result).toBe('en');
});

test('getCode - should return the provided code when it is a valid language code (mixed case)', () => {
    const result = getCode('eN');
    expect(result).toBe('en');
});

test('getCode - should return the provided language code when it is a valid language name', () => {
    const result = getCode('English');
    expect(result).toBe('en');
});

test('getCode - should throw an error when the provided code is not valid', () => {
    expect(() => getCode('invalid')).toThrowError('EVALIDATION');
});
