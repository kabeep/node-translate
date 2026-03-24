import type { ResponseErrorCodes } from './response-error-codes.type';

export type TranslateErrorCodes =
    | 'EPARSE' // Unexpected API response data
    | 'EVALIDATION' // Illegal language code
    | ResponseErrorCodes;
