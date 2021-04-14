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
    statuses: [],
    milestones: [],
    isConfiguratorOpen: "false",
    indexCurrentTask:0,
    idCurrentCard:0
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
    setWorkspaceByFiled(state, action) {
        debugger
        state.workspaces.forEach((workspace, index) => {
            if (workspace.workspace._id == action.payload.workspace.workspace._id) {
                state.workspaces[index].workspace[action.payload.nameFiled] = action.payload.value
            }
        })
    },
    setProjectByFiledFromWorkspace(state, action) {
        state.workspaces.forEach((workspace, index1) => {
            if (workspace.workspace._id == action.payload.project.workspace) {
                workspace.projectList.forEach((project, index2) => {
                    if (project.project._id == action.payload.project._id) {
                        state.workspaces[index1].projectList[index2].project[action.payload.nameFiled] = action.payload.value
                        let a = state.workspaces[index1].projectList[index2].project[action.payload.nameFiled]
                        console.log(a);
                    }
                })
            }
        })
    },
    setProjectInWorkspace(state, action) {
        state.workspaces.forEach((workspace, index1) => {
            if (workspace.workspace._id == action.payload.project.workspace) {
                workspace.projectList.forEach((project, index2) => {
                    if (project.project._id == action.payload.project._id) {
                        state.workspaces[index1].projectList[index2].project = action.payload.project

                    }
                })
            }
        })
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
        debugger;
        let workspaceId = action.payload.project.workspace
        for (let i = 0; i < state.workspaces.length; i++) {
            if (state.workspaces[i].workspace._id == workspaceId) {
                console.log("yes");
                console.log(action.payload);
                console.log(state.workspaces[i].projectList)
                // state.workspaces[i].projectList.push({ "project": action.payload.project, "countTasks": 0, "countReadyTask": 0 })
                state.workspaces[i].projectList.push(action.payload)

            }
        }
        // state.workspaces.forEach((workspace) => {
        //     if (workspace.workspace._id == workspaceId) {
        //         console.log("yes");
        //         console.log(workspace.workspace.projectList)

        //         // workspace.workspace.projectList.push(action.payload)
        //     }
        // })
    },
    addProjectTArray(state, action) {
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
    },
    setTaskByFiledFromTasks(state, action) {
        console.log("task", action.payload.task);
        state.cards.forEach((card, index1) => {
            if (card._id == action.payload.task.card) {
                card.tasks.forEach((task, index2) => {
                    if (task._id == action.payload.task._id) {
                        state.cards[index1].tasks[index2][action.payload.nameFiled] = action.payload.value
                        let a = state.cards[index1].tasks[index2][action.payload.nameFiled]
                        console.log(a);
                    }
                })
            }
        })
    },
    setTaskByFiledFromTasksTry(state, action) {
        console.log("task", action.payload.task);
        state.cards.forEach((card, index1) => {
            if (card._id ==state.idCurrentCard) {
                card.tasks.forEach((task, index2) => {
                    if (task._id == state.indexCurrentTask) {
                        state.cards[index1].tasks[index2][action.payload.nameFiled] = action.payload.value
                        let a = state.cards[index1].tasks[index2][action.payload.nameFiled]
                        console.log(a);
                    }
                })
            }
        })
        // state.cards.map(card=>{
        //     if(card._id==state.idCurrentCard)
        //     {
        //         card.tasks.map(task=>{
        //             if(task._id==state.indexCurrentTask){
        //                 task[action.payload.nameFiled]=action.payload.value
        //                 console.log(task);
        //             }
                    
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
            
    },
    setCurrentIndexTask(state,action){
        state.indexCurrentTask=action.payload
    },
    setIdCurrentCard(state,action){
        state.idCurrentCard=action.payload
    }
    // setWorkspaceByFiledFromWorkspaces(state, action) {
    //     console.log("workspace", action.payload);
    //     for (let index = 0; index < workspaces.length; index++) {  
    //         let a = state.workspaces[index].workspace[action.payload.nameFiled]    
    //     }      
    // },

}


export default produce((state, action) => createReducer(state, action, publicData), initialState);
