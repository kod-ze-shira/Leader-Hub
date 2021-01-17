
import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    workspace: {
        name: "rabin",
        showShare: false
        //  uaserId:"",
        //  projects:[],
        //  team:""

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
        state.workspace = action.payload;
    },
    setWorkspaceOnChangeFiled(state, action) {
        state.workspace[action.payload] = action.value
    }
}


export default produce((state, action) => createReducer(state, action, workspaces), initialState);
