import produce from 'immer';
import createReducer from './reducerUtils';
const initialState = {
    tokenFromCookies: "",

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
const cookies = {
    // setWorkspace(state, action) {
    //     
    //     // state.workpace[action.payload] = action.value;
    //     state.workspace = action.value
    //     // dispatch({ type: "GET_ALL" })
    // },

    setTokenFromCookies(state, action) {
        state.tokenFromCookies = action.payload;

    },


}


export default produce((state, action) => createReducer(state, action, cookies), initialState);