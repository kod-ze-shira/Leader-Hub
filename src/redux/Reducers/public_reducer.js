import produce from 'immer';
import { act } from 'react-dom/test-utils';
import createReducer from './reducerUtils';
const initialState = {
    tokenFromCookies: "",
    userName: "",
    worksapces: [],
    projects: [],
    tasks: [],
    isConfiguratorOpen: "false",
}
// export default produce((state, action) => {
//     switch (action.type) {
//         case 'SET_WORKSPACE':
//             state.workpace.name = action.payload.name;
//             break;
//         // case 'SET_LAST_NAME':
//         //     state.workpace.lastName = action.payload;

//     }
// }, initialState);
const publicData = {
    // setWorkspace(state, action) {
    //     // state.workpace[action.payload] = action.value;
    //     state.workspace = action.value
    //     // dispatch({ type: "GET_ALL" })
    // },

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


}


export default produce((state, action) => createReducer(state, action, publicData), initialState);