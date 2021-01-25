import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {

    card: {
    //   name:""
    }

}



const card = {

    }

export default produce((state, action) => createReducer(state, action, card), initialState);
