import translate from '../src/index.js';

// Use `auto` or leave the `from` parameter empty to detect language by adativeness
// Use `auto` or leave the `to` parameter empty to detect language by os (`en` for example)
translate('例子').then(res => {
    // => example
    console.log(res.to.text.value);
});
