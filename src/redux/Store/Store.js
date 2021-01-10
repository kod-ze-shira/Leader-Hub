
// import reducer from './reducers';
import project_reducer from '../Reducers/project_reducer';
import task_reducer from '../Reducers/task_reducer';
import workspace_reducer from '../Reducers/workspace_reducer';
import public_reducer from '../Reducers/public_reducer';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getProjetsByWorkspace } from '../middleware/crud'
import { actions } from '../actions/action.js';
import { setWorkspaCrud } from '../middleware/crud'
import { getAllWorkspacesFromServer } from '../middleware/crud'

import { setProjectCrud } from '../middleware/crud'

import { setTaskCrud } from '../middleware/crud'
import { editWorkspaceFromServer} from '../middleware/crud'
import { editProjectInServer}    from '../middleware/crud'
import { editTaskFromServer} from '../middleware/crud'


const reducers = combineReducers({ project_reducer, task_reducer, workspace_reducer, public_reducer });


const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware
            (  
                editTaskFromServer,
                editProjectInServer,
                editWorkspaceFromServer,
                setWorkspaCrud,
                getAllWorkspacesFromServer,
                setTaskCrud,
                setProjectCrud,
                getProjetsByWorkspace               
            ))
)
var url = window.location;
console.log(url);
store.dispatch(actions.setUserName(url.pathname.split('/')[1]))
// var userName = (url.pathname.split('/')[1]);
// console.log(userName);
//ליירק בעת  עבודה לוקאלית 
// if (document.cookie) {
//     let jwtFromCookie = document.cookie.includes('jwt') ?
//         document.cookie.split(";")
//             .filter(s => s.includes('jwt'))[0].split("=").pop() : null;
//     store.dispatch(actions.setTokenFromCookies(jwtFromCookie));
// }
window.store = store;
//ליירק בעת  עבודה בשרת  
let jwtFromCookie = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJIZXNJaFlXaVU2Z1A3M1NkMHRXaDJZVzA4ZFkyIiwiZW1haWwiOiJyZW5hbmFAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjA5NjY4Mjc3fQ.W7RfgZLb8q6ew51Xwyef-PDVI0qkzcHHbOUdkm4n1U0";
store.dispatch(actions.setTokenFromCookies(jwtFromCookie));

export default store;