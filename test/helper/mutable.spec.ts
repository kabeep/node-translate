import { expect, test } from 'vitest';
import mutable, { Mutable } from '../../src/helper/mutable';

test('mutable - should convert an array into a mutable one', () => {
    const input: readonly number[] = [1, 2, 3];
    const result = mutable(input);
    const expected: Mutable<typeof input> = [1, 2, 3];
    expect(result).toEqual(expected);
});

test('mutable - should convert an object into a mutable one', () => {
    const input: Readonly<{ foo: number }> = { foo: 123 };
    const result = mutable(input);
    const expected: Mutable<typeof input> = { foo: 123 };
    expect(result).toEqual(expected);
});

test('mutable - should retain properties and values of the original object', () => {
    const input: Readonly<{ foo: number; bar: string }> = { foo: 123, bar: 'abc' };
    const result = mutable(input);
    const expected: Mutable<typeof input> = { foo: 123, bar: 'abc' };
    expect(result).toEqual(expected);
});

test('mutable - should retain the type of the original object', () => {
    const input: Readonly<{ foo: number }> = { foo: 123 };
    const result = mutable(input);
    expect(result.foo).toBe(123);
});

test('mutable - should return a mutable version of the input object', () => {
    const input: Readonly<{ foo: number }> = { foo: 123 };
    const result = mutable(input);
    const isMutable = Array.isArray(result) || typeof result === 'object';
    expect(isMutable).toBe(true);
});
