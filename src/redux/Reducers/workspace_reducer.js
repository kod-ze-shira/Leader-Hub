
import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    workspace: {},
<<<<<<< HEAD



=======
    closeEditWorkspace: false
>>>>>>> dev
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


}


export default produce((state, action) => createReducer(state, action, workspaces), initialState);
