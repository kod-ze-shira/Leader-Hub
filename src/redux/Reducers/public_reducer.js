import produce from 'immer';
import { act } from 'react-dom/test-utils';
import createReducer from './reducerUtils';
const initialState = {
    tokenFromCookies: "",
    userName: "",
    worksapces: [],
    projects: [],
    tasks: []

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
<<<<<<< HEAD
    //     
=======
>>>>>>> ad7e9e7b36a966136653f33cb591c38e24351eed
    //     // state.workpace[action.payload] = action.value;
    //     state.workspace = action.value
    //     // dispatch({ type: "GET_ALL" })
    // },

    setTokenFromCookies(state, action) {
        state.tokenFromCookies = action.payload;
<<<<<<< HEAD

=======
>>>>>>> ad7e9e7b36a966136653f33cb591c38e24351eed
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
    // setShowModalTeam(state, action) {
    //     state.tasks = action.payload;
    // },


}


export default produce((state, action) => createReducer(state, action, publicData), initialState);