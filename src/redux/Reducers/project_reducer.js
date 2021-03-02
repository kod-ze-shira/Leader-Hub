import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    project: {}

}

const project = {
    setProjectName(state, action) {
        state.project.name = action.payload;
    },
    setProject(state, action) {
        state.project = action.payload;
    },
    setProjectId(state, action) {
        state.project.id = action.payload;
    }
    // addCardInProject(state, action) {
    //     state.project.cards.push(action.payload);
    // }
}


export default produce((state, action) => createReducer(state, action, project), initialState);
