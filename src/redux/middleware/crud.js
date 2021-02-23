import $ from 'jquery'
import { actions } from '../actions/action'
import workspace_reducer from '../Reducers/workspace_reducer'

export const getAllWorkspacesFromServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_ALL_WORKSPACES_FROM_SERVER') {
        let urlData = "https://reacthub.dev.leader.codes/api/" + getState().public_reducer.userName + "/getAllWorkspacesForUser"
        // let urlData = "https://reacthub.dev.leader.codes/api/renana-il/getAllWorkspacesForUser"
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

export const getAllTeamsForUser = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_ALL_TEAMS_FOR_USER') {
        // let urlData = "https://reacthub.dev.leader.codes/api/" + getState().public_reducer.userName + "/getAllTeamsForUser"
        let urlData = "https://reacthub.dev.leader.codes/api/renana-il/getAllTeamsForUser"
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
                // checkPermission(result).then((ifOk) => {
                //     dispatch(actions.setWorkspaces(result.workspaces))

                // })
            })
        return next(action);

    }
}

export const createNewTeam = ({ dispatch, getState }) => next => action => {

    if (action.type === 'CREATE_NEW_TEAM') {
        console.log('CREATE_NEW_TEAM')
        let urlData = "https://reacthub.dev.leader.codes/api/" + getState().public_reducer.userName + "/addNewTeam"
        // let team = getState().team_reducer.team;
        let team = action.payload;
        // team 
        // props.createNewTeam({ teamName: team.teamName, emailAndPermissionsArr: [...team.emailAndPermissionsArr] })
        // 
        // emailAndPermissionsArr: Array(2)
        // 0: {email: "4rtg@ftt.bb", permission: "viewer"}
        // 1: {email: "ghh@nnn.nnn", permission: "editor"}
        // length: 2
        // __proto__: Array(0)
        // name: "erfgth"
        // __proto__: Object

        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            // contentType: "application/json; charset=utf-8",
            data: JSON.stringify(team),
            success: function (data) {
                console.log("success")
                console.log(data);

                // dispatch(actions.setTteam.message));
                // createNewEventWhenNewTask(data.message, getState().public_reducer.userName, getState().public_reducer.tokenFromCookies)
                // dispatch({ type: '', payload: data })
            },
            error: function (err) {
                //בדיקה אם חוזר 401 זאת אומרת שצריך לזרוק אותו ללוגין
                console.log("error")
                console.log(err)

                // checkPermission(err).then((ifOk) => {

                // })
            }
        });

    }
    return next(action);
}



export const setWorkspaCrud = ({ dispatch, getState }) => next => action => {
    if (action.type === 'SET_WORKSPACE_CRUD') {

        let urlData = "https://reacthub.dev.leader.codes/api/" + getState().public_reducer.userName + "/newWorkspace"
        let workspace = getState().workspace_reducer.workspace;
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                workspace
            }),
            // dataType: 'json',
            success: function (data) {
                console.log("success")
                console.log(data);
                // dispatch({ type: '', payload: data })
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
export const setTaskCrud = ({ dispatch, getState }) => next => action => {

    if (action.type === 'SET_TASK_CRUD') {


        let urlData = "https://reacthub.dev.leader.codes/api/" + getState().public_reducer.userName + "/newTask "
        let task = action.payload;
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                task,
            }),
            success: function (data) {
                console.log("success")
                console.log("data", data);
                dispatch(actions.removeOneWorkspaceFromWorkspaces(data.result))
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
export const setProjectCrud = ({ dispatch, getState }) => next => action => {

    if (action.type === 'SET_PROJECT_CRUD') {

        let urlData = "https://reacthub.dev.leader.codes/api/" + getState().public_reducer.userName + "/newProject "
        let name = action.payload;
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                name,
            }),
            dataType: 'json',
            success: function (data) {
                console.log("success")
                console.log(data);
                // dispatch({ type: '', payload: data })
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

//edit workspace
export const editWorkspaceInServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'EDIT_WORKSPACE_IN_SERVER') {


        let workspace = getState().workspace_reducer.workspace;
        // var w = getState().workspace_reducer.workspace;
        let urlData = "https://reacthub.dev.leader.codes/api/renana-il/editWorkspace"
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ workspace }),
            // dataType: 'json',
            success: function (data) {

                console.log("success")
                console.log(data);


            },
            error: function (err) {

                checkPermission(err).then((ifOk) => {

                })

            }
        });
        // })
    }
    return next(action);
}


export const deleteProjectInServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'DELETE_PROJECT_IN_SERVER') {


        let project = getState().project_reducer.project;
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/${project._id}/removeProjectById`
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ project }),
            success: function (data) {
                console.log("success")
                console.log("data", data);
                // dispatch(actions.setProject(data.result))
                dispatch(actions.deleteProjectFromWorkspace(data.project))
                // dispatch(actions.setProjects(result.projectList))

            },
            error: function (err) {

                checkPermission(err).then((ifOk) => {

                })
            }
        });

    }
    return next(action);
}
//delet workspace
export const deleteWorkspaceInServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'DELETE_WORKSPACE_IN_SERVER') {
        let workspace = getState().workspace_reducer.workspace;
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
            },
            error: function (err) {

                checkPermission(err).then((ifOk) => {

                })
            }
        });

    }
    return next(action);
}


//edit project
export const editProjectInServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'EDIT_PROJECT_IN_SERVER') {


        let project = getState().project_reducer.project;
        let urlData = "https://reacthub.dev.leader.codes/api/renana-il/editProject"
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ project }),
            success: function (data) {
                console.log("success")
                console.log("data", data);
                dispatch(actions.setProject(data.result))

            },
            error: function (err) {

                checkPermission(err).then((ifOk) => {

                })
            }
        });

    }
    return next(action);
}

export const editTaskInServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'EDIT_TASK_IN_SERVER') {

        var task = getState().task_reducer.task;
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/editTask`
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ task }),
            // dataType: 'json',
            success: function (data) {
                console.log("success")
                console.log("data", data);

            },
            error: function (err) {

                checkPermission(err).then((ifOk) => {

                })
            }
        });
        // })


    }
    return next(action);
}
//
export const getTaskByIdFromServer = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_TASK_BY_ID_FROM_SERVER') {

        var taskId = action.payload;
        let urlData = "https://reacthub.dev.leader.codes/api/renana-il/" + taskId + "/getTaskById"
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

// router.get('/:userName/:projectId/getCardsByprojectId',cardFunctions.getCardsByprojectId)
// /:projectId/getCardsByprojectId


//
export const getCardsByProjectId = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_CARDS_BY_PROJECT_ID') {
        var projectId = action.payload;
        let urlData = "https://reacthub.dev.leader.codes/api/renana-il/" + projectId + "/getCardsByProjectId"
        $.ajax({
            url: urlData,
            type: 'GET',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",

            success: function (data) {
                dispatch(actions.setCards(data.cards))
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

// url:
// https://reacthub.dev.leader.codes/api/renana-il/{{cardId}}/getTasksByCardId

// *cardId
// 6006061269370dacf7af0609
export const getTasksByCardId = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_TASKS_BY_CARD_ID') {

        var cardId = action.payload;
        let urlData = "https://reacthub.dev.leader.codes/api/renana-il/" + cardId + "/getTasksByCardId"
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

export const getProjectByIdInServer = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_PROJECT_BY_ID_IN_SERVER') {


        var projectId = action.payload;

        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/${projectId}/getProjectById`

        $.ajax({
            url: urlData,
            type: 'GET',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",

            success: function (data) {
                dispatch(actions.setProject(data))

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





//
export const getProjectsByWorkspaceId = ({ dispatch, getState }) => next => action => {

    if (action.type === "GET_PROJECTS_BY_WORKSPACE") {
        let url = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/${action.payload}/getProjectsByWorkspaceId`;
        fetch(url,
            {
                method: 'GET',
                headers: { authorization: getState().public_reducer.tokenFromCookies }
            })
            .then((result) => {
                return result.json()
            })
            .then((result) => {
                console.log(result)
                checkPermission(result).then((ifOk) => {
                    dispatch(actions.setProjects(result.projectList))
                    //
                })
            })
    }
    return next(action)
}
// export const getTasksByProject = ({ dispatch, getState }) => next => action => {
//     if (action.type === "GET_TASKS_BY_PROJECT") {
//         let url = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/${action.payload}/getTasksByProjectId`
//         fetch(url,
//             {
//                 headers: { authorization: getState().public_reducer.tokenFromCookies }
//             }).then(result => {
//                 return result.json()
//             }).then(result => {
//                 checkPermission(result).then((ifOk) => {
//                     console.log(result)
//                     dispatch(actions.setTasks(result))
//                 })
//             })
//     }
//     return next(action)
// }
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

// router.post('/:userName/newCard', cardFunctions.newCard)

// export const newCard = ({ dispatch, getState }) => next => action => {

//     if (action.type === 'NEW_CARD') {
//     }
// }



export const NewCard = ({ dispatch, getState }) => next => action => {

    if (action.type === 'NEW_CARD') {
        let urlData = "https://reacthub.dev.leader.codes/api/" + getState().public_reducer.userName + "/newCard"
        let card = action.payload;

        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ card }),
            success: function (data) {
                console.log("success")
                console.log(data);
                dispatch(actions.addCardToCardsWhenAddCardToServer(data.card));
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
export const NewTask = ({ dispatch, getState }) => next => action => {

    if (action.type === 'NEW_TASK') {
        let urlData = "https://reacthub.dev.leader.codes/api/" + getState().public_reducer.userName + "/newTask"
        let task = action.payload;

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
