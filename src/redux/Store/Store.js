import { createStore, combineReducers } from 'redux';
import workpaceReducer from '../Reducers/workpace';
import projectReducer from '../Reducers/project'


const reducer = combineReducers({ workpaceReducer,projectReducer});

const store = createStore(reducer);
window.store = store;
export default store;