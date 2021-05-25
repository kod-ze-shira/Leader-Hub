import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    topContactList: '',
    leftContactList: '',
    widthCurrentScreen: '',
    heightCurrentScreen: '',
    widthContactsList: 300,
    heightContactsList: 380

}
const design = {

    saveTopContactListInRedux(state, action) {
        state.topContactList = action.payload
    },
    saveLeftContactListInRedux(state, action) {
        state.leftContactList = action.payload
    },
    saveWidthScreenInRedux(state, action) {
        state.widthCurrentScreen = action.payload
    },
    saveHeightScreenInRedux(state, action) {
        state.heightCurrentScreen = action.payload
    }
}

export default produce((state, action) => createReducer(state, action, design), initialState);
