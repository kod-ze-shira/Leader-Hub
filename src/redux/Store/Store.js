import { createStore, combineReducers } from 'redux';
import workpaceReducer from '../Reducers/workpace';


const reducer = combineReducers({ workpaceReducer });

const store = createStore(reducer);
window.store = store;
export default store;