import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {

    project: {
        name: "name project",
        subject: "tttttt",
        project: "bbbbbb",
        dueDate: "12/10/20",
        updateDates: ["12/10/20", "14/10/20"],
        endDate: "10/12/21",
        color: '#1AFFFC',
        cards: ['jj', 'gttt', 'ttt']
    },

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
    },



}


export default produce((state, action) => createReducer(state, action, project), initialState);
