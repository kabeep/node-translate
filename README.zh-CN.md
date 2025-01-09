<div align="center">

<img width="630" src="assets/node-translate-logo.png" alt="logo">

一个强大、安全且功能丰富的 API，通过 Google 翻译。

---

[![NodeJS](https://img.shields.io/node/v/%40kabeep%2Fnode-translate?color=lightseagreen)](https://nodejs.org/docs/latest/api/)
[![License](https://img.shields.io/github/license/kabeep/node-translate?color=slateblue)](LICENSE)
[![NPM](https://img.shields.io/npm/d18m/%40kabeep%2Fnode-translate?color=cornflowerblue)](https://www.npmjs.com/package/@kabeep/node-translate)
[![Codecov](https://img.shields.io/codecov/c/github/kabeep/node-translate?logo=codecov&color=mediumvioletred)](https://codecov.io/gh/kabeep/node-translate)
[![Codacy](https://img.shields.io/codacy/grade/5c81a6d331794c7a92bfd6743551e00f?logo=codacy&logoColor=dodgerblue&color=dodgerblue)](https://app.codacy.com/gh/kabeep/node-translate/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/Qh23T2Zgw4Fy4V8uvKaymp/VdeCLjaHhZRmKgzXoeD65a/tree/master.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/circleci/Qh23T2Zgw4Fy4V8uvKaymp/VdeCLjaHhZRmKgzXoeD65a/tree/master)

[English](README.md) | 简体中文

![Alt](https://repobeats.axiom.co/api/embed/df1b56248835381ad7729bf16ff397775e49072d.svg "Repobeats analytics image")

</div>

## 📖 简介

> 感谢 [matheuss](https://github.com/matheuss) 和 [iamtraction](https://github.com/iamtraction)
> 编写了该库的原始版本。由于原始版本作者不再积极维护，我使用 Typescript 和 ISO-639-1 重写了该库，使程序变得安全提供更丰富地翻译结果，并解决了程序异常。

#### 什么是新的？

- 自适应本机语言翻译
- 近义词、多义解释和例句
- 复杂网络中的超时与重试参数
- 支持语言、语言代码、母语和自适应语言列表查询
- 支持 iso-639-1、小语种、特殊语种和 Wikipedia 上最新的变更
- 安全的 API 类型和完整覆盖率
- 可控的错误状态

## ⚙️ 安装

```bash
npm install @kabeep/node-translate --save
```

```bash
yarn add @kabeep/node-translate
```

```bash
pnpm add @kabeep/node-translate
```

## 🚀 使用

```javascript
import translate from '@kabeep/node-translate';
```

#### 函数: `translate(text, options)`

```javascript
translate(text, options)
    .then(console.log)
    .catch(console.error);
```

| 参数                | 类型                 | 可选  | 默认值      | 描述                                       |
|-------------------|--------------------|-----|----------|------------------------------------------|
| `text`            | `string`           | 否   | -        | 源文本、短语或单词。                               |
| `options`         | `TranslateOptions` | -   | -        | 翻译选项。                                    |
| `options.from`    | `LanguageCode`     | 是   | `'auto'` | 要从中翻译的语言名称/ISO 639-1代码。如果未指定，则会自动检测源语言。  |
| `options.to`      | `LanguageCode`     | 是   | `'auto'` | 要翻译到的语言名称/ISO 639-1代码。如果未指定，则会翻译为本机环境语言。 |
| `options.raw`     | `boolean`          | 是   | `false`  | 如果为 `true`，将返回从谷歌翻译 API 接收到的原始输出。        |
| `options.timeout` | `number`           | Yes | `30_000` | 翻译请求的超时持续时间（以毫秒为单位）。                     |
| `options.retry`   | `number`           | Yes | `0`      | 如果失败，重试翻译请求的次数。                          |

#### 返回: `Promise<TranslationOption>`

**Response Object:**

| 键                          | 类型                                             | 描述                                               |
|----------------------------|------------------------------------------------|--------------------------------------------------|
| `text`                     | `string`                                       | 译文摘要，长文本将会被截断，完整结果请使用 `to.text.value`。           |
| `from`                     | `Record`                                       | -                                                |
| `from.language`            | `Record`                                       | -                                                |
| `from.language.didYouMean` | `boolean`                                      | 表示是否有语言建议。                                       |
| `from.language.iso`        | `string`                                       | 检测到的语言的 ISO 代码。                                  |
| `from.text`                | `Record`                                       | -                                                |
| `from.text.autoCorrected`  | `boolean`                                      | 表示是否进行了自动更正。                                     |
| `from.text.value`          | `string`                                       | 源文本。                                             |
| `from.text.phonetics`      | `string`                                       | 源文本的音标。                                          |
| `from.text.didYouMean`     | `boolean`                                      | 表示是否对源文本提出了建议。                                   |
| `from.synonyms`            | `string[]`                                     | 源词的同义词。                                          |
| `from.sentences`           | `string[]`                                     | 源词的示例句。                                          |
| `to`                       | `Record`                                       | -                                                |
| `to.text`                  | `Record`                                       | -                                                |
| `to.text.phonetics`        | `string`                                       | 译文的音标。                                           |
| `to.text.value`            | `string`                                       | 译文。                                              |
| `to.polysemy`              | `Array<{ label: string; children: string[] }>` | 译文的多义信息。                                         |
| `raw`                      | `string`                                       | 翻译请求的原始响应主体。仅在请求选项中的 `options.raw` 为 `true` 时返回。 |

---

```javascript
import { iso6391X } from '@kabeep/node-translate';
```

#### 函数: `getName(code)`

```javascript
iso6391X.getName(code);
```

| 参数     | 类型       | 可选 | 默认值 | 描述                             |
|--------|----------|----|-----|--------------------------------|
| `code` | `string` | 否  | -   | ISO-639-1 语言代码或 Google 翻译语言代码。 |

#### 返回: `string`

---

#### 函数: `getAllNames()`

```javascript
iso6391X.getAllNames();
```

#### 返回: `string[]`

---

#### 函数: `getNativeName(code)`

```javascript
iso6391X.getNativeName(code);
```

| 参数     | 类型       | 可选 | 默认值 | 描述                             |
|--------|----------|----|-----|--------------------------------|
| `code` | `string` | 否  | -   | ISO-639-1 语言代码或 Google 翻译语言代码。 |

#### 返回: `string`

---

#### 函数: `getAllNativeNames()`

```javascript
iso6391X.getAllNativeNames();
```

#### 返回: `string[]`

---

#### 函数: `getCode(name)`

```javascript
iso6391X.getCode(name);
```

| 参数     | 类型       | 可选 | 默认值 | 描述                             |
|--------|----------|----|-----|--------------------------------|
| `code` | `string` | 否  | -   | ISO-639-1 语言名称或 Google 翻译语言名称。 |

#### 返回: `LanguageCode`

---

#### 函数: `getAllCodes()`

```javascript
iso6391X.getAllCodes();
```

#### 返回: `LanguageCode[]`

---

#### 函数: `getLanguages(codes)`

```javascript
iso6391X.getLanguages(codes);
```

| 参数     | 类型       | 可选 | 默认值 | 描述                                 |
|--------|----------|----|-----|------------------------------------|
| `code` | `string` | 否  | -   | ISO-639-1 语言代码元组或 Google 翻译语言代码元组。 |

#### 返回: `LanguageOption[]`

---

#### 函数: `getAllDetections()`

```javascript
iso6391X.getAllDetections();
```

#### 返回: `LanguageCode[]`

## 🪄 例子

#### 使用语言代码

[查看用例](example/default.ts)

```javascript
import translate from '@kabeep/node-translate';

// 简单示例
translate('例子', { to: 'en' }).then(res => {
    // => example
    console.log(res.text);
});
```

#### 使用语言名和大小写修正

[查看用例](example/language.ts)

```javascript
import translate from '@kabeep/node-translate';

// 使用语言名称并自动更正大小写
translate('例子', { to: 'ENGlish' }).then(res => {
    // => example
    console.log(res.text);
});
```

#### 自适应翻译

[查看用例](example/detection.ts)

```javascript
import translate from '@kabeep/node-translate';

// 使用 `auto` 或将 `from` 参数留空以通过适应性检测语言
// 使用 `auto` 或将 `to ` 参数留空以通过操作系统检测语言（示例环境使用 `en`）
translate('例子').then(res => {
    // => example
    console.log(res.to.text.value);
});
```

#### 源文本与译本音标

[查看用例](example/phonetics.ts)

```javascript
import translate from '@kabeep/node-translate';

// 输出源文本和译文的音标
translate('例子', { to: 'ja' }).then(res => {
    // => Lìzi
    console.log(res.from.text.phonetics);
    // => Rei
    console.log(res.to.text.phonetics);
});
```

#### 源文本同、近义词

[查看用例](example/synonym.ts)

```javascript
import translate from '@kabeep/node-translate';

// 输出源词的同义词
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

#### 源文本例句

[查看用例](example/sentence.ts)

```javascript
import translate from '@kabeep/node-translate';

// 输出源词的例句
translate('example', { to: 'zh' }).then(res => {
    // => [
    //     "it is vitally important that parents should set an [example]",
    //     "she followed her brother's [example] and deserted her family",
    //     "it's a good [example] of how European action can produce results",
    // ]
    console.log(res.from.sentences);
});
```

#### 译本多义性

[查看用例](example/polysemy.ts)

```javascript
import translate from '@kabeep/node-translate';

// 输出译文的多义信息
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

#### 源文本建议

[查看用例](example/did-you-mean.ts)

```javascript
import translate from '@kabeep/node-translate';

// 自动检测并使用建议的正确源文本
translate('Thunk you', { from: 'en', to: 'zh' }).then(res => {
    // => 谢谢你
    console.log(res.to.text.value);
    // => true
    console.log(res.from.text.didYouMean);
});
```

#### 自动修正源文本

[查看用例](example/autocorrected.ts)

```javascript
import translate from '@kabeep/node-translate';

// 自动纠正源文本中的拼写错误
translate('Thnak you', { from: 'en', to: 'zh' }).then(res => {
    // => 谢谢
    console.log(res.to.text.value);
    // => true
    console.log(res.from.text.autoCorrected);
});
```

#### 自动修正源语言代码

[查看用例](example/did-you-mean.ts)

```javascript
import translate from '@kabeep/node-translate';

// 自动检测并使用建议的正确源语言代码
translate('example', { from: 'zh', to: 'en' }).then(res => {
    // => en
    console.log(res.from.language.iso);
    // => true
    console.log(res.from.language.didYouMean);
});

// 自动检测并使用建议的正确源文本
translate('Thunk you', { from: 'en', to: 'zh' }).then(res => {
    // => 谢谢你
    console.log(res.to.text.value);
    // => true
    console.log(res.from.text.didYouMean);
});
```

#### 网络异常重试

[查看用例](example/retry.ts)

```javascript
import translate from '@kabeep/node-translate';

// 在翻译请求失败时进行重试尝试（此时最多三次请求）
translate('例子', { to: 'en', retry: 2, timeout: 100 }).catch((err) => {
    // => ETIMEDOUT - 达到了超时限制
    // => ECONNRESET - 连接被强制关闭
    // => EADDRINUSE - 无法绑定到任何空闲端口
    // => ECONNREFUSED - 服务器拒绝了连接
    // => EPIPE - 正在写入的流的远程端已关闭
    // => ENOTFOUND - 无法将主机名解析为 IP 地址
    // => ENETUNREACH - 没有网络连接
    // => EAI_AGAIN - DNS 查询超时
    // => EPARSE - 意料外的响应数据
    // => EVALIDATION - 非法语言代码
    console.log(err.message);
});
```

#### ISO-639-1-X

[查看用例](example/iso.ts)

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

## 🔗 关联库

- [google-translate-api](https://github.com/matheuss/google-translate-api) - A free and unlimited API for Google
  Translate 💵🚫
- [google-translate](https://github.com/iamtraction/google-translate) - 🈯 A Node.JS library to consume Google Translate
  API for free.

## 🤝 贡献

欢迎通过 Pull Requests 或 [Issues](https://github.com/kabeep/node-translate/issues) 来贡献你的想法和代码。

## 📄 许可

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。
