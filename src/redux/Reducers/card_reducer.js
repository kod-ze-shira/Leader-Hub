import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {

    card: {}

}
const card = {
    setCard(state, action) {
        state.card = action.payload;
    },
    setCardName(state, action) {
        state.card.name = action.payload;
    }
}

export default produce((state, action) => createReducer(state, action, card), initialState);
