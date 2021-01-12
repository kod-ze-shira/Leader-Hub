
import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    task: {
        subject: "david",
        isConfiguratorOpenTask: "false",
        project:"5ff5b702b8c8a9b179358795",
        startDate:"01/01/2020",
        dueDate:"03/01/2020"
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
