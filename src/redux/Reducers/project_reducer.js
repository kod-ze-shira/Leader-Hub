import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {

    // project: {
    //     name: "mmmmmmmmmmm",
    //     subject: "",
    //     project: "mmmmm",
    //     dueDate: "12/10/20",
    //     endDate: "10/12/21",
    // },
    project: {
        name: "project 1",
        subject: "",
        project: "mmmmm",
        dueDate: "12/10/20",
        endDate: "10/12/21",
        cards: [{ 'ddd': 'jjj' }, { 'ddd': 'jjjj' }]
    },
    project: {
        name: "project 2",
        subject: "",
        project: "mmmmm",
        dueDate: "12/10/20",
        endDate: "10/12/21",
        cards: [{ 'ddd': 'jjj' }, { 'ddd': 'jjjj' }]

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
