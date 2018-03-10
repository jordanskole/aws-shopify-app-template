'use strict';

import config from '../config.json';
import crypto from 'crypto';
import cookie from 'cookie';
import querystring from 'querystring';
import request from 'request-promise';
import { shopifyIsValid } from './utilities';

import AWS from 'aws-sdk';
const cognitoidentity = new AWS.CognitoIdentity();

const apiKey = config.SHOPIFY_API_KEY;
const apiSecret = config.SHOPIFY_API_SECRET;
const scopes = config.SCOPES;
const forwardingAddress = config.BASE_URL;

module.exports = (event, context, callback) => {

  context.callbackWaitsForEmptyLoop = false;
  let response;

  if (shopifyIsValid(event.queryStringParameters, true, apiSecret)) {

    // build our params
    const cognitoParams = {
      IdentityPoolId: 'us-east-1:6f495654-5560-46ef-b09b-a00ea882a542', /* required  us-east-1_wDf8fU7RT */
      // IdentityId: 'us-east-1:6f495654-5560-46ef-b09b-a00ea882a542',
      Logins: { /* required */
        'shopify-developer-provider': event.queryStringParameters.shop,
        /* '<IdentityProviderName>': ... */
      },
      TokenDuration: 86400
    };

    // get a token from cognito
    cognitoidentity.getOpenIdTokenForDeveloperIdentity(cognitoParams, (err, data) => {

      if (err) console.log(err, err.stack); // an error occurred

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'App it up baby',
          cognito: data
        })
      }
      callback(null, response);
    });

  } else {
    response = {
      statusCode: 400,
      body: JSON.stringify({
        message: 'HMAC validation failed'
      })
    }
    callback(null, response);
  }

};