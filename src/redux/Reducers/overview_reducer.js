import produce from 'immer';
import createReducer from './reducerUtils';

const initialState = {
    overdueTasks:0,
    taskStatusesOfProject:[]
}

const overview={
    setOverdueTasks(state, action) {
        state.overdueTasks = action.payload;
    },
    setTaskStatusesOfProject(state, action) {
        state.taskStatusesOfProject = action.payload;
    }
}
export default produce((state, action) => createReducer(state, action, overview), initialState);