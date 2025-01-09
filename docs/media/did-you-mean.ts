import translate from '../src/index.js';

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
