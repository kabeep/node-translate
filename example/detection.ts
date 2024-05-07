import translate from '../src/index.js';

// Use `auto` or leave the `to` parameter empty to detect language by os
// Detect example of `en`
translate('例子').then(res => {
    // example
    console.log(res.to.text.value);
});
