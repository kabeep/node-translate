import translate from '../src/index.js';

// Retry attempts for the translation request in case of failure (with a maximum of three requests)
translate('例子', { to: 'en', retry: 2, timeout: 100 }).catch((err) => {
    // => ETIMEDOUT    - One of the timeout limits was reached
    // => ECONNRESET   - The connection was forcibly closed
    // => EADDRINUSE   - Could not bind to any free port
    // => ECONNREFUSED - The connection was refused by the server
    // => EPIPE        - The remote side of the stream being written has been closed
    // => ENOTFOUND    - Could not resolve the hostname to an IP address
    // => ENETUNREACH  - No internet connection
    // => EAI_AGAIN    - DNS lookup timed out
    // => EPARSE       - Failure of parse translation
    // => EVALIDATION  - Failure of iso code validation
    console.log(err.message);
});