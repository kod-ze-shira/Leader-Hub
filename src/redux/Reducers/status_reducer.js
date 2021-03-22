
import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    statuses: {
    }
}

const statuses = {
    setStatuses(state, action) {
        state.statuses = action.payload
    },

}

export default produce((state, action) => createReducer(state, action, statuses), initialState);