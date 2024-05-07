import { LanguageCode } from 'iso-639-1';
import { iso6391X, LanguageOption } from '../src/index.js';

// en
console.log(iso6391X.getCode('english') as string);

// ['aa', 'ab', ... 199 more items]
console.log(iso6391X.getAllCodes() as LanguageCode[]);

// English
console.log(iso6391X.getName('en') as string);

// ['Afar', 'Abkhaz', ... 199 more items]
console.log(iso6391X.getAllNames() as string[]);

// 中文
console.log(iso6391X.getNativeName('zh') as string);

// ['Afaraf', 'аҧсуа бызшәа', ... 199 more items]
console.log(iso6391X.getAllNativeNames() as string[]);

// [
//   { code: 'en', name: 'English', nativeName: 'English' },
//   { code: 'zh', name: 'Chinese', nativeName: '中文' },
//   { code: 'fr', name: 'French', nativeName: 'Français' },
//   { code: 'de', name: 'German', nativeName: 'Deutsch' },
//   { code: 'it', name: 'Italian', nativeName: 'Italiano' },
//   { code: 'ja', name: 'Japanese', nativeName: '日本語' },
//   { code: 'es', name: 'Spanish', nativeName: 'Español' },
//   { code: 'zh-cn', name: 'Chinese (Simplified)', nativeName: '简体中文' }
// ]
console.log(iso6391X.getAllDetections() as LanguageOption[]);

// [
//   { code: 'en', name: 'English', nativeName: 'English' },
//   { code: 'zh', name: 'Chinese', nativeName: '中文' },
// ]
console.log(iso6391X.getLanguages(['en', 'zh']) as LanguageOption[]);

// true
console.log(iso6391X.validate('en') as boolean);
// false
console.log(iso6391X.validate('english') as boolean);
