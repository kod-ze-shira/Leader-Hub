import $ from 'jquery'
import { actions } from '../actions/action'
import configData from '../../ProtectedRoute/configData.json'
import keys from '../../config/env/keys'

export const getAllStatusesTaskForWorkspace = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_ALL_STATUSES_TASK_FOR_WORKSPACE') {
        debugger
        let workspaceId;
        if (action.payload) {
            if (action.payload.workspaceId)
                workspaceId = action.payload.workspaceId
        }
        else
            workspaceId = getState().public_reducer.workspaces[getState().public_reducer.indexOfWorkspace]._id
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/${workspaceId}/getAllStatusesTaskForWorkspace`
        $.ajax({
            url: urlData,
            type: 'GET',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",

            success: function (data) {

                dispatch(actions.setStatuses(data.statuses))
                console.log("success")
                if (action.payload) {
                    if (action.payload.task) {
                        let task = action.payload.task
                        let status = data.statuses.find((s) => s.workspace === workspaceId)._id
                        task.status = status
                        dispatch(actions.editTask({
                            'type': 'taskNotBelong',
                            'task': task
                        }))
                    }
                }
                // console.log("data", data);
                console.log("data.statuses", data.statuses);
            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {
                })
            }
        });
    }
    return next(action);
}


// url:
// {{urlHub}}/api/renana-il/createStatus

// body (ex'):
// {
//     "statusTask":{
//         "statusName":"backend to do"
//     }
// }

export const createStatus = ({ dispatch, getState }) => next => action => {
    if (action.type === 'CREATE_STATUS') {
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/createStatus`
        let statusTask = action.payload
        console.log(statusTask)
        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",

            data: JSON.stringify({ statusTask }),
            success: function (data) {
                console.log("success")
                console.log(data.newStatusTask);
                dispatch(actions.addNewStatus(data.newStatusTask))
                // console.log("data.newStatusTask",data.newStatusTask);
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

// {{urlHub}}/api/renana-il/editStatus

export const editStatus = ({ dispatch, getState }) => next => action => {
    if (action.type === 'EDIT_STATUS') {
        let taskId = getState().public_reducer.cards[getState().public_reducer.indexCurrentCard]
            .tasks[getState().public_reducer.indexCurrentTask]._id
        console.log(taskId);
        let status = action.payload
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/${taskId}/editStatus`
        console.log(urlData);
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ status }),
            success: function (data) {
                console.log("success")
                console.log("data", data);
                dispatch(actions.setStatuses(data.result))

            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {

                })
            }
        });

    }
    return next(action);
}
// '/:userName/:taskStatusId/removeStatus'
export const removeStatus = ({ dispatch, getState }) => next => action => {

    if (action.type === 'REMOVE_STATUS') {
        let taskId = getState().public_reducer.cards[getState().public_reducer.indexCurrentCard]
            .tasks[getState().public_reducer.indexCurrentTask]._id
        let statusId = action.payload;
        console.log(taskId);
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/${statusId}/${taskId}/removeStatus`
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
                dispatch(actions.removeNotActiveStatus(data.updatedStatus))
                // if (data.result.status=== "401") {
                // }
            },

            error: function (err) {
                checkPermission(err).then((ifOk) => {
                })
            }
        });

    }
    return next(action);
}


//this func to check the headers jwt and username, if them not good its throw to login
function checkPermission(result) {
    return new Promise((resolve, reject) => {
        if (result.status === "401") {
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
