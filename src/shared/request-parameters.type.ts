type RequestParameterDt =
    | 't' // Translation of source text
    | 'at' // Alternate translations
    | 'rm' // Transcription / Transliteration of source and translated texts
    | 'bd' // Dictionary, in case source text is one word (you get translations with articles, reverse translations, etc.)
    | 'md' // Definitions of source text, if it's one word
    | 'ss' // Synonyms of source text, if it's one word
    | 'ex' // Examples
    | 'rw' // See also list.
    | 'dj' // Json response with names. (dj=1)
    | 'ld' // Language detection of the source language
    | 'qca'; // Translation quality assessment

export interface RequestParameters extends Record<string, unknown> {
    /** Google Translate client identifier */
    client: string;
    /** Source language code (auto for auto detection) */
    sl: string;
    /** Translation language code */
    tl: string;
    /** Source text / word */
    q?: string;
    /** Language of the interface (default:en, you can try xx-bork or xx-hacker) */
    hl: string;
    /** Translation data types */
    dt: RequestParameterDt[];
    /** Input encoding (default: utf8) */
    ie: string;
    /** Output encoding (default: utf8) */
    oe: string;
    /** Whether to use OTF (offline translation mode) */
    otf: number;
    /** Server side languages */
    ssel: number;
    /** Target side languages */
    tsel: number;
    /** Key constraint */
    kc: number;
}
