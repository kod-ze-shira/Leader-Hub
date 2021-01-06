import $ from 'jquery'

export const setWorkspaCrud = ({ dispatch, getState }) => next => action => {

    if (action.type === 'SET_WORKSPACE_CRUD') {
        debugger

        let user_name = "renana-il"
        let urlData = "https://reacthub.dev.leader.codes/api/" + user_name + "/newWorkspace "
        let workspace = getState().workspace_reducer.workspace;
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
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
        debugger
    }
    return next(action);
}
export const setTaskCrud = ({ dispatch, getState }) => next => action => {

    if (action.type === 'SET_TASK_CRUD') {
        debugger

        let user_name = "renana-il"
        let urlData = "https://reacthub.dev.leader.codes/api/" + user_name + "/newTask "
        let name = action.payload;
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
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
        debugger
    }
    return next(action);
}
export const setProjectCrud = ({ dispatch, getState }) => next => action => {

    if (action.type === 'SET_PROJECT_CRUD') {
        debugger

        let user_name = "renana-il"
        let urlData = "https://reacthub.dev.leader.codes/api/" + user_name + "/newProject "
        let name = action.payload;
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
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
        debugger
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


export const editWorkspaceFromServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'EDIT_WORKSPACE') {
        debugger

        var w = getState().workspace;
        let urlData = "https://reacthub.dev.leader.codes/api/renana-il/editWorkspace"
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ w }),
            dataType: 'json',
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
        debugger
    }
    return next(action);
}



export const EditProjectFromServer = ({ dispatch, getState }) => next => action => {
   

    if (action.type === 'EDIT_PROJECT') {
        debugger

        var p = getState().project;
        let urlData = "https://reacthub.dev.leader.codes/api/renana-il/editProject"
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ p }),
            dataType: 'json',
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
        debugger
    }
    return next(action);
}

export const EditTaskFromServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'EDIT_TASK') {
        debugger

        var t = getState().task;
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
            dataType: 'json',
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
        debugger
    }
    return next(action);
}






