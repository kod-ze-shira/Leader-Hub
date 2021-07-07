// import 'devextreme/dist/css/dx.common.css';
// import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Favicon from 'react-favicon'
import { Provider } from 'react-redux';
import Store from './redux/Store/Store';
import Hub from './component/hub/hub';
// import HeaderLeader from '@leadercodes/leader-header'


export default function App(props) {
  return (
    <>
      <Favicon url={require('../src/component/img/FaviconHub.png')} />

      <Provider store={Store}>
        <>
          <Hub></Hub>
          {/* <BodyEmailOfAssignmentTask/> */}
          {/* <ContactList /> */}
          {/* <HeaderLeader /> */}
        </>
      </Provider>
    </>
  );
}




