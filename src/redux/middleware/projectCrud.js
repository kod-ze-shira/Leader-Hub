import $ from 'jquery'
import { actions } from '../actions/action'
import configData from '../../ProtectedRoute/configData.json'

export const getProjectByIdInServer = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_PROJECT_BY_ID_IN_SERVER') {
        console.log(getState());
        var projectId = action.payload;
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/${projectId}/getProjectById`

        $.ajax({
            url: urlData,
            type: 'GET',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",

            success: function (data) {
                dispatch(actions.setProject(data))


            },
            error: function (err) {

                checkPermission(err).then((ifOk) => {

                })
            }
        });




    }
    return next(action);
}

//********for overview*********
export const getOverdueTasksByProjectId = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_OVERDUE_TASKS_BY_PROJECT_ID') {
        var projectId = action.payload;
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/${projectId}/getOverdueTasksOfProject`

        $.ajax({
            url: urlData,
            type: 'GET',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                dispatch(actions.setOverdueTasks(data.count))
            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {
                })
            }
        });
    }
    return next(action);
}

export const getTaskStatusesOfProject = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_TASK_STATUSES_OF_PROJECT') {
        let reducer = getState().public_reducer
        var projectId = reducer.workspaces[reducer.indexOfWorkspace].projects[reducer.indexCurrentProject]._id;
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/${projectId}/getTaskStatusesOfProject`

        fetch(urlData,
            {
                method: 'GET',
                headers: { authorization: reducer.tokenFromCookies }
            })
            .then((result) => {
                return result.json()
            })
            .then((result) => {

                checkPermission(result).then((ifOk) => {
                    dispatch(actions.setTaskStatusesOfProject(result.statuses))

                })
            })
    }
    return next(action);
}

export const getProjectsByWorkspaceId = ({ dispatch, getState }) => next => action => {

    if (action.type === "GET_PROJECTS_BY_WORKSPACE_ID") {
        let url = `${configData.SERVER_URL}/${getState().public_reducer.userName}/${action.payload}/getProjectsByWorkspaceId`;
        fetch(url,
            {
                method: 'GET',
                headers: { authorization: getState().public_reducer.tokenFromCookies }
            })
            .then((result) => {
                return result.json()
            })
            .then((result) => {

                checkPermission(result).then((ifOk) => {
                    dispatch(actions.setProjects(result.projects))
                    // dispatch(actions.addProjectToProjects(result.projects))
                    // addProjectToProjects
                })
            })
    }
    return next(action)
}


//////////////////////////////////////////////////
export const getFilesForProject = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_FILES_FOR_PROJECT') {
        let jwtFromCookie = getState().public_reducer.tokenFromCookies
        let url = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/${getState().public_reducer.workspaces[getState().public_reducer.indexOfWorkspace].projects[getState().public_reducer.indexCurrentProject]._id}/getFilesForProject`
        $.ajax({
            type: "GET",
            url: url,
            headers: { authorization: jwtFromCookie },
            success: (data) => {
                console.log('data' + data.projectFiles);
                dispatch(actions.setFilesForProject(data.projectFiles))
            },
            error: function (err) {

                checkPermission(err).then((ifOk) => {
                })
            }
        })
    }
    return next(action)
}

export const newProject = ({ dispatch, getState }) => next => action => {

    if (action.type === 'NEW_PROJECT') {

        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/newProject`
        let project = action.payload;
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data:
                JSON.stringify({
                    "project": project,
                }),
            dataType: 'json',
            success: function (data) {
                dispatch(actions.addProjectToProjects(data.message))

            },
            error: function (err) {
                //בדיקה אם חוזר 401 זאת אומרת שצריך לזרוק אותו ללוגין
                checkPermission(err).then((ifOk) => {

                })
            }
        });
        // })
    }
    return next(action);
}

export const editProjectInServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'EDIT_PROJECT_IN_SERVER') {
        // let projectBeforeChanges = getState().public_reducer.projects[0];
        let project = action.payload.project;
        let projectBeforeChanges = action.payload.projectBeforeChanges;
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/editProject`

        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ 'project': project }),
            success: function (data) {

                dispatch(actions.setProjectInWorkspace(data.result))

            },
            error: function (err) {

                checkPermission(err).then((ifOk) => {
                    dispatch(actions.setProjectInWorkspace(projectBeforeChanges))

                })
            }
        });

    }
    return next(action);
}

export const deleteProjectInServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'DELETE_PROJECT_IN_SERVER') {
        var projectId = action.payload;
        // let project = getState().project_reducer.project;
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/${projectId}/removeProjectById`
        // let jwtFromCookie = getState().public_reducer.tokenFromCookies;
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            // data: JSON.stringify({ project }),
            success: function (data) {
                // dispatch(actions.setProject(data.result))
                dispatch(actions.deleteProjectFromWorkspace(data.project))
                // dispatch(actions.setProjects(result.projects))

            },
            error: function (err) {

                checkPermission(err).then((ifOk) => {

                })
            }
        });

    }
    return next(action);
}

// export const duplicateProject = ({ dispatch, getState }) => next => action => {
//     if (action.type === 'DUPLICATE_PROJECT') {
//         let projectId = getState().project_reducer.project;
//         let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/:${projectId}/${project._id}/duplicateProject`

//     }
// }

///this func to check the headers jwt and username, if them not good its throw to login
function checkPermission(result) {
    return new Promise((resolve, reject) => {
        if (result.status == "401") {
            result.responseJSON.routes ?//in ajax has responseJSON but in in fetch has routes
                window.location.assign(`https://dev.accounts.codes/hub/login?routes=hub/${result.responseJSON.routes}`) :
                result.routes ?
                    window.location.assign(`https://dev.accounts.codes/hub/login?routes=hub/${result.routes}`) :
                    window.location.assign(`https://dev.accounts.codes/hub/login`)

            reject(false)

        }
        resolve(true)

    })
}