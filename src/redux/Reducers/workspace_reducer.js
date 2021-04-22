
import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    workspace: {},

    closeEditWorkspace: false


}


const workspaces = {
    setWorkspace(state, action) {
        state.workspace = action.payload;
    },
    setWorkspaceOnChangeFiled(state, action) {
        state.workspace.workspace[action.payload] = action.value
    },

    setcloseEditWorkspace(state, action) {
        state.closeEditWorkspace = !state.closeEditWorkspace
    }

}


export default produce((state, action) => createReducer(state, action, workspaces), initialState);
