import configData from '../../ProtectedRoute/configData.json'
import keys from '../../config/env/keys'

export const setIfShowShareProjectsToTrue = ({ dispatch, getState }) => next => action => {
    if (action.type === 'SET_IF_SHOW_SHARE_PROJECTS_TO_TRUE') {
        let url = `${keys.API_URL_BASE_SERVER}/${getState().public_reducer.userName}/setIfShowShareProjectsToTrue`
        fetch(url, {
            method: 'POST',
            headers: {
                authorization: getState().public_reducer.tokenFromCookies,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(getState.public_reducer.sharedProjects)
        })
    }
    return next(action)
}