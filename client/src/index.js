import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {Provider} from 'react-redux';

// Import Polaris
import {EmbeddedApp} from '@shopify/polaris/embedded';
import {shopifyAPIKey} from './utilities/credentials';

// Import CognitoApp component
import CognitoApp from './components/CognitoApp';

import {setShopifyParams} from './reducers/app';
import store from './store';

import registerServiceWorker from './registerServiceWorker';

const paramObj = new URLSearchParams(window.location.search.slice(1));
let params = {};
for(var value of paramObj.keys()) {
  params[value] = paramObj.get(value);
}



const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <EmbeddedApp shopOrigin={'https://' + params.shop} apiKey={shopifyAPIKey} forceRedirect="true">
        <CognitoApp params={params} />
      </EmbeddedApp>
    </Provider>,
    document.getElementById('root')
  );
}
render()

store.subscribe(render);

registerServiceWorker();
