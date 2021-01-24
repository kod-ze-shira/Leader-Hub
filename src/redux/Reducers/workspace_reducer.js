
import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    workspace: {
        name: "rabin",
        showShare: false,
        //  uaserId:"",
        //  projects:[],
        //  team:""

    },

    isConfiguratorOpenWorkspace: true

}


const workspaces = {
    setWorkspace(state, action) {
        state.workspace = action.payload;
    },
    setWorkspaceOnChangeFiled(state, action) {
        state.workspace[action.payload] = action.value
    },
    setWorkspaceName(state, action) {
        state.workspace.name = action.payload;
    },
    setState(state, action) {
        state.workspace = action.payload
    },
    // setShowShare(state, action) {
    //     state.workspace = action.payload
    // },
<<<<<<< HEAD
    setisConfiguratorOpenWorkspace(state, action) {
        debugger;
        state.isConfiguratorOpenWorkspace = !state.isConfiguratorOpenWorkspace
    },
=======

};

const workspaces = {
    setWorkspace(state, action) {
        // state.workpace[action.payload] = action.value;

        // dispatch({ type: "GET_ALL" })
    },




>>>>>>> dev
}


export default produce((state, action) => createReducer(state, action, workspaces), initialState);
