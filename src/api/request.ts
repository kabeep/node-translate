import querystring, { type ParsedUrlQueryInput } from 'node:querystring';
import got, { type OptionsInit, type RequestError, type Response } from 'got';
import { mutable } from '../helper/index.js';
import type { RequestParameters, ResponseBody, ResponseErrorCodes } from '../shared/index.js';

/**
 * Represents the options for translation.
 */
export interface RequestOptions {
    /** The language name/ISO 639-1 code to translate from. If none is given, it will auto-detect the source language */
    from: string;
    /** The language name/ISO 639-1 code to translate to. If none is given, it will translate to English */
    to: string;
    /** Source text / word */
    text: string;
    /** Timeout duration for the translation request in milliseconds (default: 30000) */
    timeout?: number;
    /** Retry attempts for the translation request in case of failure (default: 0) */
    retry?: number;
}

/**
 * Performs a translation request.
 * @param {RequestOptions} options - The options for translation.
 * @returns {Promise<ResponseBody>} - A promise that resolves to the response body of the translation request.
 */
async function request({
    from = 'auto',
    to,
    text,
    timeout = 30_000,
    retry = 0,
}: RequestOptions): Promise<ResponseBody> {
    // URL & query string required by Google Translate.
    const baseUrl = 'https://translate.google.com/translate_a/single';
    const data = mutable<RequestParameters>({
        client: 'gtx',
        sl: from,
        tl: to,
        q: text,
        hl: to,
        dt: ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'],
        ie: 'utf8',
        oe: 'utf8',
        otf: 1,
        ssel: 0,
        tsel: 0,
        kc: 7,
    });

    const getUrl = (url: string, data: RequestParameters) =>
        `${baseUrl}?${querystring.stringify(data as ParsedUrlQueryInput)}`;

    // If request URL is greater than 2048 characters, use POST method.
    const isOverflow = getUrl(baseUrl, data).length > 2048;
    isOverflow && delete data.q;

    // Append query string to the request URL.
    const url = getUrl(baseUrl, data);
    const requestOptions = mutable<OptionsInit>({
        method: 'get', // HTTP request method
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        timeout: { request: timeout }, // Request timeout configuration
        retry: { limit: retry }, // Request retry configuration
        responseType: 'json', // Response type
    });

    if (isOverflow) {
        // Change HTTP method to POST if URL is too long
        requestOptions.method = 'post';
        // Set request body for POST method
        requestOptions.body = new URLSearchParams({ q: text }).toString();
    }

    // Request translation from Google Translate.
    let response: Response<ResponseBody>;
    try {
        response = (await got(url, requestOptions)) as Response<ResponseBody>;
    } catch (error: unknown) {
        throw new Error((error as RequestError).code as ResponseErrorCodes);
    }

    return response.body;
}

export default request;
