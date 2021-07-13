import $ from 'jquery'
import { actions } from '../actions/action'
import configData from '../../ProtectedRoute/configData.json'
import keys from '../../config/env/keys'

// ${keys.API_URL_BASE_SERVER}
export const getWorkspaceByIdFromServer = ({ dispatch, getState }) => next => action => {
    if (action.type == "GET_WORKSPACE_BY_ID_FROM_SERVER") {
        let workspaceId = action.payload;
        let url = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/${workspaceId}/getWorkspaceByworkspaceId`
        fetch(url, {
            method: 'GET',
            headers: { authorization: getState().public_reducer.tokenFromCookies }
        }
        ).then((result) => {
            return result.json();
        }).then((result) => {
            console.log(result)
            checkPermission(result).then((ifOk) => {
                dispatch(actions.setWorkspace(result.result))

            })
        })
    }
    return next(action);
}

export const getAllWorkspacesFromServer = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_ALL_WORKSPACES_FROM_SERVER') {
        let urlData;
        // if (window.location.href.includes('share'))//get carrds for user that share
        //     urlData = `${keys.API_URL_BASE_SERVER}/share//${window.location.href.split('/')[6]}/${window.location.href.split('/')[7]}/getWorkspacesForUser`

        // else
        urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/getWorkspacesForUser`
        fetch(urlData,
            {
                method: 'GET',
                headers: { 'authorization': getState().public_reducer.tokenFromCookies }
            })
            .then((res) => {
                console.log("res11111", res)
                return res.json();
            })
            .then((result) => {
                console.log("res", result)
                checkPermission(result).then((ifOk) => {
                    dispatch(actions.setUserId(result.user._id))
                    dispatch(actions.setUserEmail(result.user.email))
                    dispatch(actions.setWorkspaces(result.workspace))
                    dispatch(actions.setPriorities(result.priorities))
                    dispatch(actions.setSharedProjects(result.sharedProjects))

                    //if user refresh page give him the first project
                    // dispatch(actions.setWorkspace(result.userWorkspaces[0]))
                    // dispatch(actions.setProjects(result.userWorkspaces[0]).projects)
                })
            })

    }

    return next(action);
}


export const addNewWorkspaceToServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'ADD_NEW_WORKSPACE_TO_SERVER') {
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/newWorkspace`
        let workspace = action.payload
        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },

            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ workspace }),
            success: function (data) {
                console.log("success")
                console.log(data);
                dispatch(actions.addWorkspaceToWorkspacesFromServer(data.message))
                // dispatch(actions.addTaskToTasksWhenAddTaskToServer(data.message));
            },
            error: function (err) {

                checkPermission(err).then((ifOk) => {
                })
            }
        });
    }
    return next(action);
}

export const editWorkspaceInServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'EDIT_WORKSPACE_IN_SERVER') {

        let workspaceBeforeChanges = action.payload.workspaceBeforeChanges
        let workspace = { 'workspace': getState().public_reducer.workspaces[getState().public_reducer.indexOfWorkspace] };
        // delete workspace.workspace.projects
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/editWorkspace`
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(workspace),
            success: function (data) {
                console.log("success")
                dispatch(actions.updateWorkspaceUfterEditInServer(data.result))
            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {
                    dispatch(actions.setWorkspaceBeforeChanges(workspaceBeforeChanges))
                })
            }
        });
    }
    return next(action);
}

export const deleteWorkspaceFromServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'DELETE_WORKSPACE_FROM_SERVER') {
        debugger
        let workspaceId = action.payload
        let workspace = getState().workspace_reducer.workspace;
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/${workspaceId}/removeWorkspaceById`

        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log("success")
                console.log("data", data);
                dispatch(actions.removeOneWorkspaceFromWorkspaces(data.result))
            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {
                })
            }
        });

    }
    return next(action);
}

export const duplicateWorkspace = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DUPLICATE_WORKSPACE') {
        let workspaceId = action.payload

        fetch(`${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/${workspaceId}/duplicateWorkspace`,
            {
                method: 'POST',
                headers: {
                    authorization: getState().public_reducer.tokenFromCookies,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((result) => {
                return result.json();
            }).then((result) => {
                checkPermission(result).then((ifOk) => {
                    console.log(result);
                    dispatch(actions.addWorkspaceToWorkspaces(result.workspace))

                })
            }).catch((error) => {
                console.log(error);
            })
    }
    return next(action);

}


//this func to check the headers jwt and username, if them not good its throw to login
function checkPermission(result) {
    return new Promise((resolve, reject) => {
        if (result.status == "401") {
            result.responseJSON.routes ?//in ajax has responseJSON but in in fetch has routes
                window.location.assign(`${keys.API_URL_LOGIN}?routes=hub/${result.responseJSON.routes}`) :
                result.routes ?
                    window.location.assign(`${keys.API_URL_LOGIN}?routes=hub/${result.routes}`) :
                    window.location.assign(`${keys.API_URL_LOGIN}`)

            reject(false)

        }
        resolve(true)

    })
}
