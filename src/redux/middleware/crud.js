import $ from 'jquery'
import { actions } from '../actions/action'

export const getAllWorkspacesFromServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_ALL_WORKSPACES_FROM_SERVER') {
        let urlData = "https://reacthub.dev.leader.codes/api/" + getState().public_reducer.userName + "/getAllWorkspacesForUser"
        // let workspace = getState().workspace_reducer.workspace;
        fetch(urlData,
            {
                method: 'GET',
                headers: { 'authorization': getState().public_reducer.tokenFromCookies }
                // headers:{'authorization':jwtFromCookie}
                // ,body:JSON.stringify(userName)
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

                // dispatch({type: '[user] SET_USER', payload:result})
            })
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
export const editWorkspaceFromServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'EDIT_WORKSPACE_FROM_SERVER') {
      

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
                console.log("data",data);
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

export const editTaskFromServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'EDIT_TASK_FROM_SERVER') {

        var task = getState().task_reducer.task;
        let urlData = "https://reacthub.dev.leader.codes/api/renana-il/editTask "
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ t }),
            // dataType: 'json',
            success: function (data) {
                console.log("success")
                console.log("data",data);

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






