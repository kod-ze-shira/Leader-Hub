import $ from 'jquery'
import { actions } from '../actions/action'

export const getAllTeamsForUser = ({ dispatch, getState }) => next => action => {

  if (action.type === 'GET_ALL_TEAMS_FOR_USER') {
    let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/getAllTeamsForUser`
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
          dispatch(actions.setTeams(result.teams))

        })
      })


  }
  return next(action);
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
export const getContactsForUser = ({ dispatch, getState }) => next => action => {
  if (action.type === 'GET_CONTACTS_FOR_USER') {
    fetch(
      `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/getContactsForUser`,
      // `https://api.dev.leader.codes/${getState().public_reducer.userName}/getContacts/?includesConversations=false`,
      
      {
        method: 'GET',
        headers: {
          Authorization: getState().public_reducer.tokenFromCookies,
          // Accept: 'application/json',
          // 'Content-Type': 'application/json'
      },

       }
    )
      .then(res => {
        return res.json()
      })
      .then(result => {
        console.log('contacts', result)
        // checkPermission(result).then(ifOk => {
          dispatch(actions.setContactsUser(result))
        // })
      })
  }

  return next(action)
}

export const shareObject = ({ dispatch, getState }) => next => action => {

  if (action.type === 'SHARE_OBJECT') {
  let teamsMemberAndPermission=action.payload.teams
  let membersEmail=action.payload.shareDetails
  let objectId=getState().public_reducer.workspaces[getState().public_reducer.indexOfWorkspace]
  .projects[getState().public_reducer.indexCurrentProject]._id
  console.log(objectId);
  ///:userName/:objectId/:schemaName/:applicationName/shareObject
  fetch(`https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/${objectId}/Project1/reacthub/shareMembersAndTeams`,
            {
                method: 'POST',
                headers: {
                    authorization: getState().public_reducer.tokenFromCookies,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({teamsMemberAndPermission,membersEmail})
            }).then((result) => {
                return result.json();
            }).then((result) => {
                checkPermission(result).then((ifOk) => {
                    // dispatch(actions.addWorkspaceToWorkspaces(result.workspace))

                })

            })

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