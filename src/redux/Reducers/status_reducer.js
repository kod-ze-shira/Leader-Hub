
import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    statuses: {
    }
}

const statuses = {

    setStatuses(state, action) {
        debugger
        state.statuses = action.payload
    },

    // setTask(state, action) {
    //     state.task = action.payload;
    // },

    // setisConfiguratorOpenTask(state, action) {
    //     state.task.isConfiguratorOpenTask = !state.task.isConfiguratorOpenTask
    // },
}

export default produce((state, action) => createReducer(state, action, statuses), initialState);
