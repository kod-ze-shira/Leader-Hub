
import $ from 'jquery'
import { actions } from '../actions/action'

export const createSystemWave = ({ dispatch, getState }) => next => action => {
    // let url='https://api.dev.leader.codes/michalgiladi/createSystemWave'
    if (action.type === 'CREATE_SYSTEM_WAVE') {
        // let massege = {
        //     "subject": "to try",
        //     "body": "get the body' display all details.good luck <a href='https://leader.codes/login#'>linkkk</a> ",
        //     "to": "learn@leader.codes",
        //     "from": "hub@noreply.leader.codes",
        //     "source": "Hub",
        //     "files": null
        // }
        let massege = action.payload;
        fetch(`https://api.dev.leader.codes/${getState().public_reducer.userName}/createSystemWave`,
            {
                method: 'POST',
                headers: {
                    authorization: getState().public_reducer.tokenFromCookies,
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