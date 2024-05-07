import translate from '../src/index.js';

// Output example sentence of the source word
translate('example', { to: 'zh' }).then(res => {
    // => [
    //     "it is vitally important that parents should set an <b>example</b>",
    //     "she followed her brother's <b>example</b> and deserted her family",
    //     "it's a good <b>example</b> of how European action can produce results",
    // ]
    console.log(res.from.sentences);
});
