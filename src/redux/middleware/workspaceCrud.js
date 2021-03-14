import $ from 'jquery'
import { actions } from '../actions/action'

export const getWorkspaceByIdFromServer = ({ dispatch, getState }) => next => action => {
    if (action.type == "GET_WORKSPACE_BY_ID_FROM_SERVER") {
        let workspaceId = action.payload;
        let url = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/${workspaceId}/getWorkspaceByworkspaceId`
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
    // return new Promise((resolve, reject) => {
    if (action.type === 'GET_ALL_WORKSPACES_FROM_SERVER') {
        let urlData = "https://reacthub.dev.leader.codes/api/" + getState().public_reducer.userName + "/getFullWorkspacesForUser"
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
                    dispatch(actions.setWorkspaces(result.userWorkspaces))
                    //if user refresh page give him the first project
                    dispatch(actions.setWorkspace(result.userWorkspaces[0]))
                    // dispatch(actions.setProjects(result.userWorkspaces[0]).projectList)
                })
            })
    }
    // resolve(true)

    // })
    return next(action);
}
export const getFullWorkspacesForUser = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_FULL_WORKSPACES_FOR_USER') {
        let urlData = "https://reacthub.dev.leader.codes/api/" + getState().public_reducer.userName + "/getFullWorkspacesForUser"
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
                    dispatch(actions.setWorkspaces(result.workspaces))
                })
            })
    }
    return next(action);
}


export const addNewWorkspaceToServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'ADD_NEW_WORKSPACE_TO_SERVER') {
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/newWorkspace`
        let workspace = action.payload
        console.log(workspace)

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
                dispatch(actions.addNewWorkspace(data.message))
                // dispatch(actions.addTaskToTasksWhenAddTaskToServer(data.message));
            },
            error: function (err) {
                //בדיקה אם חוזר 401 זאת אומרת שצריך לזרוק אותו ללוגין
                console.log("error")
                console.log(err)
            }
        });
    }
    return next(action);
}

export const editWorkspaceInServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'EDIT_WORKSPACE_IN_SERVER') {

        let workspace = { 'workspace': getState().workspace_reducer.workspace.workspace };

        // delete workspace.workspace.projects
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/editWorkspace`
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
                console.log(data);
                dispatch(actions.updateWorkspaceUfterEditInServer(data.result))
            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {
                })
            }
        });
    }
    return next(action);
}

export const deleteWorkspaceFromServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'DELETE_WORKSPACE_FROM_SERVER') {
        let workspace = getState().workspace_reducer.workspace.workspace;
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/${workspace._id}/removeWorkspaceById`
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
        fetch(`https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/${getState().workspace_reducer.workspace._id}/duplicateWorkspace`,
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
                    dispatch(actions.addWorkspaceToWorkspaces(result.duplicateWorkspace))

                })

            })
    }
    return next(action);

}

//this func to check the headers jwt and username, if them not good its throw to login
function checkPermission(result) {
    return new Promise((resolve, reject) => {
        if (result.status == "401") {
            result.routes ?
                window.location.assign(`https://dev.leader.codes/login?des=${result.des}'&routes='${result.routes}`) :
                window.location.assign(`https://dev.leader.codes/login?des=${result.des}`)
            reject(false)

        }
        resolve(true)

    })
}