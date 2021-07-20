import configData from '../../ProtectedRoute/configData.json'
import { actions } from '../actions/action';

export const setIfShowShareProjectsToTrue = ({ dispatch, getState }) => next => action => {
    if (action.type === 'SET_IF_SHOW_SHARE_PROJECTS_TO_TRUE') {
        // let shareProjectsId1 = getState().public_reducer.sharedProjects.map(
        //     shareProject =>{if(!shareProject.ifShow) return shareProject._id});
        //     console.log(shareProjectsId1);
        let shareProjectsId = []
        getState().public_reducer.sharedProjects.map(sharedProject => {
            if (!sharedProject.ifShow) {
                shareProjectsId.push(sharedProject._id);
            }
        });
        console.log(shareProjectsId);
        let url = `${configData.SERVER_URL}/${getState().public_reducer.userName}/setIfShowShareObjectsToTrue`
        fetch(url, {
            method: 'POST',
            headers: {
                authorization: getState().public_reducer.tokenFromCookies,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ shareProjectsId })
        }).then(response => {
           return response.json()
        }).then(result =>
            checkPermission(result).then((ifOk) => {
            dispatch(actions.setIfShowShareProjectsInReduxToTrue())
            })
        ).catch(error => {
            console.log(error);
        })
    }
    return next(action)
}


///this func to check the headers jwt and username, if them not good its throw to login
function checkPermission(result) {
    return new Promise((resolve, reject) => {
        if (result.status == "401") {
            result.responseJSON.routes ?//in ajax has responseJSON but in in fetch has routes
                window.location.assign(`https://dev.accounts.codes/hub/login?routes=hub/${result.responseJSON.routes}`) :
                result.routes ?
                    window.location.assign(`https://dev.accounts.codes/hub/login?routes=hub/${result.routes}`) :
                    window.location.assign(`https://dev.accounts.codes/hub/login`)

            reject(false)

        }
        resolve(true)

    })
}