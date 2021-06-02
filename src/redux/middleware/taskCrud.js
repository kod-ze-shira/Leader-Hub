import $ from 'jquery'
import { actions } from '../actions/action'
import configData from '../../ProtectedRoute/configData.json'

export const getTaskByIdFromServer = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_TASK_BY_ID_FROM_SERVER') {

        var taskId = action.payload;
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/` + taskId + "/getTaskById"
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
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/` + cardId + `/getTasksByCardId`
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
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/getAllTasksNotBelongsCardForUser`
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
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/getAllmilestonesTasksForUser`
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
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/newTask`
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
                dispatch(actions.createSystemWave({
                    "subject": "New task",
                    "body": "get the body' display all details.good luck <a href='https://reacthub.dev.leader.codes'>linkkk</a> ",
                    // "to": ['bp63447@gmail.com'],
                    "to": [getState().public_reducer.userName],
                    "from": "hub@noreply.leader.codes",
                    "source": "Hub",
                    "files": null
                }))
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
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/editTask`
        let task = action.payload

        if (!action.payload.card) {
            for (let index = 0; index < getState().public_reducer.tasks.length; index++) {
                if (getState().public_reducer.tasks[index]._id == action.payload._id)
                    task = getState().public_reducer.tasks[index]
            }
        }
        else
            if (action.payload.type && action.payload.type == 'taskNotBelong') {
                task = action.payload.task
                if (!task.description)
                    task.description = null
                // if (!task.endDate)
                //     task.endDate = null
            } else
                if (action.payload.name)
                    task = getState().public_reducer.cards[getState().public_reducer.indexCurrentCard]
                        .tasks[getState().public_reducer.indexCurrentTask]
                else
                    task = action.payload


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
                if (getState().public_reducer.arrDeleteFilesOfTask.length) {
                    let urlsFile = [], arr = getState().public_reducer.arrDeleteFilesOfTask;
                    for (let index = 0; index < arr.length; index++) {
                        urlsFile.push(arr[index].url)
                    }
                    dispatch(actions.removeFile(urlsFile));
                    dispatch(actions.deleteFilesInArr());
                    // dispatch(actions.setNewFilesInTask(data.filesData))
                }
                if (getState().public_reducer.arrFilesOfTask.length && task.card) {
                    dispatch(actions.setIdFiles(data.result.files));
                }

            },
            error: function (err) {
                console.log("error")
                console.log(err)
            }
        });
    }
    return next(action);
}

export const updateLike = ({ dispatch, getState }) => next => action => {
    if (action.type === 'UPDATE_LIKE') {
        let taskId = action.payload
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/${taskId}/updateLike`
        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            // data: JSON.stringify( ),
            success: function (data) {
                debugger
                dispatch(actions.setTaskByFiledFromTasks({ "nameFiled": "likes", "value": data.task.likes }))
                console.log("success")
                console.log(data.result);
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

export const completeTask = ({ dispatch, getState }) => next => action => {
    if (action.type === 'COMPLETE_TASK') {
        let taskId = action.payload._id

        // let taskId= getState().public_reducer.cards[getState().public_reducer.indexCurrentCard]
        // .tasks[getState().public_reducer.indexCurrentTask]._id
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/${taskId}/completeTask`
        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ taskId }),
            success: function (data) {
                if (action.payload.complete) {
                    dispatch(actions.createSystemWave({
                        "subject": "Comlpite task",
                        "body": "get the body' display all details.good luck <a href='https://reacthub.dev.leader.codes'>linkkk</a> ",
                        "to": [getState().public_reducer.userName],
                        "from": "hub@noreply.leader.codes",
                        "source": "Hub",
                        "files": null
                    }))
                }
                console.log("success")
                console.log(data.result);
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
        // let workspace = getState().workspace_reducer;
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/${action.payload}/removeTaskById`
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data.result.card)
                    dispatch(actions.deletTask(data.result))
                else
                    dispatch(actions.deletTaskNotBelong(data.result))


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

export const moveTaskBetweenCards = ({ dispatch, getState }) => next => action => {

    if (action.type === 'MOVE_TASK_BETWEEN_CARDS') {

        let cardSours = getState().public_reducer.cards[action.payload[3]].tasks ? getState().public_reducer.cards[action.payload[3]].tasks : []
        let cardDest = getState().public_reducer.cards[action.payload[4]].tasks
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/${action.payload[0]}/${action.payload[1]}/${action.payload[2]}/dragTaskFromCardToCard`
        console.log("cardToTasks", cardDest)

        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ "cardToTasks": cardDest }),
            success: function (data) {
                console.log("success")
                console.log(data);

                dispatch(actions.setCards(data.cards))

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


export const dragTask = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DRAG_TASK') {
        let tasksList = getState().public_reducer.cards[action.payload].tasks ? getState().public_reducer.cards[action.payload].tasks : []
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/dragTask`
        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ tasksList }),
            success: function (data) {
                console.log("success")
                console.log(data.cards);
                dispatch(actions.setCards(data.cards))

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


export const dragCard = ({ dispatch, getState }) => next => action => {

    if (action.type === 'DRAG_CARD') {

        let cardsList = getState().public_reducer.cards
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/dragCard`
        console.log(urlData)

        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ cardsList }),
            success: function (data) {
                console.log("success")
                console.log(data);
                // dispatch(actions.setCards(data.cards))
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

export const newTaskNotBelong = ({ dispatch, getState }) => next => action => {
    if (action.type === 'NEW_TASK_NOT_BELONG') {

        let task = {
            'name': action.payload,
            "updateDates": "08/03/2021",
            'description': ' '
        }
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/newTask`
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
                dispatch(actions.addTask(data.message))
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


export const belongTask = ({ dispatch, getState }) => next => action => {
    if (action.type === 'BELONG_TASK') {
        let taskId = action.payload.taskId
        let cardId = action.payload.cardId
        let workspaceId = action.payload.workspaceId
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/${taskId}/${cardId}/belongTask`
        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log("success")

                dispatch(actions.getAllStatusesTaskForWorkspace({ 'workspaceId': workspaceId, 'task': data.task }))
                dispatch(actions.removeTask(taskId))
            },
            error: function (err) {
                //בדיקה אם חוזר 401 זאת אומרת שצריך לזרוק אותו ללוגין
                console.log("error")
                // console.log(err)
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
                window.location.assign(`https://accounts.codes/hub/login?routes=${result.routes}`) :
                window.location.assign(`https://accounts.codes/hub/login`)

            reject(false)

        }
        resolve(true)

    })
}
