import translate from '../src/index.js';

// Output phonetic transcription of the source text and the translated text
translate('例子', { to: 'ja' }).then(res => {
    // => Lìzi
    console.log(res.from.text.phonetics);
    // => Rei
    console.log(res.to.text.phonetics);
});
