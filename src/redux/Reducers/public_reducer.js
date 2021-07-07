import produce from 'immer';
import { removeData } from 'jquery';
import { act } from 'react-dom/test-utils';
import file from '../../component/hub/uploadFile/file/file';
import { actions } from '../actions/action';
import createReducer from './reducerUtils';
const initialState = {
    tokenFromCookies: "",
    userName: "",
    userEmail: '',
    userId: "",
    workspaces: [],
    projects: [],
    cards: [],
    cardsEmpty: false,
    tasks: [],
    milestones: [],
    isConfiguratorOpen: "false",
    indexCurrentTask: 0,
    idCurrentCard: 0,
    indexCurrentCard: 0,
    indexCurrentProject: 0,
    indexOfWorkspace: 0,
    arrFilesOfTask: [],
    arrDeleteFilesOfTask: [],
    filesForProjectArr: [],
    foldersForDownload: [],
    descriptionNewProject: '',
    sharedProjects: [] //projects that user shared  
}

const publicData = {
    setDescriptionNewProject(state, action) {
        state.descriptionNewProject = action.payload
    },
    setclose(state, action) {
        state.close = !state.close
    },
    setUserId(state, action) {

        state.userId = action.payload
    },
    setTokenFromCookies(state, action) {
        state.tokenFromCookies = action.payload;
    },
    setFilesFromTask(state, action) {
        state.arrFilesOfTask = action.payload
    },
    addMember(state, action) {
        state.workspaces[state.indexOfWorkspace].projects[state.indexCurrentProject].members = action.payload
    },

    setNewFilesInTask(state, action) {
        let myFiles = Object.values(action.payload)
        for (let index = 0; index < myFiles.length; index++) {
            state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask].files
                .push({ 'name': myFiles[index].name, 'url': myFiles[index].url, '_id': myFiles[index]._id, 'size': myFiles[index].size })
        }

    },
    deleteFilesInTask(state, action) {
        for (let indexUrl = 0; indexUrl < action.payload.length; indexUrl++)
            for (let index = 0; index < state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask].files.length; index++) {
                if (state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask].files[index].url == action.payload[indexUrl])
                    state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask].files.splice(index, 1)
            }

    },
    setNewFilesInTaskNotBelong(state, action) {
        let myFiles = Object.values(action.payload.file)
        let indexTask
        for (let index = 0; index < state.tasks.length; index++) {
            if (state.tasks[index]._id == action.payload.id)
                indexTask = index;
        }
        for (let index = 0; index < myFiles.length; index++) {
            state.tasks[indexTask].files
                .push({ 'name': myFiles[index].name, 'url': myFiles[index].url, '_id': myFiles[index]._id, 'size': myFiles[index].size })
        }

    },

    setTaskByFiledFromTasks(state, action) {

        state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask]
        [action.payload.nameFiled] = action.payload.value
        console.log(state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask]
        [action.payload.nameFiled])
    },
    
    setTaskByFiledFromTasksNotBelong(state, action) {
        let indexTask;
        for (let index = 0; index < state.tasks.length; index++) {
            if (state.tasks[index]._id == action.payload.idTask) {
                indexTask = index
            }
        }
        state.tasks[indexTask][action.payload.nameFiled] = action.payload.value
    },
    setIdFiles(state, action) {
        // dispatch(actions.setIdFiles(data.result.files));
        action.payload.map((file) => {
            state.arrFilesOfTask.map((myFile, index) => {
                if (myFile.url == 'new' && file.name == file.name) {
                    state.arrFilesOfTask[index]._id = file._id
                    state.arrFilesOfTask[index].url = file.url
                }
            })
            state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask].files.map((myFile, index) => {
                if (myFile.url == file.url) {
                    state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask].files[index]._id = file._id
                    // state.task._id = file._id
                    state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask].files[index].url = file.url
                    // state.task.url = file.url
                }
            })
        })
        // state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask].files[action.payload.index]._id = action.payload._id
    },
    setFileFromTask(state, action) {
        state.arrFilesOfTask.push({ 'url': 'new', 'name': action.payload.name, 'file': action.payload, 'size': action.payload.size })
        // if (window.location.href.indexOf('projectPlatform') != -1)
        //     state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask].files
        //         .push({
        //             'name': action.payload.name,
        //             'url': 'new',
        //             '_id': '',
        //             'size': action.payload.size
        //         })

    },
    /////////////////////////////////////////
    setFilesForProject(state, action) {
        state.filesForProjectArr = action.payload
    },
    setFoldersForDownload(state, action) {
        state.foldersForDownload = action.payload
    },
    setUserName(state, action) {
        state.userName = action.payload;
    },
    setWorkspaces(state, action) {
        state.workspaces = action.payload;
    },
    setPriorities(state, action) {
        state.priorities = action.payload;
    },
    setUserEmail(state, action) {
        state.userEmail = action.payload;
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
            if (workspace._id == action.payload._id) {
                state.workspaces[index] = action.payload
            }
        })
    },

    setProjectByFiledFromWorkspace(state, action) {
        state.workspaces[state.indexOfWorkspace].projects[state.indexCurrentProject]
        [action.payload.nameFiled] = action.payload.value
    },
    setProjectInWorkspace(state, action) {
        state.workspaces[state.indexOfWorkspace].projects[state.indexCurrentProject] = action.payload

    },
    setCountReadyTasks(state, action) {
        if (action.payload)
            state.workspaces[state.indexOfWorkspace].projects[state.indexCurrentProject].countReadyTasks += 1
        else
            state.workspaces[state.indexOfWorkspace].projects[state.indexCurrentProject].countReadyTasks -= 1
    },
    setCountTasks(state, action) {
        if (action.payload)
            state.workspaces[state.indexOfWorkspace].projects[state.indexCurrentProject].countTasks = action.payload
        else
            state.workspaces[state.indexOfWorkspace].projects[state.indexCurrentProject].countTasks -= 1

    },
    setProjects(state, action) {
        state.projects = action.payload;
    },
    setTasks(state, action) {
        state.tasks = action.payload.tasksForUser;
    },
    addTask(state, action) {
        state.tasks.push(action.payload)
    },
    removeTask(state, action) {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload)
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
    deletTaskNotBelong(state, action) {
        state.tasks = state.tasks.filter((task, i) =>
            state.tasks[i]._id !== action.payload._id
        )
    },
    deleteCard(state, action) {
        console.log(action.payload)
        state.cards = action.payload
        // console.log("project",action.payload.project)
        // state.cards = state.cards.filter((_, i) =>      
        //        {  console.log("filter",state.cards[i])
        //         return state.cards[i]._id !== action.payload.project._id}   
        // )
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
        state.cardsEmpty = true
        return true
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
            state.cardsEmpty = true

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
        state.cardsEmpty = true
        let cards = state.workspaces[state.indexOfWorkspace].projects[state.indexCurrentProject].cards
        cards[cards.length] = action.payload

        let a = state.workspaces[state.indexOfWorkspace].projects[state.indexCurrentProject].cards
        console.log(a)

    },
    addTaskToTasksWhenAddTaskToServer(state, action) {
        state.cards.map(card => {
            if (card._id == action.payload.card)
                card.tasks.push(action.payload);
        })
    },

    //remove one workspace when go back from server
    removeOneWorkspaceFromWorkspaces(state, action) {
        if (action.payload == undefined)
            state.workspaces = state.workspaces.filter((_, i) =>
                state.workspaces[i]._id !== undefined)

        else
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
    addWorkspaceToWorkspacesFromServer(state, action) {
        state.workspaces[state.indexOfWorkspace] = action.payload
    },


    setComlitedTask(state, action) {
        state.tasks[action.payload.index].complete = action.payload.value
    },

    setTaskComplete(state, action) {
        state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask] = action.payload
    },
    setStartHourId(state, action) {

        state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask].workingTime.push(action.payload)
    },

    setTaskFromTasks(state, action) {
        state.cards.forEach((card, index1) => {
            if (card._id == action.payload.card) {
                card.tasks.forEach((task, index2) => {
                    if (task._id == action.payload._id) {
                        state.cards[index1].tasks[index2] = action.payload
                    }
                })
            }
        })
    },
    setTaskFromTasksNotBelong(state, action) {
        state.tasks.forEach((task, index) => {
            if (task._id == action.payload._id)
                state.tasks[index] = action.payload
        })
    },
    deleteFilesInArr(state, action) {
        state.arrDeleteFilesOfTask = []
    },
    removeFileInRedux(state, action) {

        if (action.payload.url != 'new') {
            let fileToDelete = state.arrFilesOfTask.find((file) => file.url == action.payload.url)
            if (state.arrDeleteFilesOfTask)
                state.arrDeleteFilesOfTask.push(fileToDelete)
            else
                state.arrDeleteFilesOfTask = fileToDelete
            state.arrFilesOfTask = state.arrFilesOfTask.filter((file) => file.url != action.payload.url)
        }
        else {
            state.arrFilesOfTask = state.arrFilesOfTask.filter((file) => file.name != action.payload.name || file.url != 'new')
        }
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
    setDateTaskFromGantt(state, action) {
        let task = action.payload.task
        state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask].dueDate = task.dueDate
        state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask].startDate = task.startDate

    },
    setSharedProjects(state, action) {
        state.sharedProjects = action.payload
    },
    pushAssignToInRedux(state, action) {
        let assign = state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask].assignTo1
        assign.push(action.payload)
        let a = state.cards[state.indexCurrentCard].tasks[state.indexCurrentTask]
    }

}


export default produce((state, action) => createReducer(state, action, publicData), initialState);
