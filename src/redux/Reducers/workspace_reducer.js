
import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    workspace: {
        name: {},
        // _Id: "",
        // // projects: [],
        // // team: ""

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

        // state.workpace[action.payload] = action.value;
        state.workspace = action.value

        // dispatch({ type: "GET_ALL" })
    },




}


export default produce((state, action) => createReducer(state, action, workspaces), initialState);
