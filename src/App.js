import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import Store from './redux/Store/Store';
import Hub from './component/hub/hub';
import HeaderLeader from '@leadercodes/leader-header'
import BodyEmailOfAssignmentTask from './component/hub/BodyOfAssignmentTask/BodyEmailOfAssignmentTask';

export default function App(props) {

  return (
    <>
      <Provider store={Store}>
        <>
          <Hub></Hub>
          {/* <BodyEmailOfAssignmentTask/> */}
        </>
      </Provider>
    </>
  );
}




