import $ from 'jquery'
import { actions } from '../actions/action'
import configData from '../../ProtectedRoute/configData.json'
import keys from '../../config/env/keys'

export const getTaskByIdFromServer = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_TASK_BY_ID_FROM_SERVER') {

        var taskId = action.payload;
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/` + taskId + "/getTaskById"
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
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/` + cardId + `/getTasksByCardId`
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
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/getAllTasksNotBelongsCardForUser`
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
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/getAllmilestonesTasksForUser`
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
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/newTask`
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
                    "body": `<p>Hi ${getState().public_reducer.userName}</p> 
                    <p> Task added to you: <span style="font-weight: 600;">${task.name}</span></p> 
                    <a href='https://reacthub.dev.leader.codes' >Go to Hub</a>`,

                    // "to": ['bp63447@gmail.com'],
                    "to": [getState().public_reducer.userName],
                    "from": "hub@noreply.leader.codes",
                    "source": "Hub",
                    "files": null
                }))

                // createNewEventWhenNewTask(data.message, getState().public_reducer.userName, getState().public_reducer.tokenFromCookies)
            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {
                })
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
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/editTask`
        let task = action.payload
        // console.log('EDIT_TASK')
        if (action.payload.type && action.payload.type == 'editTaskFromGantt') {
            task = action.payload.task
            console.log("Dxffdgggggghggg", task);
        }
        else
            if (action.payload.type && action.payload.type == 'taskNotBelong') {
                task = action.payload.task
                if (!task.description)
                    task.description = null
            }
            else
                if (!action.payload.card) {
                    for (let index = 0; index < getState().public_reducer.tasks.length; index++) {
                        if (getState().public_reducer.tasks[index]._id == action.payload._id)
                            task = getState().public_reducer.tasks[index]
                    }
                }
                else
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
                if (data.project)
                    dispatch(actions.setProjectInWorkspace(data.project))
                if (getState().public_reducer.arrFilesOfTask.length && task.card) {
                    dispatch(actions.setIdFiles(data.result.files));
                }
                if (data.result.priority && data.result.card) {
                    dispatch(actions.setTaskByFiledFromTasks({ "nameFiled": "priority", "value": data.result.priority }))
                }


            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {
                })
            }
        });
    }
    return next(action);
}

export const removeFileInTaskAndServerFiles = ({ dispatch, getState }) => next => action => {
    if (action.type === 'REMOVE_FILE_IN_TASK_AND_SERVER_FILES') {
        let task = {}
        if (action.payload.taskId == '' && getState().public_reducer.cards &&
            getState().public_reducer.cards[getState().public_reducer.indexCurrentCard].tasks
            && getState().public_reducer.cards[getState().public_reducer.indexCurrentCard].tasks[getState().public_reducer.indexCurrentTask]
        ) {
            task = getState().public_reducer.cards[getState().public_reducer.indexCurrentCard].tasks[getState().public_reducer.indexCurrentTask]

        }
        else if (getState().public_reducer.tasks) {
            task = getState().public_reducer.tasks.find((task) => task._id == action.payload.taskId)
        }


        fetch(`${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/editTask`,
            {
                method: 'POST',
                headers: {
                    authorization: getState().public_reducer.tokenFromCookies,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task })
            }).then((result) => {
                return result.json();
            }).then((result) => {

                checkPermission(result).then((ifOk) => {
                    console.log(result);
                    if (result.massege == 'task updated successfully')
                        dispatch(actions.removeFile([action.payload.url]))
                })

            })

    }
    return next(action);

    // removeFileInTaskAndServerFiles
}


export const updateLike = ({ dispatch, getState }) => next => action => {
    if (action.type === 'UPDATE_LIKE') {
        let taskId = action.payload
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/${taskId}/updateLike`
        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            // data: JSON.stringify( ),
            success: function (data) {
                dispatch(actions.setTaskByFiledFromTasks({ "nameFiled": "likes", "value": data.task.likes }))
                console.log("success")
                console.log(data.result);
            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {
                })
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
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/${taskId}/completeTask`
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
                        "body":
                            `<p>Hi ${getState().public_reducer.userName}</p>
                        <p>Task: <span style="font-weight: 600;"> ${action.payload.name} </span>successfully completed!</p>
                        <a href='https://reacthub.dev.leader.codes' >Go to Hub</a>`,
                        "to": [getState().public_reducer.userName],
                        "from": "hub@noreply.leader.codes",
                        "source": "Hub",
                        "files": null
                    }))
                }
                dispatch(actions.setProjectInWorkspace(data.project))
                console.log("success")
                // console.log(data.result);
            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {
                })
            }
        });
    }
    return next(action);
}

export const removeTaskById = ({ dispatch, getState }) => next => action => {

    if (action.type === 'REMOVE_TASK_BY_ID') {
        // let workspace = getState().workspace_reducer;
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/${action.payload}/removeTaskById`
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data.result.card) {
                    dispatch(actions.deletTask(data.result))
                    dispatch(actions.setCountTasks())
                    if (data.result.complete)
                        dispatch(actions.setCountReadyTasks(false))
                }
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
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/${action.payload[0]}/${action.payload[1]}/${action.payload[2]}/dragTaskFromCardToCard`
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
                // לא לשחרר מירוק!!
                // dispatch(actions.setCards(data.cards))

            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {
                })
            }
        });
    }
    return next(action);
}


export const dragTask = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DRAG_TASK') {
        let tasksList = getState().public_reducer.cards[action.payload].tasks ? getState().public_reducer.cards[action.payload].tasks : []
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/dragTask`
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
                // לא לשחרר מירוק!!
                // dispatch(actions.setCards(data.cards))

            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {
                })
            }
        });
    }
    return next(action);
}


export const dragCard = ({ dispatch, getState }) => next => action => {

    if (action.type === 'DRAG_CARD') {

        let cardsList = getState().public_reducer.cards
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/dragCard`

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
                // לא לשחרר מירוק!!
                // dispatch(actions.setCards(data.cards))
            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {
                })
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
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/newTask`
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
                dispatch(actions.createSystemWave({
                    "subject": "New task",
                    "body": `<p>Hi ${getState().public_reducer.userName}</p> 
                    <p> Task added to you: <span style="font-weight: 600;">${task.name}</span></p> 
                    <a href='https://reacthub.dev.leader.codes' >Go to Hub</a>`,

                    "to": [getState().public_reducer.userName],
                    "from": "hub@noreply.leader.codes",
                    "source": "Hub",
                    "files": null
                }))
            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {
                })
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
        let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/${taskId}/${cardId}/belongTask`
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
                checkPermission(err).then((ifOk) => {
                })
            }
        });

    }
    return next(action);

}

export const displayLineByStart = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DISPLAY_LINE_BY_START') {
        let username = getState().public_reducer.userName
        // let renderTimeline = getState().public_reducer.jsonline
        let workspaceId = getState().public_reducer.workspaces[getState().public_reducer.indexOfWorkspace]._id
        let projectId = getState().public_reducer.workspaces[getState().public_reducer.indexOfWorkspace].projects[getState().public_reducer.indexCurrentProject]._id
        let cardId = getState().public_reducer.cards[getState().public_reducer.indexCurrentCard]._id
        let taskId = getState().public_reducer.cards[getState().public_reducer.indexCurrentCard].tasks[getState().public_reducer.indexCurrentTask]._id
        //   let LocationWork = getState().public_reducer.CurrentAddress

        let urlDataP = keys.API_URL_TIME + "/" + username + "/newHour"
        $.ajax({
            url: urlDataP,
            type: 'POST',
            withCradentials: true,
            async: false,
            contentType: "application/json; charset=utf-8",
            // data: userIdP,
            data: JSON.stringify({
                workspaceId, projectId, cardId, taskId
            }),
            headers: {
                "Authorization": getState().public_reducer.tokenFromCookies
            },
            dataType: 'json',
            success: function (data) {
                console.log("success")
                console.log(data);
                dispatch(actions.setStartHourId(data.currentHour._id))
            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {
                    console.log(err)
                })
            }
        });
    }
    return next(action);
}
export const disaplayLineByStop = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DISAPLAY_LINE_BY_STOP') {
        let task = getState().public_reducer.cards[getState().public_reducer.indexCurrentCard].tasks[getState().public_reducer.indexCurrentTask]
        let _id = task.workingTime[task.workingTime.length - 1]
        let userName = getState().public_reducer.userName
        // let totalHour = "2020-11-02T00:00:00.000Z"
        let endWork = new Date();
        let description = "dgghje"
        let urlDataP = "https://time.leader.codes/api/" + userName + "/updateEndHour"
        $.ajax({
            url: urlDataP,
            type: 'POST',
            withCradentials: true,
            async: false,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                _id, endWork,/* totalHour,*/ description
            }),
            headers: {
                "Authorization": getState().public_reducer.tokenFromCookies
            },
            dataType: 'json',
            success: function (data) {
                console.log("success")
                console.log(data);
                dispatch({ type: 'SET_LINE_STOP', payload: data })
            },
            error: function (err) {
                checkPermission(err).then((ifOk) => {
                    console.log(err)
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
