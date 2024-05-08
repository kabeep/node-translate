import { request, type RequestOptions } from '../api/index.js';
import { getCode } from '../helper/index.js';
import parse from './parse.js';

/**
 * Represents options for translating text.
 */
export interface TranslateOptions extends Partial<Omit<RequestOptions, 'text'>> {
    raw?: boolean;
}

/**
 * Translates the specified text from one language to another.
 * @param {string} text - The text to translate.
 * @param {TranslateOptions} options - Additional options for the translation.
 * @returns {Promise<any>} - A promise that resolves with the translated text.
 */
async function translate(
    text: string,
    { from = 'auto', to = 'auto', timeout, retry, raw: rawEnabled = false }: TranslateOptions = {},
) {
    from = getCode(from);
    to = getCode(to, true);
    text = String(text);

    const response = await request({ from, to, text, timeout, retry });

    const data = parse(response);

    if (!rawEnabled) {
        delete data.raw;
    }

    return data;
}

export default translate;
