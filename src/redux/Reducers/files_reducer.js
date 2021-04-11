import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    files: []

}

const files = {
    // setProjectName(state, action) {
    //     state.project.name = action.payload;
    // },
    addFile(state, action) {
        state.files = []
        state.files.push(action.payload);
        console.log(state.files)
    },

    // setProjectId(state, action) {
    //     state.project.id = action.payload;
    // }

}


export default produce((state, action) => createReducer(state, action, files), initialState);
