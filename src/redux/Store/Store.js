
// import reducer from './reducers';
import project_reducer from '../Reducers/project_reducer';
import task_reducer from '../Reducers/task_reducer';
import workspace_reducer from '../Reducers/workspace_reducer';
import card_reducer from '../Reducers/card_reducer';
import status_reducer from '../Reducers/status_reducer';
import public_reducer from '../Reducers/public_reducer';
import files_reducer from '../Reducers/files_reducer'
import share_reducer from '../Reducers/share_reducer';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { actions } from '../actions/action.js';
import { deleteProjectInServer, editProjectInServer, getProjectByIdInServer, getProjectsByWorkspaceId, newProject } from '../middleware/projectCrud';
import {
    editTask, getTaskByIdFromServer, getTasksByCardId, newTask, removeTaskById, getAllTasksNotBelongsCardForUser, getAllMilestonesTasks
    , moveTaskBetweenCards,
    completeTask
} from '../middleware/taskCrud';
import { addNewWorkspaceToServer, deleteWorkspaceFromServer, duplicateWorkspace, editWorkspaceInServer, getAllWorkspacesFromServer } from '../middleware/workspaceCrud';
import { createNewTeam, getAllTeamsForUser, getContactsForUser } from '../middleware/teamCrud';
import { editCard, getCardsByProjectId, newCard, removeCardById } from '../middleware/cardCrud';
import { createStatus, editStatus, removeStatus, getAllStatusesTaskForWorkspace } from '../middleware/statusCrud';
import { createSystemWave } from '../middleware/waveCrud'
import { extractJwt } from '../middleware/loginCrud';
import { uploadFiles, removeFile, getFiles } from '../middleware/filesCrud';

const reducers = combineReducers({ project_reducer, task_reducer, workspace_reducer, public_reducer, card_reducer, status_reducer, files_reducer, share_reducer });

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware
            (
                deleteProjectInServer,
                createSystemWave,
                editProjectInServer,
                editWorkspaceInServer,
                addNewWorkspaceToServer,
                getAllWorkspacesFromServer,
                createNewTeam,
                newProject,
                getProjectsByWorkspaceId,
                getTaskByIdFromServer,
                getProjectByIdInServer,
                getCardsByProjectId,
                getTasksByCardId,
                deleteWorkspaceFromServer,
                newCard,
                newTask,
                removeTaskById,
                editTask,
                duplicateWorkspace,
                getAllTasksNotBelongsCardForUser,
                getAllMilestonesTasks,
                editCard,
                removeCardById,
                getAllStatusesTaskForWorkspace,
                createStatus,
                uploadFiles,
                // downloadFile,
                extractJwt,
                getFiles,
                removeFile,
                getContactsForUser,
                getAllTeamsForUser,
                editStatus,
                removeStatus,
                moveTaskBetweenCards,
                completeTask
            ))
)
store.dispatch(actions.extractJwt());

var url = window.location;
let jwtFromCookie
store.dispatch(actions.setUserName(url.pathname.split('/')[1]))
if (window.location.hostname == "localhost") {
    jwtFromCookie = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ4TXVrSUMzbGNZZ2ZQa0JCcFFkemJ1YXVLb24xIiwiZW1haWwiOiJyZW5hbmFAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjE5NTAyNjI2fQ.o3J6R0lsxa1w8ualIKWHPueFkEa5LiaCyGmaqZO3uOk'
    // jwtFromCookie = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJIZXNJaFlXaVU2Z1A3M1NkMHRXaDJZVzA4ZFkyIiwiZW1haWwiOiJyZW5hbmFAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjEwMzA4MTM4fQ.sEez_H1EQ7JfcBTB3R9MDGq89if9wTJh9rHXYcplYdw"
    store.dispatch(actions.setTokenFromCookies(jwtFromCookie));
}
else {
    if (document.cookie) {
        jwtFromCookie = document.cookie.includes('jwt') ?
            document.cookie.split(";")
                .filter(s => s.includes('jwt'))[0].split("=").pop() : null;
        store.dispatch(actions.setTokenFromCookies(jwtFromCookie));
    }
}
window.store = store;
export const Token = jwtFromCookie;

export default store;