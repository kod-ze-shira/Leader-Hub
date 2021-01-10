
import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    workspace: {
        name: "rabin",
        //  uaserId:"",
        //  projects:[],
        //  team:""

    }



}
const workspace= {
    setWorkspaceName(state, action) {
        state.workspace.name = action.payload;
    },
    
};

const workspaces = {
    setWorkspace(state, action) {
        // state.workpace[action.payload] = action.value;
        
        // dispatch({ type: "GET_ALL" })
    },




}


export default produce((state, action) => createReducer(state, action, workspaces), initialState);
