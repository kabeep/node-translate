import { osLocaleSync } from 'os-locale';
import { expect, test } from 'vitest';
import getLocale from '../../src/helper/get-locale';

test('getLocale - should return the current locale as a string', () => {
    const result = getLocale();
    const expected = osLocaleSync().split('-')[0];
    expect(result).toBe(expected);
});
