import produce from 'immer';
import { act } from 'react-dom/test-utils';
import createReducer from './reducerUtils';
const initialState = {
    tokenFromCookies: "",
    userName:""

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
const publicData = {
    // setWorkspace(state, action) {
    //     debugger
    //     // state.workpace[action.payload] = action.value;
    //     state.workspace = action.value
    //     // dispatch({ type: "GET_ALL" })
    // },

    setTokenFromCookies(state, action) {
        state.tokenFromCookies = action.payload;
    },
    setUserName(state,action){
        state.userName=action.payload;
    }


}


export default produce((state, action) => createReducer(state, action, publicData), initialState);