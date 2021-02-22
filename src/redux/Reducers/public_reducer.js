import produce from 'immer';
import { act } from 'react-dom/test-utils';
import createReducer from './reducerUtils';
const initialState = {
    tokenFromCookies: "",
    userName: "",
    worksapces: [],
    projects: [],
    cards: [],
    tasks: [],
    isConfiguratorOpen: "false",
    close: "false"
}

const publicData = {
    setclose(state, action) {
        state.close = !state.close
    },


    setTokenFromCookies(state, action) {
        state.tokenFromCookies = action.payload;
    },
    setUserName(state, action) {
        state.userName = action.payload;
    },
    setWorkspaces(state, action) {
        state.worksapces = action.payload;
    },
    setProjects(state, action) {
        state.projects = action.payload;
        // console.log("projjjj" + action.payload)
    },
    setTasks(state, action) {
        state.tasks = action.payload;
    },
    setisConfiguratorOpen(state, action) {
        state.isConfiguratorOpen = !state.isConfiguratorOpen
    },
    setCards(state, action) {
        state.cards = action.payload;
    },
    deleteProjectFromWorkspace(state, action) {
        state.projects = state.projects.filter((_, i) =>
            state.projects[i]._id !== action.payload._id
        )
    },
    //remove one workspace when go back from server
    removeOneWorkspaceFromWorkspaces(state,action){
        state.worksapces=state.worksapces.filter((_,i)=>
        state.worksapces[i]._id!==action.payload._id
        )
    }

}


export default produce((state, action) => createReducer(state, action, publicData), initialState);