'use strict';

import crypto from 'crypto';


export function shopifyIsValid(params, non_state, secret) {
    if(!non_state && this.config.nonce !== params['state']){
        return false;
    }

    var hmac = params['hmac'],
        theHash = params['hmac'] || params['signature'],
        parameters = [],
        digest,
        message;

    for (var key in params) {
        if (key !== "hmac" && key !== "signature") {
            parameters.push(key + '=' + params[key]);
        }
    }

    message = parameters.sort().join(hmac ? '&' : '');

    digest = crypto
                .createHmac('SHA256', secret)
                .update(message)
                .digest('hex');

    return ( digest === theHash );
}