import { request, type RequestOptions } from '../api/index.js';
import { getLocale } from '../helper/index.js';
import parse from './parse.js';
import validate from './validate.js';

/**
 * Represents options for translating text.
 */
export interface TranslateOptions extends Partial<Omit<RequestOptions, 'text'>> {
    // Placeholder
}

/**
 * Translates the specified text from one language to another.
 * @param {string} text - The text to translate.
 * @param {TranslateOptions} options - Additional options for the translation.
 * @returns {Promise<any>} - A promise that resolves with the translated text.
 */
async function translate(text: string, { from = 'auto', to = 'auto', timeout, retry }: TranslateOptions = {}) {
    from ??= 'auto';
    to = !to || to === 'auto' ? getLocale() : to;

    text = String(text);

    // Check if a language is in supported; if not, throw an error object.
    const isValidated = validate(to) && validate(from);
    if (!isValidated) {
        throw new Error('EVALIDATION');
    }

    const response = await request({ from, to, text, timeout, retry });

    return parse(response);
}

export default translate;
