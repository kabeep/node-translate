import { mutable } from '../helper/index.js';
import type { ResponseBody } from '../shared/index.js';

interface TranslationOptionFromLanguage {
    /** Indicates whether there is a language suggestion */
    didYouMean: boolean;
    /** The ISO code of the detected language */
    iso: string;
}

interface TranslationOptionFromText {
    /** Indicates whether there was an autocorrection */
    autoCorrected: boolean;
    /** Source text */
    value: string;
    /** Phonetic transcription of the source text */
    phonetics: string;
    /** Indicates whether a suggestion for the source text */
    didYouMean: boolean;
}

interface TranslationOptionFrom {
    language: TranslationOptionFromLanguage;
    text: TranslationOptionFromText;
    /** Synonyms of the source word */
    synonyms: string[];
    /** Example sentence of the source word */
    sentences: string[];
}

interface TranslationOptionToText {
    /** Phonetic transcription of the translated text */
    phonetics: string;
    /** Translated text */
    value: string;
}

interface TranslationOptionTo {
    text: TranslationOptionToText;
    /** Polysemy information for the translated text */
    polysemy: Array<{ label: string; children: string[] }>;
}

export interface TranslationOption {
    /** Translation text */
    text: string;
    from: TranslationOptionFrom;
    to: TranslationOptionTo;
    /** The raw response body from the translation request */
    raw?: ResponseBody;
}

/**
 * Parses the response body of a translation request and formats it into TranslateData structure.
 * @param {ResponseBody} data - The response body from the translation request.
 * @returns {Promise<TranslationOption>} - A promise that resolves to the formatted TranslateData structure.
 */
function parse(data: ResponseBody) {
    try {
        const result = mutable<TranslationOption>({
            text: '',

            from: {
                language: {
                    didYouMean: false,
                    iso: '',
                },
                text: {
                    autoCorrected: false,
                    value: '',
                    phonetics: '',
                    didYouMean: false,
                },
                synonyms: [],
                sentences: [],
            },

            to: {
                text: {
                    phonetics: '',
                    value: '',
                },
                polysemy: [],
            },

            raw: data,
        });

        /* Parse the body and add it to the result object */
        // Parse source text and translated text
        for (const object of data[0]) {
            Boolean(object[0]) && (result.to.text.value += object[0]);
            Boolean(object[1]) && (result.from.text.value += object[1]);
        }

        // Parse translation text
        result.text = data[0][0][0];

        // Parse phonetics transcription of the source text
        result.from.text.phonetics = data[0][1]?.[3] ?? '';
        // Parse phonetics transcription of the translated text
        result.to.text.phonetics = data[0][1]?.[2] ?? '';

        // Parse polysemy of the translated text and synonyms of the source text
        if (data[1]?.length) {
            for (const object of data[1]) {
                object[0] &&
                    object[1]?.length &&
                    result.to.polysemy.push({
                        label: object[0],
                        children: object[1],
                    });

                object[2]?.[0]?.[1] && (result.from.synonyms = object[2][0][1]);
            }
        }

        // Parse iso language code of the source text
        if (data[2] === data[8][0][0]) {
            result.from.language.iso = data[2];
        } else {
            result.from.language.didYouMean = true;
            result.from.language.iso = data[8][0][0];
        }

        // Parse autocorrected for the source text
        if (data[7]?.[0]) {
            let string_ = data[7][0];

            string_ = string_.replace(/<b><i>/g, '[');
            string_ = string_.replace(/<\/i><\/b>/g, ']');

            result.from.text.value = string_;

            if (data[7][5] === true) {
                result.from.text.autoCorrected = true;
            } else {
                result.from.text.didYouMean = true;
            }
        }

        // Parse example sentences of the source text
        if (data[13]?.[0]) {
            for (const object of data[13][0]) {
                object[0] && result.from.sentences.push(object[0]);
            }
        }

        return result;
    } catch {
        throw new Error('EPARSE');
    }
}

export default parse;
