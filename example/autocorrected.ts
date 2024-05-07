import translate from '../src/index.js';

// Automatically correct spelling errors in the source text
translate('Thnak you', { from: 'en', to: 'zh' }).then(res => {
    // => 谢谢
    console.log(res.to.text.value);
    // => true
    console.log(res.from.text.autoCorrected);
});
