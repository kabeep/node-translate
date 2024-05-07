import translate from '../src/index.js';

// Simple example
translate('例子', { to: 'en' }).then(res => {
    // => example
    console.log(res.to.text.value);
});
