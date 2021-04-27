
import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    statuses: {
    },
    indexOfStatus: 0

}

const statuses = {
    setStatuses(state, action) {
        state.statuses = action.payload
        console.log(state.statuses)
    },
    removeNotActiveStatus(state, action) {
        state.statuses = state.statuses.filter((_, i) =>
            state.statuses[i]._id !== action.payload._id
        )
    },
    addNewStatus(state, action) {
        debugger
        state.statuses.push(action.payload)
        console.log(state.statuses)
    },
    setStatusByFiledFromStatuses(state, action) {
        let a = state.statuses
        console.log(a);
        state.statuses[state.indexOfStatus][action.payload.nameFiled] = action.payload.value

    },
    saveIndexOfStatusInRedux(state, action) {

        state.indexOfStatus = action.payload
    }
}

export default produce((state, action) => createReducer(state, action, statuses), initialState);
