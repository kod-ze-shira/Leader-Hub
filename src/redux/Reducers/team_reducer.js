
import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    // team: {
    //     name: "name team",
    //     items: [{ mail: 'mail members', permission: ' permission' }],
    // }
}
const team = {
    setTeam(state, action) {
        state.team = action.payload;
    },

}

export default produce((state, action) => createReducer(state, action, team), initialState);
