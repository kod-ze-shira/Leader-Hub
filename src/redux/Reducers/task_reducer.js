
import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    task: {
    }
}

const task = {
    setTaskNameInTaskReducer(state, action) {
        state.task.name = action.payload
    },

    setTask(state, action) {
        state.task = action.payload;
    },


    setisConfiguratorOpenTask(state, action) {
        state.task.isConfiguratorOpenTask = !state.task.isConfiguratorOpenTask
    },
    // setTaskOnChangeFiled(state, action) {
    //     state.task[action.payload] = action.value
    // }




}


export default produce((state, action) => createReducer(state, action, task), initialState);
