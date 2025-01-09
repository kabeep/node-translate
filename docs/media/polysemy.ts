import translate from '../src/index.js';

// Output polysemy information for the translated text
translate('例子', { to: 'en' }).then(res => {
    // => [{
    //     label: 'noun',
    //     children: [
    //         'example',
    //         'case',
    //         'instance',
    //     ],
    // }]
    console.log(res.to.polysemy);
});
