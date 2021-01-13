
import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    task: {
        subject: "ttr",
        isConfiguratorOpenTask: "false",
        project: "5ff5b702b8c8a9b179358795",
        startDate: "01/12/2021",
        dueDate: "01/14/2021"
    }
}

const tasks = {
    setTaskName(state, action) {
        // state.workpace[action.payload] = action.value;
        state.task.name = action.payload

        // dispatch({ type: "GET_ALL" })
    },
    setTask(state, action) {
        state.task = action.payload;
    },
    setisConfiguratorOpenTask(state, action) {
        state.task.isConfiguratorOpenTask = !state.task.isConfiguratorOpenTask
    },




}


export default produce((state, action) => createReducer(state, action, tasks), initialState);
