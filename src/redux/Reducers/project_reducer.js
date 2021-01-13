import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    project: {
        name: "",
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
const projects = {
    setProject1(state, action) {

        // state.workpace[action.payload] = action.value;
        state.project.name = action.value
        // dispatch({ type: "GET_ALL" })
    },




}


export default produce((state, action) => createReducer(state, action, projects), initialState);
