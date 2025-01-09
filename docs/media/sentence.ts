import translate from '../src/index.js';

// Output example sentence of the source word
translate('example', { to: 'zh' }).then(res => {
    // => [
    //     "it is vitally important that parents should set an [example]",
    //     "she followed her brother's [example] and deserted her family",
    //     "it's a good [example] of how European action can produce results",
    // ]
    console.log(res.from.sentences);
});
