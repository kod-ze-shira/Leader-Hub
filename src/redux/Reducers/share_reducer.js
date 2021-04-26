import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    teamsUser: [],
    contactsUser: []
}
const share = {
    setTeams(state, action) {
        state.teamsUser = action.payload;
    },
    setContactsUser(state, action) {//for array contacts to select team new members
        state.contactsUser = action.payload
    },

}

export default produce((state, action) => createReducer(state, action, share), initialState); 
