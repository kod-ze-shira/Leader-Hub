import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import Store from './redux/Store/Store';
import Contacts from './component/hubFeature/Overview/contacts/contacts'
import Hub from './component/hub/hub';
import HeaderLeader from '@leadercodes/leader-header'
import BodyEmailOfAssignmentTask from './component/hub/BodyOfAssignmentTask/BodyEmailOfAssignmentTask';
import ContactList from './component/hub/contact/contactList';

export default function App(props) {

  return (
    <>
      <Provider store={Store}>
        <>
        <Contacts/>
        
          {/* <Hub></Hub> */}
          {/* <BodyEmailOfAssignmentTask/> */}
          {/* <ContactList /> */}

        </>
      </Provider>
    </>
  );
}




