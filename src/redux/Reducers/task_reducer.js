
import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    task: {

    }
}

const tasks = {
    setTaskNameInTaskReducer(state, action) {
        state.task.name = action.payload
    },

    setTask(state, action) {
        state.task = action.payload;
    },


    setisConfiguratorOpenTask(state, action) {
        state.task.isConfiguratorOpenTask = !state.task.isConfiguratorOpenTask
    },




}


export default produce((state, action) => createReducer(state, action, tasks), initialState);
