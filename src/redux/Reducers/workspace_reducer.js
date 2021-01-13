
import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    workspace: {
<<<<<<< HEAD
        name: {},
        // _Id: "",
        // // projects: [],
        // // team: ""
=======
        name: "rabin",
        showShare: false
        //  uaserId:"",
        //  projects:[],
        //  team:""
>>>>>>> ad7e9e7b36a966136653f33cb591c38e24351eed

    }



}
const workspace = {
    setWorkspaceName(state, action) {
        state.workspace.name = action.payload;
    },
    setState(state, action) {
        state.workspace = action.payload
    },
    // setShowShare(state, action) {
    //     state.workspace = action.payload
    // },

};

const workspaces = {
    setWorkspace(state, action) {
<<<<<<< HEAD

        // state.workpace[action.payload] = action.value;
        state.workspace = action.value
=======
        // state.workpace[action.payload] = action.value;
>>>>>>> ad7e9e7b36a966136653f33cb591c38e24351eed

        // dispatch({ type: "GET_ALL" })
    },




}


export default produce((state, action) => createReducer(state, action, workspaces), initialState);
