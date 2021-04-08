
import produce from 'immer';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    statuses: {
    },
    status:{}
}

const statuses = {
    setStatuses(state, action) {
        state.statuses = action.payload
    },
    // setStatus(state, action) {
    //     state.statuses = action.payload
    // },
    addNewStatus(state, action) {
        state.statuses.push(action.payload)
        console.log(state.statuses)
    },
    updateStatusUfterEditInServer(state, action) {
        state.statuses.forEach((status, index) => {
            if (status._id === action.payload._id)
                state.statuses[index] = action.payload
        }

        )
    },
    setStatusOnChangeFiled(state, action) {
        state.workspace.workspace[action.payload] = action.value
    },
}

export default produce((state, action) => createReducer(state, action, statuses), initialState);
