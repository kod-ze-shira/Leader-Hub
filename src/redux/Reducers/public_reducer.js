import produce from 'immer';
import { removeData } from 'jquery';
import { act } from 'react-dom/test-utils';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    tokenFromCookies: "",
    userName: "",
    workspaces: [],
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
        state.workspaces = action.payload;
    },
    setProjects(state, action) {
        state.projects = action.payload;
    },
    setTasks(state, action) {
        state.tasks = action.payload;
    },
    addNewWorkspace(state, action) {
        state.workspaces.push({ "workspace": action.payload, "projectList": [] })
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
    addProjectToProjects(state, action) {
        state.projects.push(action.payload)
    },
    // state.projects.push(action.payload)

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
        let source, destinition, cardDestinitionId, cardSourseId
        source = action.payload[0]
        destinition = action.payload[1]
        cardSourseId = action.payload[2]
        cardDestinitionId = action.payload[3]
        console.log(cardSourseId, cardDestinitionId)
        let temp1 = state.cards[cardSourseId].tasks[source]
        state.cards[cardSourseId].tasks.splice(source, 1)
        state.cards[cardDestinitionId].tasks.splice(destinition, 0, temp1)
    },
    changeCardPlace(state, action) {
        let source, destinition, temp
        source = action.payload[0]
        destinition = action.payload[1]
        temp = state.cards[source]
        state.cards.splice(source, 1)
        state.cards.splice(destinition, 0, temp)
    },
    setisConfiguratorOpen(state, action) {
        state.isConfiguratorOpen = !state.isConfiguratorOpen
    },
    setCards(state, action) {
        state.cards = action.payload;
    },
    deleteProjectFromWorkspace(state, action) {
        state.projects = state.projects.filter((_, i) =>
            state.projects[i].project._id !== action.payload._id
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
        state.workspaces = state.workspaces.filter((_, i) =>
            state.workspaces[i].workspace._id !== action.payload._id
        )
    },
    setCardNameInput(state, action) {
        console.log(action.payload)
        state.cards.map(card => {
            if (card._id == action.payload._id)
                card.name = action.payload.name;
        })
    },
    updateWorkspaceUfterEditInServer(state, action) {
        state.workspaces.forEach((workspace, index) => {
            if (workspace.workspace._id === action.payload._id)
                state.workspaces[index].workspace = action.payload
        }

        )
    },
    addWorkspaceToWorkspaces(state, action) {
        state.workspaces.push(action.payload)
    }
}


export default produce((state, action) => createReducer(state, action, publicData), initialState);
