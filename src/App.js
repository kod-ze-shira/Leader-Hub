import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import Store from './redux/Store/Store';
import Hub from './component/hub/hub';
import HeaderLeader from '@leadercodes/leader-header'
import BodyEmailOfAssignmentTask from './component/hub/BodyOfAssignmentTask/BodyEmailOfAssignmentTask';
import ContactList from './component/hub/contact/contactList';
import Chart from './component/hub/charts/chart';
import $ from 'jquery'

export default function App(props) {
//   $('input, textarea').keyup(function(){
//     let $this = $(this);
//      if($this.val().length == 1)
//      {
//          var x =  new RegExp("[\x00-\x80]+"); // is ascii
 
//          //alert(x.test($this.val()));
 
//          var isAscii = x.test($this.val());
 
//          if(isAscii)
//          {
//              $this.css("direction", "ltr");
//          }
//          else
//          {
//              $this.css("direction", "rtl");
//          }
//      }
 
//  });
  return (
    <>
      <Provider  store={Store}>
        <>
          <Hub></Hub>
          {/* <BodyEmailOfAssignmentTask/> */}
          {/* <ContactList /> */}
          {/* <Chart/> */}
        </>
      </Provider>
    </>
  );
}




