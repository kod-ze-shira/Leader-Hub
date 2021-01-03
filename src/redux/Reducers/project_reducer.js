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

const initialState = {
    workpace: {
        name: "malka",
        lastName: "rabin"
    }
}
export default produce((state, action) => {
    switch (action.type) {
        case 'SET_NAME':
            state.workpace.name = action.payload;
            break;
        case 'SET_LAST_NAME':
            state.workpace.lastName = action.payload;

    }
}, initialState);