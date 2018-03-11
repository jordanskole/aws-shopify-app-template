import React, { Component } from 'react';
import {connect} from 'react-redux';

// Import Polaris
import {EmbeddedApp} from '@shopify/polaris/embedded';
import { Page } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import {shopifyAPIKey} from '../utilities/credentials';

import {fetchCognitoToken, setShopifyParams} from '../reducers/app';
import {getShopifyParams} from '../lib/utilities';
import store from '../store';


class CognitoApp extends Component {

  constructor(props) {
    super(props)
    this.shopifyParams = getShopifyParams();
  }

  componentDidMount() {
    this.props.setShopifyParams(this.shopifyParams)
    this.props.fetchCognitoToken(this.shopifyParams)
  }

  render() {
    return(
      <EmbeddedApp shopOrigin={'https://' + this.shopifyParams.shop} apiKey={shopifyAPIKey} forceRedirect="true">
        <Page title="Cognito App" />
      </EmbeddedApp>
    )
  }
}

export default connect(
  (state) => ({
    cognito: state.cognito
  }),
  {fetchCognitoToken, setShopifyParams}
)(CognitoApp)


