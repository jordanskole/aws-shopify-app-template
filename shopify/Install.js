'use strict';

const dotenv = require('dotenv').config();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');



const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products';
const forwardingAddress = process.env.BASE_URL;


module.exports = (event, context, callback) => {

  let response;

  if (typeof event.queryStringParameters != 'null' && typeof event.queryStringParameters.shop != 'null') {
    const shop = event.queryStringParameters.shop;
    const state = nonce();
    const redirectUri = forwardingAddress + '/shopify/callback';
    const installUrl = 'https://' + shop +
      '/admin/oauth/authorize?client_id=' + apiKey +
      '&scope=' + scopes +
      '&state=' + state +
      '&redirect_uri=' + redirectUri;

    response = {
        statusCode: 301,
        headers: {
            "Set-Cookie"  : 'state=' + state + ';',
            "Cookie"      : 'state=' + state + ';',
            "Location"    : installUrl
        },
        body: null
    };

  } else {

    let response = {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request'
      }),
    };

  }

  callback(null, response);
};