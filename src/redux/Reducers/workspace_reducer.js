
import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    workspace: {


    },
    isConfiguratorOpenWorkspace: false

}


const workspaces = {
    setWorkspace(state, action) {
        state.workspace = action.payload;
    },
    setWorkspaceOnChangeFiled(state, action) {
        state.workspace[action.payload] = action.value
    },

    setState(state, action) {
        state.workspace = action.payload
    },
    // setShowShare(state, action) {
    //     state.workspace = action.payload
    // },
    setisConfiguratorOpenWorkspace(state, action) {
        state.isConfiguratorOpenWorkspace = !state.isConfiguratorOpenWorkspace
    },
}


export default produce((state, action) => createReducer(state, action, workspaces), initialState);
