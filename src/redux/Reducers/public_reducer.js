import produce from 'immer';
import { removeData } from 'jquery';
import { act } from 'react-dom/test-utils';
import file from '../../component/hub/uploadFile/file/file';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    tokenFromCookies: "",
    userName: "",
    workspaces: [],
    projects: [],
    cards: [],
    tasks: [],
    milestones: [],
    isConfiguratorOpen: "false",
    indexCurrentTask: 0,
    indexCurrentCard: 0,
    idCurrentCard: 0,
    indexCurrentCard: 0,
    indexCurrentProject: 0,
    indexOfWorkspace: 0,
    arrFilesOfTask: []
}

const publicData = {
    setclose(state, action) {
        state.close = !state.close
    },

    setTokenFromCookies(state, action) {
        state.tokenFromCookies = action.payload;
    },
    setFilesFromTask(state, action) {
        state.arrFilesOfTask = action.payload
    },
    setFileFromTask(state, action) {
        debugger
        state.arrFilesOfTask.push({ 'url': 'new', 'name': action.payload.name, 'file': action.payload })
    },

    setUserName(state, action) {
        state.userName = action.payload;
    },
    setWorkspaces(state, action) {
        state.workspaces = action.payload;
    },
    setWorkspaceByFiled(state, action) {
        state.workspaces[state.indexOfWorkspace][action.payload.nameFiled] = action.payload.value

        // state.workspaces.forEach((workspace, index) => {
        //     if (workspace._id == action.payload.workspace._id) {
        //         state.workspaces[index][action.payload.nameFiled] = action.payload.value
        //     }
        // })
    },
    setWorkspaceBeforeChanges(state, action) {

        state.workspaces.forEach((workspace, index) => {
            if (workspace._id == action.payload.workspace._id) {
                state.workspaces[index] = action.payload.workspace
            }
        })
    },

    setProjectByFiledFromWorkspace(state, action) {
        state.workspaces[state.indexOfWorkspace].projects[state.indexCurrentProject]
        [action.payload.nameFiled] = action.payload.value

    },
    setProjectInWorkspace(state, action) {
        state.workspaces[state.indexOfWorkspace].projects[state.indexCurrentProject]
            = action.payload

        // state.workspaces.forEach((workspace, index1) => {
        //     if (workspace._id == action.payload.project.workspace) {
        //         workspace.project.forEach((project, index2) => {
        //             if (project_id == action.payload.project._id) {
        //                 state.workspaces[index1].project[index2].project = action.payload.project
        //                 console.log(state.workspaces[index1].project[index2].project)
        //             }
        //         })
        //     }
        // })
    },
    setProjects(state, action) {
        state.projects = action.payload;
    },
    setTasks(state, action) {
        state.tasks = action.payload.tasksForUser;
    },
    setMilestones(state, action) {
        state.milestones = action.payload;
        console.log(state.milestones)
    },
    addNewWorkspace(state, action) {
        state.workspaces.push(action.payload)
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

        let workspaceId = action.payload.workspace
        for (let i = 0; i < state.workspaces.length; i++) {
            if (state.workspaces[i]._id == workspaceId) {
                state.workspaces[i].projects.push(action.payload)
            }
        }
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
        // console.log(state.cards[i].tasks[j]._id== action.payload._id)
        for (i = 0; i < state.cards.length; i++)
            if (state.cards[i]._id == action.payload.card) {
                for (j = 0; j < state.cards[i].tasks.length; j++) {
                    if (state.cards[i].tasks[j]._id == action.payload._id) {
                        state.cards[i].tasks[j] = action.payload
                        console.log()
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

        state.workspaces[state.indexOfWorkspace].projects.filter((_, i) =>
            state.workspaces[state.indexOfWorkspace].projects[i]._id !== action.payload._id
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
        if (state.cards.length > 0)
            state.cards.push(action.payload)
        else
            state.cards[0] = action.payload

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
            state.workspaces[i]._id !== action.payload._id
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
            if (workspace._id === action.payload._id)
                state.workspaces[index] = action.payload
        }

        )
    },


    addWorkspaceToWorkspaces(state, action) {
        state.workspaces.push(action.payload)
    },
    setTaskByFiledFromTasks(state, action) {
        state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask][action.payload.nameFiled] = action.payload.value

    },

    setTaskFromTasks(state, action) {
        state.cards.forEach((card, index1) => {
            if (card._id == action.payload.task.card) {
                card.tasks.forEach((task, index2) => {
                    if (task._id == action.payload.task._id) {
                        state.cards[index1].tasks[index2] = action.payload.task
                    }
                })
            }
        })
    },

        //         })
        //     }
        // })
        //    state.cards.find(card=>card._id==state.idCurrentCard).tasks.map(task=>{
        //       if(task._id==state.indexCurrentTask)
        //     {
        //         task[action.payload.nameFiled]=action.payload.value
        //                 console.log(task);
        //     }
        //    })

        // state.cards[state.idCurrentCard].tasks[state.indexCurrentTask][action.payload.nameFiled] = action.payload.value
        // let a = state.cards[state.idCurrentCard].tasks[state.indexCurrentTask][action.payload.nameFiled]
        // console.log(a);   
    // deleteFilesInTask(state, action) {
    //     debugger
    //     action.payload.map((urlFile) =>
    //         state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask].files
    //             .filter((file) => file.url != urlFile))
    // },
    removeFileInRedux(state, action) {
        debugger
        if (action.payload.url != 'new')
            state.arrFilesOfTask = state.arrFilesOfTask.filter((file) => file.url != action.payload.url)
        else
            state.arrFilesOfTask = state.arrFilesOfTask.filter((file) => file.name != action.payload.name || file.url != 'new')

    },
    saveCurrentIndexOfTaskInRedux(state, action) {
        state.indexCurrentTask = action.payload
    },
    setCurrentIndexProject(state, action) {
        state.indexCurrentProject = action.payload
    },
    setIdCurrentCard(state, action) {
        state.idCurrentCard = action.payload
    },
    saveCurrentIndexOfCardInRedux(state, action) {
        state.indexCurrentCard = action.payload
    },
    saveIndexOfWorkspaceInRedux(state, action) {
        state.indexOfWorkspace = action.payload
    },

    // setWorkspaceByFiledFromWorkspaces(state, action) {
    //     console.log("workspace", action.payload);
    //     for (let index = 0; index < workspaces.length; index++) {  
    //         let a = state.workspaces[index][action.payload.nameFiled]    
    //     }      
    // },

}


export default produce((state, action) => createReducer(state, action, publicData), initialState);
