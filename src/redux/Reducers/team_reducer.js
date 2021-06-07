import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    team: { }
}
const team = {
    setTeam(state, action) {
        state.team = action.payload;
    },

}

export default produce((state, action) => createReducer(state, action, team), initialState); import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    team: {
        name: "name team",
        items: [{ mail: 'mail members', permission: ' permission' }],
        // לשאול את רננה
        value: "",
        errorMail: null,
        errorName: false,
        flug: false
    }
}
const team = {
    setTeam(state, action) {
        state.team = action.payload;
    },

}

export default produce((state, action) => createReducer(state, action, team), initialState);