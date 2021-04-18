import $ from 'jquery'
import { actions } from '../actions/action'

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
export const getProjectsByWorkspaceId = ({ dispatch, getState }) => next => action => {

    if (action.type === "GET_PROJECTS_BY_WORKSPACE_ID") {
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
                    // dispatch(actions.addProjectToProjects(result.projectList))
                    // addProjectToProjects
                })
            })
    }
    return next(action)
}

export const newProject = ({ dispatch, getState }) => next => action => {

    if (action.type === 'NEW_PROJECT') {

        let urlData = "https://reacthub.dev.leader.codes/api/" + getState().public_reducer.userName + "/newProject"
        let project = action.payload;
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data:
                JSON.stringify({
                    "project": project,
                }),
            dataType: 'json',
            success: function (data) {
                console.log("success")
                console.log(data.message)
                let p = {
                    'project': data.message,
                    countReadyTask: 0,
                    countTasks: 0
                }
                dispatch(actions.addProjectToProjects(p))
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

export const editProjectInServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'EDIT_PROJECT_IN_SERVER') {
        // let projectBeforeChanges = getState().public_reducer.projects[0];
        let project = action.payload.project;
        let projectBeforeChanges = action.payload.projectBeforeChanges;
        let urlData = `https://reacthubproject.dev.leader.codes/api/${getState().public_reducer.userName}/editProject`
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ 'project': project }),
            success: function (data) {
                console.log("success")
                console.log("data", data.result);
                dispatch(actions.setProjectInWorkspace({ "project": data.result }))

            },
            error: function (err) {

                checkPermission(err).then((ifOk) => {
                    dispatch(actions.setProjectInWorkspace({ "project": projectBeforeChanges }))

                })
            }
        });

    }
    return next(action);
}

export const deleteProjectInServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'DELETE_PROJECT_IN_SERVER') {
        var projectId = action.payload;
        // let project = getState().project_reducer.project;
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/${projectId}/removeProjectById`
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            // data: JSON.stringify({ project }),
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

// export const duplicateProject = ({ dispatch, getState }) => next => action => {
//     if (action.type === 'DUPLICATE_PROJECT') {
//         let projectId = getState().project_reducer.project;
//         let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/:${projectId}/${project._id}/duplicateProject`

//     }
// }

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