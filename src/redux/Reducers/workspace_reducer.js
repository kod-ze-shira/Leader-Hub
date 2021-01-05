// import produce from 'immer'
// const initialState = {
// }


// export default produce((state, action) => {
//     switch (action.type) {
//         case 'SET_USER_ID':
//             state.userid = action.payload;
//             break;
//         default:
//             return state;
//     }
// }, initialState);
import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    workspace: {
        name: "אבא אני אוהבת אותך תעזור לי שזה יעבוד",
        //  uaserId:"",
        //  projects:[],
        //  team:""

    }



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
const workspaces = {
    setWorkspace(state, action) {
        debugger
        // state.workpace[action.payload] = action.value;
        state.workspace.name = action.value
        // dispatch({ type: "GET_ALL" })
    },




}


export default produce((state, action) => createReducer(state, action, workspaces), initialState);
