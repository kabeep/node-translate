<div align="center">

<img width="814" src="docs/images/node-translate-logo.png" alt="logo">

A powerful, secure and feature-rich api via Google Translation.

---

[![NodeJS](https://img.shields.io/node/v/%40kabeep%2Fnode-translate?color=lightseagreen)](https://nodejs.org/docs/latest/api/)
[![License](https://img.shields.io/github/license/kabeep/node-translate?color=slateblue)](LICENSE)
[![NPM](https://img.shields.io/npm/d18m/%40kabeep%2Fnode-translate?color=cornflowerblue)](https://www.npmjs.com/package/@kabeep/node-translate)
[![Codecov](https://img.shields.io/codecov/c/github/kabeep/node-translate?logo=codecov&color=mediumvioletred)](https://codecov.io/gh/kabeep/node-translate)
[![Codacy](https://img.shields.io/codacy/grade/5c81a6d331794c7a92bfd6743551e00f?logo=codacy&logoColor=dodgerblue&color=dodgerblue)](https://app.codacy.com/gh/kabeep/node-translate/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/Qh23T2Zgw4Fy4V8uvKaymp/VdeCLjaHhZRmKgzXoeD65a/tree/master.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/circleci/Qh23T2Zgw4Fy4V8uvKaymp/VdeCLjaHhZRmKgzXoeD65a/tree/master)

English | [简体中文](README.zh-CN.md)

![Alt](https://repobeats.axiom.co/api/embed/df1b56248835381ad7729bf16ff397775e49072d.svg "Repobeats analytics image")

</div>

## 📖 Introduction

> Thank you to [matheuss](https://github.com/matheuss) and [iamtraction](https://github.com/iamtraction) for writing the
> original version of this library. Due to the original authors no longer actively maintaining it, I rewrote the library
> using TypeScript and ISO-639-1. This rewrite has made the program more secure, provided richer translation results,
> and
> resolved program anomalies.

#### What's New?

- Adaptive native language translation.
- Synonyms, polysemous explanations, and example sentences.
- Timeout and retry parameters in complex networks.
- Support for querying language, language code, native language, and adaptive language lists.
- Support for ISO-639-1, minority languages, special languages, and the latest changes on Wikipedia.
- Secure API types and comprehensive coverage.
- Controllable error states.

## ⚙️ Installation

```bash
npm install @kabeep/node-translate --save
```

```bash
yarn add @kabeep/node-translate
```

```bash
pnpm add @kabeep/node-translate
```

## 🚀 Usage

```javascript
import translate from '@kabeep/node-translate';
```

#### Methods: `translate(text, options)`

```javascript
translate(text, options)
    .then(console.log)
    .catch(console.error);
```

| Parameter         | Type                               | Optional | Default  | Description                                                                                                           |
|-------------------|------------------------------------|----------|----------|-----------------------------------------------------------------------------------------------------------------------|
| `text`            | `string`                           | No       | -        | Source text, phrase or word.                                                                                          |
| `options`         | `TranslateOptions`                 | -        | -        | The options for translating.                                                                                          |
| `options.from`    | `LanguageCode`, `auto` or `string` | Yes      | `'auto'` | The language name/ISO 639-1 code to translate from. If none is given, it will auto-detect the source language.        |
| `options.to`      | `LanguageCode`, `auto` or `string` | Yes      | `'auto'` | The language name/ISO 639-1 code to translate to. If none is given, it will translate to native environment language. |
| `options.raw`     | `boolean`                          | Yes      | `false`  | If `true`, it will return the raw output that was received from Google Translation Api.                               |
| `options.timeout` | `number`                           | Yes      | `30_000` | Timeout duration for the translation request in milliseconds.                                                         |
| `options.retry`   | `number`                           | Yes      | `0`      | Retry attempts for the translation request in case of failure.                                                        |

#### Returns: `Promise<TranslationOption>`

**Response Object:**

| Key                        | Type                                           | Description                                                                                                          |
|----------------------------|------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `text`                     | `string`                                       | Translation summary, long text will be truncated, please use `to.text.value` for complete results.                   |
| `from`                     | `Record`                                       | -                                                                                                                    |
| `from.language`            | `Record`                                       | -                                                                                                                    |
| `from.language.didYouMean` | `boolean`                                      | Indicates whether there is a language suggestion.                                                                    |
| `from.language.iso`        | `string`                                       | The ISO code of the detected language.                                                                               |
| `from.text`                | `Record`                                       | -                                                                                                                    |
| `from.text.autoCorrected`  | `boolean`                                      | Indicates whether there was an autocorrection.                                                                       |
| `from.text.value`          | `string`                                       | Source text.                                                                                                         |
| `from.text.phonetics`      | `string`                                       | Phonetic transcription of the source text.                                                                           |
| `from.text.didYouMean`     | `boolean`                                      | Indicates whether a suggestion for the source text.                                                                  |
| `from.synonyms`            | `string[]`                                     | Synonyms of the source word.                                                                                         |
| `from.sentences`           | `string[]`                                     | Example sentence of the source word.                                                                                 |
| `to`                       | `Record`                                       | -                                                                                                                    |
| `to.text`                  | `Record`                                       | -                                                                                                                    |
| `to.text.phonetics`        | `string`                                       | Phonetic transcription of the translated text.                                                                       |
| `to.text.value`            | `string`                                       | Translated text.                                                                                                     |
| `to.polysemy`              | `Array<{ label: string; children: string[] }>` | Polysemy information for the translated text.                                                                        |
| `raw`                      | `string`                                       | The raw response body from the translation request. Only returned if `options.raw` is `true` in the request options. |

---

```javascript
import { iso6391X } from '@kabeep/node-translate';
```

#### Methods: `getName(code)`

```javascript
iso6391X.getName(code);
```

| Parameter | Type     | Optional | Default | Description                                                  |
|-----------|----------|----------|---------|--------------------------------------------------------------|
| `code`    | `string` | No       | -       | Iso-639-1 language code or google translation language code. |

#### Returns: `string`

---

#### Methods: `getAllNames()`

```javascript
iso6391X.getAllNames();
```

#### Returns: `string[]`

---

#### Methods: `getNativeName(code)`

```javascript
iso6391X.getNativeName(code);
```

| Parameter | Type     | Optional | Default | Description                                                  |
|-----------|----------|----------|---------|--------------------------------------------------------------|
| `code`    | `string` | No       | -       | Iso-639-1 language code or google translation language code. |

#### Returns: `string`

---

#### Methods: `getAllNativeNames()`

```javascript
iso6391X.getAllNativeNames();
```

#### Returns: `string[]`

---

#### Methods: `getCode(name)`

```javascript
iso6391X.getCode(name);
```

| Parameter | Type     | Optional | Default | Description                                                  |
|-----------|----------|----------|---------|--------------------------------------------------------------|
| `name`    | `string` | No       | -       | Iso-639-1 language name or google translation language name. |

#### Returns: `LanguageCode`

---

#### Methods: `getAllCodes()`

```javascript
iso6391X.getAllCodes();
```

#### Returns: `LanguageCode[]`

---

#### Methods: `getLanguages(codes)`

```javascript
iso6391X.getLanguages(codes);
```

| Parameter | Type       | Optional | Default | Description                                                    |
|-----------|------------|----------|---------|----------------------------------------------------------------|
| `codes`   | `string[]` | No       | -       | Iso-639-1 language codes or google translation language codes. |

#### Returns: `LanguageOption[]`

---

#### Methods: `getAllDetections()`

```javascript
iso6391X.getAllDetections();
```

#### Returns: `LanguageCode[]`

## 🪄 Examples

#### Usage of language codes

[View Case](example/default.ts)

```javascript
import translate from '@kabeep/node-translate';

// Simple example
translate('例子', { to: 'en' }).then(res => {
    // => example
    console.log(res.to.text.value);
});
```

#### Using language name and capitalized correction

[View Case](example/language.ts)

```javascript
import translate from '@kabeep/node-translate';

// Language name and capitalized correction
translate('例子', { to: 'ENGlish' }).then(res => {
    // => example
    console.log(res.text);
});
```

#### Adaptive translation

[View Case](example/detection.ts)

```javascript
import translate from '@kabeep/node-translate';

// Use `auto` or leave the `from` parameter empty to detect language by adativeness
// Use `auto` or leave the `to` parameter empty to detect language by os (`en` for example)
translate('例子').then(res => {
    // => example
    console.log(res.text);
});
```

#### Phonetic transcription of the source text and translation

[View Case](example/phonetics.ts)

```javascript
import translate from '@kabeep/node-translate';

// Output phonetic transcription of the source text and the translated text
translate('例子', { to: 'ja' }).then(res => {
    // => Lìzi
    console.log(res.from.text.phonetics);
    // => Rei
    console.log(res.to.text.phonetics);
});
```

#### Synonymous and similar words in the source text

[View Case](example/synonym.ts)

```javascript
import translate from '@kabeep/node-translate';

// Output synonyms of the source word
translate('例子', { to: 'en' }).then(res => {
    // =>
    // [
    //     '例',
    //     '例子',
    //     '范例',
    //     '榜样',
    //     '典范',
    //     '例证',
    // ]
    console.log(res.from.synonyms);
});
```

#### Source text example sentences

[View Case](example/sentence.ts)

```javascript
import translate from '@kabeep/node-translate';

// Output example sentence of the source word
translate('example', { to: 'zh' }).then(res => {
    // => [
    //     "it is vitally important that parents should set an [example]",
    //     "she followed her brother's [example] and deserted her family",
    //     "it's a good [example] of how European action can produce results",
    // ]
    console.log(res.from.sentences);
});
```

#### Synonymous translation

[View Case](example/polysemy.ts)

```javascript
import translate from '@kabeep/node-translate';

// Output polysemy information for the translated text
translate('例子', { to: 'en' }).then(res => {
    // => [{
    //     label: 'noun',
    //     children: [
    //         'example',
    //         'case',
    //         'instance',
    //     ],
    // }]
    console.log(res.to.polysemy);
});
```

#### Source text suggestions

[View Case](example/did-you-mean.ts)

```javascript
import translate from '@kabeep/node-translate';

// Automatically detect and use the correct source text of suggested
translate('Thunk you', { from: 'en', to: 'zh' }).then(res => {
    // => 谢谢你
    console.log(res.to.text.value);
    // => true
    console.log(res.from.text.didYouMean);
});
```

#### Automatic correction of source text

[View Case](example/autocorrected.ts)

```javascript
import translate from '@kabeep/node-translate';

// Automatically correct spelling errors in the source text
translate('Thnak you', { from: 'en', to: 'zh' }).then(res => {
    // => 谢谢
    console.log(res.to.text.value);
    // => true
    console.log(res.from.text.autoCorrected);
});
```

#### Automatic correction of source language codes

[View Case](example/did-you-mean.ts)

```javascript
import translate from '@kabeep/node-translate';

// Automatically detect and use correct source language codes of suggested
translate('example', { from: 'zh', to: 'en' }).then(res => {
    // => en
    console.log(res.from.language.iso);
    // => true
    console.log(res.from.language.didYouMean);
});

// Automatically detect and use the correct source text of suggested
translate('Thunk you', { from: 'en', to: 'zh' }).then(res => {
    // => 谢谢你
    console.log(res.to.text.value);
    // => true
    console.log(res.from.text.didYouMean);
});
```

#### Network exception retry

[View Case](example/retry.ts)

```javascript
import translate from '@kabeep/node-translate';

// Retry attempts for the translation request in case of failure (with a maximum of three requests)
translate('例子', { to: 'en', retry: 2, timeout: 100 }).catch((err) => {
    // => ETIMEDOUT    - The timeout limits was reached
    // => ECONNRESET   - The connection was forcibly closed
    // => EADDRINUSE   - Could not bind to any free port
    // => ECONNREFUSED - The connection was refused by the server
    // => EPIPE        - The remote side of the stream being written has been closed
    // => ENOTFOUND    - Could not resolve the hostname to an IP address
    // => ENETUNREACH  - No internet connection
    // => EAI_AGAIN    - DNS lookup timed out
    // => EPARSE       - Unexpected API response data
    // => EVALIDATION  - Illegal language code
    console.log(err.message);
});
```

#### ISO-639-1-X

[View Case](example/iso.ts)

```javascript
import { iso6391X, LanguageCode, LanguageOption } from '@kabeep/node-translate';

// => en
console.log(iso6391X.getCode('english'));

// => ['aa', 'ab', ... 199 more items]
console.log(iso6391X.getAllCodes());

// => English
console.log(iso6391X.getName('en'));

// => ['Afar', 'Abkhaz', ... 199 more items]
console.log(iso6391X.getAllNames());

// => 中文
console.log(iso6391X.getNativeName('zh'));

// => ['Afaraf', 'аҧсуа бызшәа', ... 199 more items]
console.log(iso6391X.getAllNativeNames());

// => [
//   { code: 'en', name: 'English', nativeName: 'English' },
//   { code: 'zh', name: 'Chinese', nativeName: '中文' },
//   ... 6 more items
// ]
console.log(iso6391X.getAllDetections());

// => [
//   { code: 'en', name: 'English', nativeName: 'English' },
//   { code: 'zh', name: 'Chinese', nativeName: '中文' },
// ]
console.log(iso6391X.getLanguages(['en', 'zh']));

// => true
console.log(iso6391X.validate('en'));
// => false
console.log(iso6391X.validate('english'));
```

## 🔗 Related

- [google-translate-api](https://github.com/matheuss/google-translate-api) - A free and unlimited API for Google
  Translate 💵🚫
- [google-translate](https://github.com/iamtraction/google-translate) - 🈯 A Node.JS library to consume Google Translate
  API for free.

## 🤝 Contribution

Contributions via Pull Requests or [Issues](https://github.com/kabeep/node-translate/issues) are welcome.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.