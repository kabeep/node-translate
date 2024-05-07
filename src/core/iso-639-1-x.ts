import iso6391, { type LanguageCode as Iso6391LanguageCode } from 'iso-639-1';
import has from 'lodash.has';
import {
    adaptiveCodes,
    type AdditionalCode,
    type AdditionalCodeOption,
    additionalCodes,
    type AdditionalName,
} from '../shared/index.js';

/**
 * Represents a utility class for working with ISO 639-1 language codes and additional custom codes.
 */
export type LanguageCode = Iso6391LanguageCode | AdditionalCode;

/**
 * Represents an option for a language, including its code, name, and native name.
 */
export type LanguageOption = {
    code: LanguageCode;
    name: string;
    nativeName: string;
};

/**
 * Represents a utility class for working with ISO 639-1 language codes and additional custom codes.
 * @see [github:iso-639-1]{@link https://github.com/meikidd/iso-639-1/blob/master/src/data.js}
 * @see [wikipedia:iso-639-1]{@link https://en.wikipedia.org/wiki/ISO_639-1}
 */
class Iso6391X {
    /**
     * Gets the name of the language corresponding to the given code.
     * @param {string} code - The language code.
     * @returns {string} - The name of the language.
     */
    getName(code: string) {
        return additionalCodes[code as AdditionalCode]?.name ?? iso6391.getName(code);
    }

    /**
     * Gets all language names, including ISO 639-1 and additional custom codes.
     * @returns {string[]} - An array of language names.
     */
    getAllNames() {
        return [...iso6391.getAllNames(), ...Object.values(additionalCodes).map((item) => item.name)];
    }

    /**
     * Gets the native name of the language corresponding to the given code.
     * @param {string} code - The language code.
     * @returns {string} - The native name of the language.
     */
    getNativeName(code: string) {
        return additionalCodes[code as AdditionalCode]?.nativeName ?? iso6391.getNativeName(code);
    }

    /**
     * Gets all native language names, including ISO 639-1 and additional custom codes.
     * @returns {string[]} - An array of native language names.
     */
    getAllNativeNames() {
        return [...iso6391.getAllNativeNames(), ...Object.values(additionalCodes).map((option) => option.nativeName)];
    }

    /**
     * Gets the language code corresponding to the given language name.
     * @param {string} name - The language name.
     * @returns {LanguageCode
     */
    getCode(name: string) {
        const additionalNames = Object.values(additionalCodes).map((option) => option.name);
        const matchIndex = additionalNames.indexOf(name as AdditionalName);

        return (Object.keys(additionalCodes)[matchIndex] ?? iso6391.getCode(name)) as LanguageCode;
    }

    /**
     * Gets all language codes, including ISO 639-1 and additional custom codes.
     * @returns {LanguageCode[]} - An array of language codes.
     */
    getAllCodes() {
        return [...iso6391.getAllCodes(), ...Object.keys(additionalCodes)] as LanguageCode[];
    }

    /**
     * Gets language options for the given language codes, including ISO 639-1 and additional custom codes.
     * @param {string[]} codes - An array of language codes.
     * @returns {LanguageOption[]} - An array of language options.
     */
    getLanguages(codes: string[]) {
        const [googleLanguages, isoCodes] = [[], []] as [LanguageOption[], string[]];

        for (const code of codes) {
            if (has(additionalCodes, code)) {
                googleLanguages.push({
                    code: code as LanguageCode,
                    ...(additionalCodes as Record<string, AdditionalCodeOption>)[code],
                });
            } else {
                isoCodes.push(code);
            }
        }

        return [...iso6391.getLanguages(isoCodes), ...googleLanguages] as LanguageOption[];
    }

    /**
     * Gets all language options for adaptive codes, including ISO 639-1 and additional custom codes.
     * @returns {LanguageOption[]} - An array of language options.
     * @see [Google Translation Api]{@link https://cloud.google.com/translate/docs/languages?hl=zh-cn#adaptive_translation}
     */
    getAllDetections() {
        return this.getLanguages(adaptiveCodes);
    }

    /**
     * Validates whether the given code is a valid language code.
     * @param {string} code - The language code to validate.
     * @returns {boolean} - True if the code is valid, false otherwise.
     */
    validate(code: string) {
        return iso6391.validate(code) || has(additionalCodes, code);
    }
}

const iso6391X = new Iso6391X();

export default iso6391X;
