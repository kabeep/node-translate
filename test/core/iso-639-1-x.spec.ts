import { expect, test } from 'vitest';
import iso6391X from '../../src/core/iso-639-1-x';

test('Iso6391X.getName - should return the name of the language corresponding to the given code', () => {
    const name = iso6391X.getName('en');
    const expected = 'English';
    expect(name).toBe(expected);
});

test('Iso6391X.getAllNames - should return an array of all language names', () => {
    const names = iso6391X.getAllNames();
    expect(names).toContain('English');
});

test('Iso6391X.getNativeName - should return the native name of the language corresponding to the given code', () => {
    const nativeName = iso6391X.getNativeName('en');
    const expected = 'English';
    expect(nativeName).toBe(expected);
});

test('Iso6391X.getAllNativeNames - should return an array of all native language names', () => {
    const nativeNames = iso6391X.getAllNativeNames();
    expect(nativeNames).toContain('English');
});

test('Iso6391X.getCode - should return the language code corresponding to the given language name', () => {
    const code = iso6391X.getCode('English');
    const expected = 'en';
    expect(code).toBe(expected);
});

test('Iso6391X.getAllCodes - should return an array of all language codes', () => {
    const codes = iso6391X.getAllCodes();
    expect(codes).toContain('en');
});

test('Iso6391X.validate - should return true if the code is a valid language code', () => {
    const isValid = iso6391X.validate('en');
    expect(isValid).toBe(true);
});

test('Iso6391X.validate - should return false if the code is a invalid language code', () => {
    const isValid = iso6391X.validate('node-translate');
    expect(isValid).toBe(false);
});

test('Iso6391X.getLanguages - should return an array of language options for the given language codes', () => {
    const result = iso6391X.getLanguages(['en']);
    const expected = [
        {
            code: 'en',
            name: 'English',
            nativeName: 'English',
        },
    ];
    expect(result).toStrictEqual(expected);
});

test('Iso6391X.getAllDetections - should return an array of all language options for adaptive codes', () => {
    const result = iso6391X.getAllDetections();
    const expected = {
        code: 'en',
        name: 'English',
        nativeName: 'English',
    };
    expect(result).toContainEqual(expected);
});
