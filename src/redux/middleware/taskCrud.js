import $ from 'jquery'
import { actions } from '../actions/action'


export const getTaskByIdFromServer = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_TASK_BY_ID_FROM_SERVER') {

        var taskId = action.payload;
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/` + taskId + "/getTaskById"
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

        var cardId = action.payload;
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/` + cardId + `/getTasksByCardId`
        $.ajax({
            url: urlData,
            type: 'GET',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",

            success: function (data) {
                dispatch(actions.setTasks(data.taskOfCards))
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
export const getAllTasksNotBelongsCardForUser = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_ALL_TASKS_NOT_BELONGS_CARD_FOR_USER') {

        var cardId = action.payload;
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/getAllTasksNotBelongsCardForUser`
        $.ajax({
            url: urlData,
            type: 'GET',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                dispatch(actions.setTasks(data))
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
export const getAllMilestonesTasks = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_ALL_MILESTONES_TASKS') {
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/getAllmilestonesTasksForUser`
        $.ajax({
            url: urlData,
            type: 'GET',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                dispatch(actions.setMilestones(data.milestonesTasksUser))
                console.log("success")
                console.log("data", data.milestonesTasksUser);

            },
            error: function (err) {

                checkPermission(err).then((ifOk) => {

                })
            }
        });
    }
    return next(action);
}
export const newTask = ({ dispatch, getState }) => next => action => {

    if (action.type === 'NEW_TASK') {
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/newTask`
        let task = action.payload;
        console.log(task)

        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ task }),
            success: function (data) {
                console.log("success")
                console.log(data);
                dispatch(actions.addTaskToTasksWhenAddTaskToServer(data.message));
                // createNewEventWhenNewTask(data.message, getState().public_reducer.userName, getState().public_reducer.tokenFromCookies)
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

function createNewEventWhenNewTask(task, userName, jwt) {
    let timeStart = new Date(task.startDate);
    timeStart.setHours(11);
    let startTime = timeStart.toISOString()
    timeStart.setHours(23);
    let endTime = timeStart.toISOString();
    // let timeEnd=new Date(task.startDate).setHours(21);
    // let startDate=new Date(task.startDate).toISOString();
    // let dueDate=new Date(task.dueDate).toISOString();

    // let startDateTimeStart=startDate
    let timeEnd = new Date(task.dueDate);
    timeEnd.setHours(11);
    let startTimeEnd = timeEnd.toISOString()
    timeEnd.setHours(23);
    let endTimeEnd = timeEnd.toISOString();
    //create event on task's startDate
    fetch(`https://calendar.dev.leader.codes/api/${userName}/newEvent`,
        {
            method: 'POST',
            headers: {
                authorization: jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: "start task", start: startTime, end: endTime, categoryName: "hub", taskId: task._id })
        }).then((result) => {
            return result.json();
        }).then((result) => {
            console.log(result);
        })
    //create event on task's endDate

    fetch(`https://calendar.dev.leader.codes/api/${userName}/newEvent`,
        {
            method: 'POST',
            headers: {
                authorization: jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: "end task", start: startTimeEnd, end: endTimeEnd, categoryName: "hub" })
        }).then((result) => {
            return result.json();
        }).then((result) => {
            console.log(result);
        })
}

export const editTask = ({ dispatch, getState }) => next => action => {

    if (action.type === 'EDIT_TASK') {
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/editTask`
        let task = action.payload;
        let taskId = task._id

        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ task }),
            success: function (data) {
                console.log("success")
                console.log(data.result);
                dispatch(actions.setTaskName(data.result))
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

export const removeTaskById = ({ dispatch, getState }) => next => action => {

    if (action.type === 'REMOVE_TASK_BY_ID') {
        // let workspace = getState().workspace_reducer.workspace;
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/${action.payload}/removeTaskById`
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                dispatch(actions.deletTask(data.result))
                console.log("success")
                console.log("data", data.result);
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