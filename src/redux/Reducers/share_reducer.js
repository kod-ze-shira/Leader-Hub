import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    teamsUser: [],
    contactsUser: [],
    indexContact:'0'
}
const share = {
    setTeams(state, action) {
        state.teamsUser = action.payload;
    },
    setContactsUser(state, action) {//for array contacts to select team new members
        state.contactsUser = action.payload
    },
    setIndexContact(state, action) {
        state.indexContact = action.payload
    }

}

export default produce((state, action) => createReducer(state, action, share), initialState); 
