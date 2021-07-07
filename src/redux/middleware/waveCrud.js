
import $ from 'jquery'
import { actions } from '../actions/action'
import keys from '../../config/env/keys'

export const createSystemWave = ({ dispatch, getState }) => next => action => {
    if (action.type === 'CREATE_SYSTEM_WAVE') {
        let massege = action.payload;
        fetch(`${keys.API_URL_MASTER}/createSystemWave`,
            {
                method: 'POST',
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(massege)
            }).then((result) => {

                return result.json();
            }).then((result) => {

                console.log(result);
            })
    }
    return next(action);

}

//this func to check the headers jwt and username, if them not good its throw to login
function checkPermission(result) {
    return new Promise((resolve, reject) => {
        if (result.status == "401") {
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
