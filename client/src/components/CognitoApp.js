import React, { Component } from 'react';
import {connect} from 'react-redux';

import '@shopify/polaris/styles.css';
import { Page } from '@shopify/polaris';

import {fetchCognitoToken} from '../reducers/app';


class CognitoApp extends Component {

  componentDidMount() {
    this.props.fetchCognitoToken(this.props.params)
  }

  render() {
    return(
      <Page title="Cognito App">
      </Page>
    )
  }
}

export default connect(
  (state) => ({cognitoToken: state.cognitoToken}),
  {fetchCognitoToken}
)(CognitoApp)


