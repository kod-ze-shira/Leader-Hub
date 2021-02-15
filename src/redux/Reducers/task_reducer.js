
import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    task: {}



}

const tasks = {
    setTaskName(state, action) {
        // state.workpace[action.payload] = action.value;
        state.task.name = action.payload
        
        // dispatch({ type: "GET_ALL" })
    },
    setTask(state,action){
        state.task = action.payload;
    },
    setisConfiguratorOpenTask(state, action) {
        state.task.isConfiguratorOpenTask = !state.task.isConfiguratorOpenTask
    },




}


export default produce((state, action) => createReducer(state, action, tasks), initialState);
