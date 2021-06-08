
// import reducer from './reducers';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { actions } from '../actions/action.js';
import { editCard, getCardsByProjectId, newCard, removeCardById } from '../middleware/cardCrud';
import { downloadFile, getFiles, removeFile, uploadFiles } from '../middleware/filesCrud';
import { extractJwt } from '../middleware/loginCrud';
/////////////////////////////////////////////
import { deleteProjectInServer, editProjectInServer, getFilesForProject, getOverdueTasksByProjectId, getProjectByIdInServer, getProjectsByWorkspaceId, newProject } from '../middleware/projectCrud';
import { createStatus, editStatus, getAllStatusesTaskForWorkspace, removeStatus } from '../middleware/statusCrud';
import {
    belongTask,
    // moveCards,
    completeTask, dragCard, dragTask, editTask, getAllMilestonesTasks, getAllTasksNotBelongsCardForUser, getTaskByIdFromServer, getTasksByCardId,
    moveTaskBetweenCards, newTask,


    newTaskNotBelong, removeTaskById,
    updateLike
} from '../middleware/taskCrud';
import { assingTo, createNewTeam, getAllTeamsForUser, getContactsForUser, getMembersByProjectId, shareObject } from '../middleware/teamCrud';
import { createSystemWave } from '../middleware/waveCrud';
import { addNewWorkspaceToServer, deleteWorkspaceFromServer, duplicateWorkspace, editWorkspaceInServer, getAllWorkspacesFromServer } from '../middleware/workspaceCrud';
import card_reducer from '../Reducers/card_reducer';
import design_reducer from '../Reducers/design_reducer';
import files_reducer from '../Reducers/files_reducer';
import overview_reducer from '../Reducers/overview_reducer';
import project_reducer from '../Reducers/project_reducer';
import public_reducer from '../Reducers/public_reducer';
import share_reducer from '../Reducers/share_reducer';
import status_reducer from '../Reducers/status_reducer';
import task_reducer from '../Reducers/task_reducer';
import workspace_reducer from '../Reducers/workspace_reducer';



const reducers = combineReducers({overview_reducer, project_reducer, task_reducer, workspace_reducer, public_reducer, card_reducer, status_reducer, files_reducer, share_reducer, design_reducer });

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
                getOverdueTasksByProjectId,
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
                downloadFile,
                extractJwt,
                getFiles,
                /////////////////////////////////////////////////////
                getFilesForProject,
                removeFile,
                getContactsForUser,
                getAllTeamsForUser,
                editStatus,
                removeStatus,
                moveTaskBetweenCards,
                // moveCards,
                dragTask,
                dragCard,
                newTaskNotBelong,
                belongTask,
                completeTask,
                shareObject,
                assingTo,
                updateLike,
                getMembersByProjectId
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
                .filter(s => s.includes('jwt'))[0].split("=").pop()
            : document.cookie.includes('devJwt') ?
                document.cookie.split(";")
                    .filter(s => s.includes('devJwt'))[0].split("=").pop() : null;
        store.dispatch(actions.setTokenFromCookies(jwtFromCookie));
    }
}
window.store = store;
export const Token = jwtFromCookie;

export default store;