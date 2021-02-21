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

    setTaskStatus(state, action) {
        console.log(action.payload)
        state.tasks[action.payload].status = "Done"
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
    getCardsOfProject(state, action) {
        state.projects.find(project => {
            if (project._id == action.payload)
                state.cards = project.cards
        })
    },
    addCardToProjectInProjectList(state, action) {
        let index = 0;
        state.projects.map(project => {

            if (project._id == action.payload.project)
                project.cards.push(action.payload);
            // index++
        })
    },
    addCardToCardsWhenAddCardToSetver(state, action) {
        state.cards.push(action.payload)
    }

}


export default produce((state, action) => createReducer(state, action, publicData), initialState);