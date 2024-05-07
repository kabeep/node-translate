import type { ResponseErrorCodes } from './response-error-codes.type.js';

export type TranslateErrorCodes =
    | 'EPARSE' // Failure of parse translation
    | 'EVALIDATION' // Failure of iso code validation
    | ResponseErrorCodes;
