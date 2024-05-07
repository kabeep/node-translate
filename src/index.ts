export type { ResponseBody as TranslateRawBody, TranslateErrorCodes } from './shared/index.js';

export type {
    LanguageCode,
    LanguageOption,
    TranslateOptions,
    TranslationOption,
    TranslationOptionFrom,
    TranslationOptionFromLanguage,
    TranslationOptionFromText,
    TranslationOptionTo,
    TranslationOptionToText,
} from './core/index.js';
export { iso6391X, translate as default } from './core/index.js';
