import configData from '../../ProtectedRoute/configData.json'

export const setIfShowShareProjectsToTrue = ({ dispatch, getState }) => next => action => {
    if (action.type === 'SET_IF_SHOW_SHARE_PROJECTS_TO_TRUE') {
        let shareProjectsId = getState().public_reducer.sharedProjects.map(shareProject => shareProject._id);
 
        // let url = `${configData.SERVER_URL}/${getState().public_reducer.userName}/setIfShowShareObjectsToTrue`
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         authorization: getState().public_reducer.tokenFromCookies,
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body:JSON.stringify(getState.public_reducer.sharedProjects)
        // })
    }
    return next(action)
}