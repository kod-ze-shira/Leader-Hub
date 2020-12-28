import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import Hub from './component/hub/hub'
import Store from './redux/Store/Store';


function App() {
  
  return (
    <Provider store={Store}>
    <> 
    
    <Hub></Hub>
    </>
    </Provider>
     
  );
}

export default App;
