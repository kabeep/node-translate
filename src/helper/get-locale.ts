import { osLocaleSync } from 'os-locale';

/**
 * Retrieves the current locale of the operating system.
 * @returns {string} The current locale, represented as a string.
 */
function getLocale(): string {
    const locale = osLocaleSync();

    return locale.split('-')[0];
}

export default getLocale;
