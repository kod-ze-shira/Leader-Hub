import produce from 'immer';

const initialState={
    project:{
        name:"",

    }
}
export default produce((state, action) => {
    switch (action.type) {
        case 'SET_NAME_PROJECT':
            state.project.name = action.payload;
            break;
      }
}, initialState);
