import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {

    project: {
      
    },

}



const project = {
    setProjectName(state, action) {
        state.project.name = action.payload;
    },
    setProject(state, action) {
        state.project = action.payload;
        console.log("redux pro " + state.project)
    },
    setProjectId(state, action) {
        state.project.id = action.payload;
    },



}


export default produce((state, action) => createReducer(state, action, project), initialState);
