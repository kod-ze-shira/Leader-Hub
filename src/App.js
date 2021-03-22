import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import Store from './redux/Store/Store';
import Hub from './component/hub/hub';
import HeaderLeader from '@leadercodes/leader-header'
import ViewAllStatuses from './component/hub/status/viewAllStatuses';

export default function App(props) {

  return (<>
    <HeaderLeader appName='hub' userName='' />
    <Provider store={Store}>
      <>
        {/* <ConfiguratorList></ConfiguratorList> */}
        <Hub></Hub>
        {/* <ViewAllStatuses/> */}
      </>
    </Provider>
  </>
  );
}




