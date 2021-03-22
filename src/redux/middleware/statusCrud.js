import $ from 'jquery'
import { actions } from '../actions/action'

// {{urlHub}}/api/renana-il/getAllStatusesTaskForUser

export const getAllStatusesTaskForUser = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_ALL_STATUSES_TASK_FOR_USER') {

        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/getAllStatusesTaskForUser`
        $.ajax({
            url: urlData,
            type: 'GET',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",

            success: function (data) {
                debugger
                dispatch(actions.setStatuses(data.statuses))
                console.log("success")
                console.log("data", data);
                console.log("data-s", data.statuses);


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
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/createStatus`
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
                console.log(data);

                dispatch(actions.addNewStatus(data.statuses))
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