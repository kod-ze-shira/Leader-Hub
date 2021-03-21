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
                dispatch(actions.setTask(data.result))
                console.log("success")
                console.log("data", data);

            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {
                })
            }
        });
    }
    return next(action);
}
export const getTasksByCardId = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_TASKS_BY_CARD_ID') {

        var status = action.payload;
        // console.log(status);
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/getAllTasksNotBelongsCardForUser`

        $.ajax({
            url: urlData,
            type: 'GET',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                dispatch(actions.setStatuses(data.status))
                console.log("success")
                console.log("data", data);

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
        if (result.status == "401") {
            result.routes ?
                window.location.assign(`https://dev.leader.codes/login?des=${result.des}'&routes='${result.routes}`) :
                window.location.assign(`https://dev.leader.codes/login?des=${result.des}`)
            reject(false)

        }
        resolve(true)

    })
}