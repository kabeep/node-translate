export type ResponseErrorCodes =
    | 'ETIMEDOUT' // One of the timeout limits was reached
    | 'ECONNRESET' // The connection was forcibly closed
    | 'EADDRINUSE' // Could not bind to any free port
    | 'ECONNREFUSED' // The connection was refused by the server
    | 'EPIPE' // The remote side of the stream being written has been closed
    | 'ENOTFOUND' // Could not resolve the hostname to an IP address
    | 'ENETUNREACH' // No internet connection
    | 'EAI_AGAIN'; // DNS lookup timed out
