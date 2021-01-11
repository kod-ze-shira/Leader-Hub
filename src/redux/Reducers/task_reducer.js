
import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    task: {
        name: "david",
        isConfiguratorOpenTask: "false",
        //  uaserId:"",
        //  projects:[],
        //  team:""

    }



}

const tasks = {
    setTaskName(state, action) {
        // state.workpace[action.payload] = action.value;
        state.task.name = action.payload
        
        // dispatch({ type: "GET_ALL" })
    },
    setisConfiguratorOpenTask(state, action) {
        debugger;
        state.task.isConfiguratorOpenTask = !state.task.isConfiguratorOpenTask
    },




}


export default produce((state, action) => createReducer(state, action, tasks), initialState);
