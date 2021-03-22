import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
// import ConfiguratorList from './component/warps/configurator/configuratorList/configurator_list'
import Store from './redux/Store/Store';
import Hub from './component/hub/hub';
// import { propTypes } from 'react-bootstrap/esm/Image';
import { connect } from 'react-redux'


export default function App(props) {

  return (
    <>

      <Provider store={Store}>
        <>
          {/* <ConfiguratorList></ConfiguratorList> */}
          <Hub></Hub>
        </>
      </Provider>
    </>
  );
}




