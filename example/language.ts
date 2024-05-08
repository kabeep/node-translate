import translate from '../src/index.js';

// Language name and capitalized correction
translate('例子', { to: 'ENGlish' }).then(res => {
    // => example
    console.log(res.text);
});
