import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import Store from './redux/Store/Store';
import Hub from './component/hub/hub';
import HeaderLeader from '@leadercodes/leader-header'
// import { propTypes } from 'react-bootstrap/esm/Image';
import { connect } from 'react-redux'


export default function App(props) {

  return (
    <>
      <HeaderLeader userName='renana-il' appName='hub' />‏

      <Provider store={Store}>
        <>
          {/* <ConfiguratorList></ConfiguratorList> */}
          <Hub></Hub>
        </>
      </Provider>
    </>
  );
}




