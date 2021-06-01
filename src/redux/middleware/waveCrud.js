
import $ from 'jquery'
import { actions } from '../actions/action'

export const createSystemWave = ({ dispatch, getState }) => next => action => {
    // let url='https://api.dev.leader.codes/michalgiladi/createSystemWave'
    if (action.type === 'CREATE_SYSTEM_WAVE') {

        let massege = action.payload;
        fetch(`https://api.dev.leader.codes/createSystemWave`,
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