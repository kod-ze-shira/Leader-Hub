import produce from 'immer';
import { removeData } from 'jquery';
import { act } from 'react-dom/test-utils';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    tokenFromCookies: "",
    userName: "",
    worksapces: [],
    projects: [],
    cards: [],
    tasks: [],
    isConfiguratorOpen: "false",
    // close: "false"
}

const publicData = {
    setclose(state, action) {
        state.close = !state.close
    },

    setTokenFromCookies(state, action) {
        state.tokenFromCookies = action.payload;
    },
    setUserName(state, action) {
        state.userName = action.payload;
    },
    setWorkspaces(state, action) {
        state.worksapces = action.payload;
    },
    setProjects(state, action) {
        state.projects = action.payload;
    },
    setTasks(state, action) {
        state.tasks = action.payload;
    },
    addNewWorkspace(state, action) {
        state.worksapces.push(action.payload)
    },
    deletTask(state, action) {
        state.cards.map(card => {
            if (card._id == action.payload.card)
                card.tasks = card.tasks.filter((_, i) =>
                    card.tasks[i]._id !== action.payload._id
                )
        })
    },
    deletCard(state, action) {
        console.log(action.payload.dc)
        state.cards = state.cards.filter((_, i) =>
            state.cards[i]._id !== action.payload.dc._id
        )
    },

    setNewTask(state, action) {
        let i, j
        console.log("state.cards[i].tasks[j]._id action.payload._id")
        for (i = 0; i < state.cards.length; i++)
            if (state.cards[i]._id == action.payload.card) {
                for (j = 0; j < state.cards[i].tasks.length; j++) {
                    if (state.cards[i].tasks[j]._id == action.payload._id) {
                        state.cards[i].tasks[j] = action.payload
                        break
                    }
                }
            }
    },

    setTaskStatus(state, action) {
        let cardId, taskId
        cardId = action.payload[0]
        taskId = action.payload[1]
        state.cards[cardId].tasks[taskId].status = "done"
    },
    setTaskName(state, action) {
        let i, j
        console.log("state.cards[i].tasks[j]._id action.payload._id")
        for (i = 0; i < state.cards.length; i++)
            if (state.cards[i]._id == action.payload.card) {
                for (j = 0; j < state.cards[i].tasks.length; j++) {
                    if (state.cards[i].tasks[j]._id == action.payload._id) {
                        state.cards[i].tasks[j] = action.payload
                        break
                    }
                }
            }
    },
    changeTaskplace(state, action) {
        let source, destinition, cardId, temp, cardDestinitionId, cardSourseId
        source = action.payload[0]
        destinition = action.payload[1]
        cardSourseId = action.payload[2]
        cardDestinitionId = action.payload[3]
        console.log(cardSourseId, cardDestinitionId)
        // temp = state.cards[cardId].tasks[destinition]
        let temp1 = state.cards[cardSourseId].tasks[source]

        // state.cards[cardId].tasks[destinition] = state.cards[cardId].tasks[source]
        // state.cards[cardId].tasks[source] = temp
        state.cards[cardSourseId].tasks.splice(source, 1)
        state.cards[cardDestinitionId].tasks.splice(destinition, 0, temp1)
    },
    setisConfiguratorOpen(state, action) {
        state.isConfiguratorOpen = !state.isConfiguratorOpen
    },
    setCards(state, action) {
        state.cards = action.payload;
    },
    deleteProjectFromWorkspace(state, action) {
        state.projects = state.projects.filter((_, i) =>
            state.projects[i]._id !== action.payload._id
        )
    },
    getCardsOfProject(state, action) {
        state.projects.find(project => {
            if (project._id == action.payload)
                state.cards = project.cards
        })
    },
    getTasksOfCard(state, action) {
        state.cards.find(card => {
            if (card._id == action.payload)
                state.tasks = card.tasks
        })
    },
    addCardToCardsWhenAddCardToServer(state, action) {
        state.cards.push(action.payload)
    },
    addTaskToTasksWhenAddTaskToServer(state, action) {
        state.cards.map(card => {
            if (card._id == action.payload.card)
                card.tasks.push(action.payload);
        })
    },
    //remove one workspace when go back from server
    removeOneWorkspaceFromWorkspaces(state, action) {
        state.worksapces = state.worksapces.filter((_, i) =>
            state.worksapces[i]._id !== action.payload._id
        )
    },
    setCardNameInput(state, action) {
        state.cards.map(card => {
            if (card._id == action.payload.card)
                card.name = action.payload;
        })
    },
    updateWorkspaceUfterEditInServer(state, action) {
        state.worksapces.forEach((workspace, index) => {
            if (workspace._id === action.payload._id)
                state.worksapces[index] = action.payload
        }

        )
    },
    addWorkspaceToWorkspaces(state, action) {
        state.worksapces.push(action.payload)
    }
}


export default produce((state, action) => createReducer(state, action, publicData), initialState);
