import produce from 'immer';
import createReducer from './reducerUtils';

const initialState = {
    overdueTasks:0,
    taskStatusesOfProject:[],  
    // members: [],

}

const overview={
    setOverdueTasks(state, action) {
        state.overdueTasks = action.payload;
    },
    setTaskStatusesOfProject(state, action) {
        state.taskStatusesOfProject = action.payload;
    },
    // setMembers(state, action) {
    //     state.members = action.payload;
    // },
    // setMember(state, action){
    //     state.members.push(action.payload);
    // }

}
export default produce((state, action) => createReducer(state, action, overview), initialState);