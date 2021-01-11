
import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    task: {
        name: "david",
        //  uaserId:"",
        //  projects:[],
        //  team:""

    }



}

const tasks = {
    setTaskName(state, action) {
        // state.workpace[action.payload] = action.value;
        state.task.name = action.payload;
        // dispatch({ type: "GET_ALL" })
    },




}


export default produce((state, action) => createReducer(state, action, tasks), initialState);
