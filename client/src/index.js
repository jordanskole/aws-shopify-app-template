import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {Provider} from 'react-redux';


// Import CognitoApp component
import CognitoApp from './components/CognitoApp';
// import {getShopifyParams} from './lib/utilities';

import store from './store';

import registerServiceWorker from './registerServiceWorker';

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <CognitoApp />
    </Provider>,
    document.getElementById('root')
  );
}
render()

store.subscribe(render);

registerServiceWorker();
