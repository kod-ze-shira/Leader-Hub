// // import 'devextreme/dist/css/dx.common.css';
// // import 'devextreme/dist/css/dx.light.css';
// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import './App.css';
// import { HashRouter } from 'react-router-dom'
// import { Provider } from 'react-redux';
// import Store from './redux/Store/Store';
// import Hub from './component/hub/hub';
// // import HeaderLeader from '@leadercodes/leader-header'
// import BodyEmailOfAssignmentTask from './component/hub/BodyOfAssignmentTask/BodyEmailOfAssignmentTask';
// import ContactList from './component/hub/contact/contactList';
// import $ from 'jquery'

// export default function App(props) {
//   return (
//     <>
//       <Provider store={Store}>
//         <>
//           <Hub></Hub>
//           {/* <FilesOfProject></FilesOfProject> */}
//           {/* <BodyEmailOfAssignmentTask/> */}
//           {/* <ContactList /> */}
//           {/* <HeaderLeader /> */}
//         </>
//       </Provider>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://socket.chat.leader.codes/";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    alert("fsdfds")
    debugger
    const socket = socketIOClient(ENDPOINT,{"transports" : ["websocket"]});
    
    socket.on("connection", data => {
      setResponse(data);
    });

    socket.on("connect", data => {
      setResponse(data);
    });

    socket.on("connect1", data => {
      setResponse(data);
    });

    socket.emit("send_message", data => {
      setResponse(data);
    });
    
  }, []);

  return (
    <p style={{backgroundColor:'red',height:'100px'}}>
      It's fassfasfsa <time dateTime={response}>{response}</time>
    </p>
  );
}

export default App;



