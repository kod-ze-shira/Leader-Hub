// getFromServerP: () => dispatch(actions.getFromServerP()),

// import { actions } from "../actions/user.action";
// import axios from 'axios'

// export const getUser = ({ dispatch, getState }) => next => action => {
//     const url = "https://lobby.dev.leader.codes/api";
//     let jwtFromCookie=getState().user.tokenFromCookies;
//     console.log(jwtFromCookie);
//     if (action.type === 'GET_USER_FROM_SERVER') {
//         fetch(`https://lobby.dev.leader.codes/api/${action.payload}/getUserByUserName`,
//             {
//                 method: 'GET',
//                 headers:{'authorization':jwtFromCookie}
//                 // headers:{'authorization':jwtFromCookie}
//                 // ,body:JSON.stringify(userName)
//             })
//             .then((res) => {
//                 console.log("res11111", res)
//                 return res.json();
//             })
//             .then((result) => {
//                 console.log("res", result)
//                 checkPermission(result).then((ifOk)=>{
//                     dispatch(actions.setUser(result))

//                 })

//                 // dispatch({type: '[user] SET_USER', payload:result})
//             })


//     }
//     if (action.type === 'SAVE_USER_IN_SERVER') {

//         fetch(url +action.payload.username+ '/patch_update_user/', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(action.payload)
//         }).then((response) => {
//             //  debugger;
//             return response.json();
//         })
//             .then((message) => {
//                 console.log("message", message);
//                 if (message.error) {
//                     console.log(message.error.errors)
//                     dispatch(actions.addError(message.error.errors))
//                 }
//                 else
//                     alert("your profile is updated")

//             })

//     }
//     //setFacebookContacts
//     if (action.type === 'SAVE_FACEBOOK_CONTACTS') {

//     axios.post('https://lobby.dev.leader.codes/api/contactFacebookForm/add', action.payload)
//         .then(res => console.log(res.data))
//         .then(() => {
//             // dispatch(actions.setFacebookContacts(result.form));
//             dispatch(actions.setDone(true))

//         })
//         .catch((err) => console.log(err))

// }
// //saveGoogleToken
// if(action.type==='SAVE_GOOGLE_TOKEN'){
//     fetch(`https://lobby.dev.leader.codes/api/${action.payload}/saveGmailToken`,
//     {
//         method: 'POST',
//         headers:{
//             'authorization':getState().user.tokenFromCookies
//         }
//     })
//     .then(response => response.json())
//        .then(response => {
//          console.log(response.massage)
//           let win=window.open(response.massage,'urlaccaunt','width = 500, height =600,left = 375,top = 500')
//           setInterval(function () {
//             if (win.location.hostname === window.location.hostname) {
//               win.close()
//               return false
//             }
//           }, 60)
//                })
// }

// return next(action);
// }
// function checkPermission(result) {
// return new Promise((resolve, reject) => {
//     if(result.status=="401")
//     {
//         result.routes?
//          window.location.assign(`https://dev.leader.codes/login?des=${result.des}'&routes='${result.routes}`):
//         window.location.assign(`https://dev.leader.codes/login?des=${result.des}`)
//         reject(false)

//     }
//     resolve(true)

// })
//   }