
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
            isConfiguratorOpenWorkspace: false

}


const workspaces = {
    setWorkspace(state, action) {
        state.workspace = action.payload;
        console.log( state.workspace)
    },
    setWorkspaceOnChangeFiled(state, action) {
        state.workspace[action.payload] = action.value
    },
    setWorkspaceName(state, action) {
        state.workspace.name = action.payload;
    },
    setWorkspaceId(state, action) {
        state.workspace.id = action.payload;
    },
    setState(state, action) {
        state.workspace = action.payload
    },
    // setShowShare(state, action) {
    //     state.workspace = action.payload
    // },
    setisConfiguratorOpenWorkspace(state, action) {
        debugger;
        state.isConfiguratorOpenWorkspace = !state.isConfiguratorOpenWorkspace
    },
}


export default produce((state, action) => createReducer(state, action, workspaces), initialState);
