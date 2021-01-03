import produce from 'immer';

const initialState = {
       workpace: {
        name: "",
     
    }
}
export default produce((state, action) => {
    switch (action.type) {
        case 'SET_NAME':
            state.workpace.name = action.payload;
            break;
        case 'SET_LAST_NAME':
            state.workpace.lastName=action.payload;

    }
}, initialState);