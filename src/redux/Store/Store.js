
// import reducer from './reducers';
import project_reducer from '../Reducers/project_reducer';
import task_reducer from '../Reducers/task_reducer';
import workspace_reducer from '../Reducers/workspace_reducer';
import public_reducer from '../Reducers/public_reducer';

import team_reducer from '../Reducers/team_reducer';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getProjetsByWorkspace, getTasksByProject } from '../middleware/crud'
import { actions } from '../actions/action.js';
import { setWorkspaCrud } from '../middleware/crud'
import { getAllWorkspacesFromServer } from '../middleware/crud'
import { setTeamCrud } from '../middleware/crud'

import { setProjectCrud } from '../middleware/crud'

import { setTaskCrud } from '../middleware/crud'
import { editWorkspaceInServer } from '../middleware/crud'
import { editProjectInServer } from '../middleware/crud'
import { editTaskInServer } from '../middleware/crud'
import { getTaskByIdFromServer } from '../middleware/crud'


const reducers = combineReducers({ project_reducer, task_reducer, workspace_reducer, team_reducer, public_reducer });


const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware
            (
                editTaskInServer,
                editProjectInServer,
                editWorkspaceInServer,
                setWorkspaCrud,
                getAllWorkspacesFromServer,
                setTaskCrud,
                setTeamCrud,
                setProjectCrud,
                getProjetsByWorkspace,
                getTasksByProject,
                getTaskByIdFromServer
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
let jwtFromCookie = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJIZXNJaFlXaVU2Z1A3M1NkMHRXaDJZVzA4ZFkyIiwiZW1haWwiOiJyZW5hbmFAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjEwMzA4MTM4fQ.sEez_H1EQ7JfcBTB3R9MDGq89if9wTJh9rHXYcplYdw"
store.dispatch(actions.setTokenFromCookies(jwtFromCookie));

export default store;