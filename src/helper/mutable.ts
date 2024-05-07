export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

/**
 * Converts an immutable object into a mutable one.
 * @param {any[] | Record<string, any>} value - The immutable object to be converted.
 * @returns {Mutable<{any[] | Record<string, any>}>} - The mutable version of the input object.
 * @see [element-plus]{@link https://github.com/element-plus/element-plus/blob/master/packages/utils/typescript.ts}
 */
function mutable<T extends readonly any[] | Record<string, any>>(value: T) {
    return value as Mutable<typeof value>;
}

export default mutable;
