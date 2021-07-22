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
    addContactToContactList(state, action) {
        let isContact = false
        state.contactsUser.map(contact => {
                if (contact._id == action.payload._id)
                    isContact = true
        })
        if (isContact == false)
            state.contactsUser.push(action.payload)
    },
    // removeMemberFromAssignToTask(state, action) {
    //     state.contactsUser = state.contactsUser.filter((contact) => contact._id !== action.payload)

    // }
    
}

export default produce((state, action) => createReducer(state, action, share), initialState);
