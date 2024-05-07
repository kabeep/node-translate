import iso6391X from './iso-639-1-x.js';

/**
 * Validates whether the provided language code is valid.
 * @param {string} code - The language code to validate.
 * @returns {boolean} - True if the code is valid, false otherwise.
 */
function validate(code: string) {
    if (!code) {
        return false;
    }

    if (code === 'auto') {
        return true;
    }

    return iso6391X.validate(code);
}

export default validate;
