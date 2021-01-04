
// import reducer from './reducers';
import workpaceReducer from '../Reducers/workpace';
import project_reducer from '../Reducers/project_reducer';
import task_reducer from '../Reducers/task_reducer';
import workspace_reducer from '../Reducers/workspace_reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getUser } from '../middleware/crud'
import { actions } from '../actions/action.js';
import { setWorkspaCrud } from '../middleware/crud'

const reducers = combineReducers({ workpaceReducer, project_reducer, task_reducer, workspace_reducer });


const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware
            (
                setWorkspaCrud
                // getUser//פונקציה לקריאה//

            ))
)
var url = window.location;
console.log(url);
var userName = (url.pathname.split('/')[1]);
console.log(userName);
//ליירק בעת  עבודה לוקאלית 
if (document.cookie) {
    let jwtFromCookie = document.cookie.includes('jwt') ?
        document.cookie.split(";")
            .filter(s => s.includes('jwt'))[0].split("=").pop() : null;
    store.dispatch(actions.setTokenFromCookies(jwtFromCookie));
}
window.store = store;
//ליירק בעת  עבודה בשרת  
// let jwtFromCookie="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJzaW1kc01ycmNKZHBRZ3RhOGtnWHlRQmRERnkyIiwiZW1haWwiOiJjdG9AbGVhZGVyLmNvZGVzIiwiaXAiOiI1LjEwMi4yNDYuMjAyIiwiaWF0IjoxNjA0NDgyOTc0fQ.Nn2IC7j_VCDOFIkbwzT3nao0l7OcqbNqDUKkcL0Aoik";
// store.dispatch(actions.setTokenFromCookies(jwtFromCookie));
store.dispatch(actions.getUserFromServer(userName));

export default store;