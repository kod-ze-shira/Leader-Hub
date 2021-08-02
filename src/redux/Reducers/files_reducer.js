import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    files: []

}

const files = {

    addFile(state, action) {
        state.files = []
        state.files.push(action.payload);
        console.log(state.files)
    },

   
}

export default produce((state, action) => createReducer(state, action, files), initialState);
