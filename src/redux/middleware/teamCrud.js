import $ from 'jquery'
import { actions } from '../actions/action'
import configData from '../../ProtectedRoute/configData.json'
import keys from '../../config/env/keys'

export const getAllTeamsForUser = ({ dispatch, getState }) => next => action => {

  if (action.type === 'GET_ALL_TEAMS_FOR_USER') {
    let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/getAllTeamsForUser`
    fetch(urlData,
      {
        method: 'GET',
        headers: { 'authorization': getState().public_reducer.tokenFromCookies }
      })
      .then((res) => {
        // console.log("res11111", res)
        return res.json();
      })
      .then((result) => {
        // console.log("res", result)
        checkPermission(result).then((ifOk) => {
          dispatch(actions.setTeams(result.teams))

        })
      })


  }
  return next(action);
}

export const createNewTeam = ({ dispatch, getState }) => next => action => {

  if (action.type === 'CREATE_NEW_TEAM') {
    console.log('CREATE_NEW_TEAM')
    let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/addNewTeam`
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
        // dispatch({ type: '', payload: data })
      },
      error: function (err) {

        checkPermission(err).then((ifOk) => {
        })
      }
    });

  }
  return next(action);
}
export const getContactsForUser = ({ dispatch, getState }) => next => action => {
  if (action.type === 'GET_CONTACTS_FOR_USER') {

    fetch(
      `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/getContactsForUser`,

      {
        method: 'GET',
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ6bUJBR2w0WFJrYXFpb1MzYUUyN1E3RTYxRG0xIiwiZW1haWwiOiJyZW5hbmFAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjIzMzEyODYwfQ.PaZaGd7eZ0K8t4dBWVwQ55uUNsLAZ73OYChnJ7ronko',

          //  getState().public_reducer.tokenFromCookies,
          // Accept: 'application/json',
          // 'Content-Type': 'application/json'
        },

      }
    )
      .then(res => {
        return res.json()
      })
      .then(result => {
        // console.log('contacts', result)
        // checkPermission(result).then(ifOk => {
        dispatch(actions.setContactsUser(result))
        // })
      })
  }

  return next(action)
}

export const shareObject = ({ dispatch, getState }) => next => action => {
  if (action.type === 'SHARE_OBJECT') {
    let teamsMembersAndPermission = action.payload.teams
    let membersEmails = action.payload.shareDetails
    let objectId = getState().public_reducer.workspaces[getState().public_reducer.indexOfWorkspace]
      .projects[getState().public_reducer.indexCurrentProject]._id
    console.log(objectId);
    ///:userName/:objectId/:schemaName/:applicationName/shareObject
    fetch(`${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/${objectId}/Project/hub/shareMembersAndTeams`,
      {
        method: 'POST',
        headers: {
          authorization: getState().public_reducer.tokenFromCookies,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ teamsMembersAndPermission, membersEmails })
      }).then((result) => {
        console.log('resultShareObject', result);
        return result.json();
      }).then((result) => {
        checkPermission(result).then((ifOk) => {
          let project = getState().public_reducer.workspaces[getState().public_reducer.indexOfWorkspace].projects[getState().public_reducer.indexCurrentProject];
          dispatch(actions.createSystemWave({
            "subject": "Share project",
            "body":
              `<p>Hi ${getState().public_reducer.userName}</p>
            <p>You have successfully shared the project 
            <span  style='background-color: ${project.color} !important;
            height: 7px;
            width: 7px;
            background-color: #bbb;
            border-radius: 50%;
            display: inline-block;
            margin-right: 2px;
            margin-left: 4px;'></span>
            <span style='color:${project.color} !important'> ${project.name}</span></p> 
            <a href='https://${keys.DOMAIN}/${getState().public_reducer.userName}/hub' >Go to Hub</a>`,
            "to": [getState().public_reducer.userName],
            "from": "hub@noreply.leader.codes",
            "source": "Hub",
            "files": null


          }))
          console.log(result);
          dispatch(actions.addMember(result.updatedObject.members))
        })
      })
    // dispatch(actions.addWorkspaceToWorkspaces(result.workspace))
    // })
  }
  return next(action);
}
// {{urlHub}}/api/ranana-il/{{taskId}}/assingTo
// export const assingTo = ({ dispatch, getState }) => next => action => {

//   if (action.type === 'ASSING_TO') {
//     let email = action.payload
//     let taskId = getState().public_reducer.cards[getState().public_reducer.indexCurrentCard]
//     .tasks[getState().public_reducer.indexCurrentTask]._id
//     fetch(`${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/${taskId}/assingTo`,
//       {
//         method: 'POST',
//         headers: {
//           authorization: getState().public_reducer.tokenFromCookies,
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email })
//       }).then((result) => {
//         return result.json();
//       }).then((result) => {
//         checkPermission(result).then((ifOk) => {
//           // dispatch(actions.addWorkspaceToWorkspaces(result.workspace))

//         })

//       })

//   }
//   return next(action);
// }
export const assingTo = ({ dispatch, getState }) => next => action => {

  if (action.type === 'ASSING_TO') {
    let taskId = getState().public_reducer.cards[getState().public_reducer.indexCurrentCard]
      .tasks[getState().public_reducer.indexCurrentTask]._id
    let email = action.payload;
    console.log(taskId);
    let urlData = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/${taskId}/assingTo`
    $.ajax({
      url: urlData,
      type: 'POST',
      headers: {
        Authorization: getState().public_reducer.tokenFromCookies
      },
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({ email }),

      success: function (data) {
        console.log("success")
        console.log("data", data);
        let editTaskInRedux = { "nameFiled": "assingTo", "value": data.task.assingTo }
        dispatch(actions.setTaskByFiledFromTasks(editTaskInRedux))
        dispatch(actions.addContactToContactList(data.task.assingTo.contact))


      },

      error: function (err) {
        checkPermission(err).then((ifOk) => {
        })
      }
    });

  }
  return next(action);
}
export const assingToMany = ({ dispatch, getState }) => next => action => {
  if (action.type === 'ASSING_TO_MANY') {
    let taskId = getState().public_reducer.cards[getState().public_reducer.indexCurrentCard]
      .tasks[getState().public_reducer.indexCurrentTask]._id
    let assign = action.payload
    let editTaskInRedux
    console.log(taskId);
    let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/${taskId}/assingToMany`
    $.ajax({
      url: urlData,
      type: 'POST',
      headers: {
        Authorization: getState().public_reducer.tokenFromCookies
      },
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({ assign }),

      success: function (data) {

        console.log("success")
        console.log("data", data);
        // if (data.task.assignTo.contact)
        editTaskInRedux = {
          "nameFiled": "assignTo", "value": data.task.assignTo
        }
        dispatch(actions.setTaskByFiledFromTasks(editTaskInRedux))
        dispatch(actions.addContactToContactList(data.task.assignTo[data.task.assignTo.length - 1].contact))
      },
      error: function (err) {
        checkPermission(err).then((ifOk) => {
        })
      }
    });

  }
  return next(action);
}


export const getMembersByProjectId = ({ dispatch, getState }) => next => action => {
  if (action.type === 'GET_MEMBERS_BY_PROJECT_ID') {
    let reducer = getState().public_reducer
    let jwtFromCookie = reducer.tokenFromCookies;

    let urlData = `${keys.API_URL_BASE_SERVER}/${reducer.userName}/Project/${reducer.workspaces[reducer.indexOfWorkspace].projects[reducer.indexCurrentProject]._id}/getAllMembersForObject`
    fetch(urlData,
      {
        method: "GET",
        headers: {
          Authorization: jwtFromCookie,
        },
      }
    ).then(response => {
      return response.json()
    })
      .then(data => {
        checkPermission(data).then((ifOk) => {
          dispatch(actions.setMembers(data.membersList))

        })
      }).catch(err => console.log('err', err))
  }
  return next(action);
}


export const addMembers = ({ dispatch, getState }) => next => action => {

  if (action.type === 'ADD_MEMBERS') {

    let reducer = getState().public_reducer
    let jwtFromCookie = reducer.tokenFromCookies;
    let urlData = `${keys.API_URL_BASE_SERVER}/${reducer.userName}/${reducer.workspaces[reducer.indexOfWorkspace].projects[reducer.indexCurrentProject]._id}/addMemberToTeam`
    fetch(urlData,
      {
        method: "POST",
        headers: {
          Authorization: jwtFromCookie,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
      }
    ).then(response => {
      return response.json()
    })
      .then(data => {
        checkPermission(data).then(() => {
          console.log(data);
          dispatch(actions.setMembers(data))
        })
      }).catch(err => console.log('err', err))
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
