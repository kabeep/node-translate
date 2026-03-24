import { iso6391X } from '../core';
import validate from '../core/validate';
import getLocale from './get-locale';

function getCode(codeOrLang?: string, adaptive = false) {
    if (!codeOrLang || codeOrLang === 'auto')
        return adaptive ? getLocale() : 'auto';

    codeOrLang = codeOrLang.toLowerCase();

    // Check if a language is in supported; if not, throw an error object.
    const isValidated = validate(codeOrLang);
    if (isValidated) return codeOrLang;

    // Using Language code from supported name
    const code = iso6391X.getCode(codeOrLang);
    if (code) return code;

    throw new Error('EVALIDATION');
}

export default getCode;
