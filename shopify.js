'use strict';
const Shopify = require('./shopify/index');

module.exports = {
  'install' : Shopify.Install,
  'callback': Shopify.Callback,
  'app'     : Shopify.App
}
