import translate from '../src/index.js';

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
