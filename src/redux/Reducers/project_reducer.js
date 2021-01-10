import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    project: {
        name: "malka",
        id:"5ff5b702b8c8a9b179358795"
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
// const projects = {
//     setProject1(state, action) {
//         // state.workpace[action.payload] = action.value;
//         state.project.name = action.value
//         // dispatch({ type: "GET_ALL" })
//     },
// }


const project={
    setProjectName(state,action){
        state.project.name=action.payload;
    },
    setProjectId(state,action){
        state.project.id=action.payload;
    }
}


export default produce((state, action) => createReducer(state, action, project), initialState);
