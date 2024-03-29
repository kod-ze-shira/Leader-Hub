import keys from '../../config/env/keys'

// import reducer from './reducers';
import status_reducer from '../Reducers/status_reducer';
import public_reducer from '../Reducers/public_reducer';
import files_reducer from '../Reducers/files_reducer'
import share_reducer from '../Reducers/share_reducer';
import design_reducer from '../Reducers/design_reducer';
import overview_reducer from '../Reducers/overview_reducer';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { actions } from '../actions/action.js';
/////////////////////////////////////////////
import { deleteProjectInServer, editProjectInServer, getFilesForProject, getOverdueTasksByProjectId, getProjectByIdInServer, getProjectsByWorkspaceId, getTaskStatusesOfProject, newProject } from '../middleware/projectCrud';
import { createStatus, editStatus, getAllStatusesTaskForWorkspace, removeStatus } from '../middleware/statusCrud';
import {
    editTask, getTaskByIdFromServer, getTasksByCardId, newTask, removeTaskById, getAllTasksNotBelongsCardForUser, getAllMilestonesTasks
    , moveTaskBetweenCards, dragTask, dragCard, updateLike, removeFileInTaskAndServerFiles,
    // moveCards,
    completeTask, belongTask, newTaskNotBelong, displayLineByStart, disaplayLineByStop
} from '../middleware/taskCrud';
import { addNewWorkspaceToServer, deleteWorkspaceFromServer, duplicateWorkspace, editWorkspaceInServer, getAllWorkspacesFromServer } from '../middleware/workspaceCrud';
import { assingTo, createNewTeam, getAllTeamsForUser, getContactsForUser, shareObject, getMembersByProjectId, addMembers, assingToMany, removeMemberFromAssign } from '../middleware/teamCrud';
import { editCard, getCardsByProjectId, newCard, removeCardById } from '../middleware/cardCrud';
import { createSystemWave } from '../middleware/waveCrud'
import { extractJwt } from '../middleware/loginCrud';
import { uploadFiles, removeFile, downloadFile, getFiles, downloadFolder } from '../middleware/filesCrud';
import { setIfShowShareProjectsToTrue } from '../middleware/shareProjectsCrud';

const reducers = combineReducers({ overview_reducer, public_reducer, status_reducer, files_reducer, share_reducer, design_reducer });

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
                getTaskStatusesOfProject,
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
                downloadFolder,
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
                removeFileInTaskAndServerFiles,
                // getMembersByProjectId,
                addMembers,
                displayLineByStart,
                disaplayLineByStop,
                setIfShowShareProjectsToTrue,
                assingToMany,
                removeMemberFromAssign
            ))
)
store.dispatch(actions.extractJwt());

var url = window.location;
let jwtFromCookie
store.dispatch(actions.setUserName(url.pathname.split('/')[1]))
if (window.location.hostname === "localhost") {
    jwtFromCookie = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ6bUJBR2w0WFJrYXFpb1MzYUUyN1E3RTYxRG0xIiwiZW1haWwiOiJyZW5hbmFAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjIzMzEyODYwfQ.PaZaGd7eZ0K8t4dBWVwQ55uUNsLAZ73OYChnJ7ronko'
    // jwtFromCookie = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJYUkpoSmNYazZKUUYyY0NhVmlOcWFFbUhtRFoyIiwiZW1haWwiOiJldGlAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjI0NTE5NTYxfQ.91bWm0VkQ4nGsAif8U6pP3LxEhjUokhCqLWcoRdd4qI'
    store.dispatch(actions.setTokenFromCookies(jwtFromCookie));
}
else {
    jwtFromCookie = document.cookie && document.cookie.includes(keys.JWT) ? document.cookie.split(";")
        .filter(s => s.includes(keys.JWT))[0].split("=").pop() : null;

    // if (document.cookie) {
    //     jwtFromCookie = document.cookie.includes('jwt') ?
    //         document.cookie.split(";")
    //             .filter(s => s.includes('jwt'))[0].split("=").pop()
    //         : document.cookie.includes('devJwt') ?
    //             document.cookie.split(";")
    //                 .filter(s => s.includes('devJwt'))[0].split("=").pop() : null;
    store.dispatch(actions.setTokenFromCookies(jwtFromCookie));
    // }
}
window.store = store;
export const Token = jwtFromCookie;

export default store;