
import { actions } from '../../../../redux/actions/action'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react'
// import './ViewTaskByCrad.css'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import ViewDetails from '../../viewDetails/viewDetails'
import $ from 'jquery';
import Animation from '../../animation/animation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreatableSelect from 'react-select/creatable';


function TasksNotBelongCardByMap(props) {

    const [viewDetails, setViewDetails] = useState(false)
    const [showchalalit, setShowChalalit] = useState(false)
    const [detailsOrEditTask, setDetailsOrEditTask] = useState()
    // const [currentIndexTask, setCurrentIndexTask] = useState("")
    // const [currentIndexCard, setCurrentIndexCard] = useState("")
    const [editTaskName, setEditTaskName] = useState(props.task.name)
    const [cardId, setCardId] = useState()
    const [myProjects, setMyProjects] = useState([])
    const [myCards, setMyCards] = useState()
    const [myWorkspace, setMyWorkspace] = useState()
    // const [viewCompleteTask, setViewCompleteTask] = useState(false)
    const [doneStatus, setDoneStatus] = useState(props.task.complete)
    let flugButtonSavePositive = false
    const [indexOfWorkspace, setIndexOfWorkspace] = useState()
    const [task, setTask] = useState({
        "_id": props.task._id, "name": props.task.name, "description": props.task.description
        , "status": props.status, "dueDate": props.task.dueDate, "startDate": props.task.startDate
    })

    useEffect(() => {
        if (props.workspaces.length == 0)
            props.getAllWorkspacesFromServer()

    }, [props.task, props.workspaces])

    const editTask = () => {
        let temp = { ...task }
        temp.name = editTaskName
        setTask(temp)
    }

    function addChalalit() {
        if (props.task.complete == false)
            setShowChalalit(true)
    }

    const editCompleteTask = (comlited) => {
        debugger
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        const yyyy = today.getFullYear()
        today = (dd <= 9 ? '0' + dd : dd) + '/' + (mm <= 9 ? '0' + mm : mm) + '/' + yyyy
        let completeTask = {
            "_id": props.task._id,
            "name": props.task.name,
            "description": props.task.description,
            "dueDate": props.task.dueDate,
            "startDate": props.task.startDate,
            "complete": comlited,
            "endDate": props.task.endDate ? props.task.endDatet : today,
            // "status": props.statuses[0],
            "card": props.task.card ? props.task.card : ''
        }
        // לא מתעדכן הכומפליטד ברידקס 
        // props.setTaskComplete(completeTask)
        props.completeTask(completeTask)
        // setViewCompleteTask(true)
    }

    const changeFiledInTask = (input) => {
        // props.setCurrentIndexTask(currentIndexTask)
        // props.setCurrentIndexCard(currentIndexCard)
        let indexTask
        for (let index = 0; index < props.tasks.length; index++) {
            if (props.tasks[index]._id == props.task._id)
                indexTask = index
        }
        let value = input.target.value
        let editTaskInRedux = { "index": indexTask, "value": !props.task.complete }
        // props.setComlitedTask(editTaskInRedux)
        // if (input.target.name == "complete")
        debugger
        editCompleteTask(!props.task.complete)
        console.log("task", props.task.complete);
    }

    function deleteTask() {
        console.log(props.task._id)
        $(`#${props.task._id + "disappear"}`).css("display", "none")
        props.objectToast({ 'type': 'Task', 'object': props.task })

    }

    const workspaceSelect = props.workspaces ? props.workspaces.map((workspace) => (
        workspace.name ? {
            value: workspace, label:
                // <div className="container">
                <div className="row" style={{ width: '200px' }}>

                    <div className=" " style={{ display: 'inline-block' }} >
                        <div className="logo-w-little "
                            style={{ backgroundColor: workspace.color, display: 'inline-block' }}
                        >
                            {workspace.name ? workspace.name[0].toUpperCase() : null}
                        </div>
                    </div>
                    {workspace.name}

                </div >
        } : null
    )) : null

    const handleChangeWorkspace = (newValue, actionMeta) => {
        if (newValue) {
            //   props.options == 
            // debugger
            let indexWorkspace
            for (let index = 0; index < props.workspaces.length; index++) {
                if (props.workspaces[index]._id == newValue.value._id) {
                    indexWorkspace = index
                    setIndexOfWorkspace(index)
                }
            }

            // chooseWorkspace()
            setMyWorkspace('selectedWorkspace')
            flugButtonSavePositive = true
            setMyProjects(props.workspaces[indexWorkspace].projects ? props.workspaces[indexWorkspace].projects : null)
            setCardId(null)
        }

    };
    const handleChangeProject = (newValue, actionMeta) => {
        if (newValue) {
            //   props.options == 
            let indexProject
            for (let index = 0; index < myProjects.length; index++) {
                if (myProjects[index]._id == newValue.value._id)
                    indexProject = index
            }
            setMyCards(myProjects[indexProject].cards ? myProjects[indexProject].cards : null)
            setCardId(null)
            // chooseProject()
        }
    };

    const projectSelect = myProjects ? myProjects.map((project) => (
        project.name ? {
            value: project, label:
                <div className="row" style={{ color: project.color }}>
                    <span class="dot dotProject" style={{ 'background-color': project.color }} ></span>

                    {project.name}
                </div >
        } : null
    )) : null


    const cardsSelect = myCards ? myCards.map((card) => (
        card.name ? {
            value: card, label:
                <div className="row" >
                    {card.name}
                </div >
        } : null
    )) : null


    const handleChangeCard = (newValue, actionMeta) => {
        if (newValue) {
            //   props.options == 
            setCardId(newValue.value._id)
            // console.log(cardId)
        }
    };
    function belongTask() {
        if (cardId) {

            props.setIndexWorkspace(indexOfWorkspace)


            const promiseA = new Promise(function (resolve, reject) {
                let task = {
                    "_id": props.task._id,
                    "name": props.task.name,
                    "description": props.task.description,
                    "dueDate": props.task.dueDate,
                    "startDate": props.task.startDate,
                    "complete": props.task.comlited ? props.task.comlited : false,
                    "endDate": props.task.endDate,
                    // "status": props.statuses[0],
                    "card": props.task.card ? props.task.card : ''
                }
                // props.completeTask(completeTask)
                props.getAllStatusesTaskForWorkspace(task)

                if (props.statuses.length) {

                    resolve('suc')
                    // dd()
                    reject('gg')
                }

            });
            // promiseA.then(() => {
            //     setPropertiesOfTask()
            // })


            // promiseA.then(function () {
            //     console.log('1.');
            //     debugger
            //     // setPropertiesOfTask()
            //     props.belongTask({ 'taskId': props.task._id, 'cardId': cardId })

            // })
            //     .then(function () {
            //         console.log('2')
            //         // debugger
            //         // setPropertiesOfTask()

            //         //do another thing, it will be called after the first promise was fullfilled.
            //     }).then(function () {
            //         console.log('3')
            //         // setPropertiesOfTask()
            //         // props.belongTask({ 'taskId': props.task._id, 'cardId': cardId })

            //         //do another thing, it will be called after the first promise was fullfilled.
            //     })
            //     .then(function () {
            //         debugger
            //         console.log('Promise rejected.')
            //         // setPropertiesOfTask()
            //         props.belongTask({ 'taskId': props.task._id, 'cardId': cardId })

            //         //do third thing, it will be called after the last promise was fullfilled.
            //     });


            // const promiseB = promiseA.then(setPropertiesOfTask());


            // לא מתעדכן הכומפליטד ברידקס 
            // props.setTaskComplete(completeTask)
        }
    }
    // function dd() {
    //     props.getAllStatusesTaskForWorkspace()
    // }
    function setPropertiesOfTask() {
        debugger
        let completeTask = {
            "_id": props.task._id,
            "name": props.task.name,
            "description": props.task.description,
            "dueDate": props.task.dueDate,
            "startDate": props.task.startDate,
            "complete": props.task.comlited,
            "endDate": props.task.endDate,
            // "status": props.statuses[0],
            "card": props.task.card ? props.task.card : ''
        }
        props.completeTask(completeTask)
    }

    function chooseWorkspace() {

        document.getElementById('selectWorkspaceInTasksNotBelong').style.display = 'block'
        document.getElementById('chooseWorkspace').style.display = 'none'
        document.getElementById('selectProjectInTasksNotBelong').style.display = 'none'
        document.getElementById('chooseProject').style.display = 'block'
        document.getElementById('selectCardInTasksNotBelong').style.display = 'none'
        document.getElementById('chooseCard').style.display = 'block'
        // $('#chooseWorkspace').css({ 'display', 'none'})
        // $('#selectWorkspaceInTasksNotBelong').css({ 'display': 'block' })
    }
    function chooseProject() {
        document.getElementById('selectProjectInTasksNotBelong').style.display = 'block'
        document.getElementById('chooseProject').style.display = 'none'
        document.getElementById('selectCardInTasksNotBelong').style.display = 'none'
        document.getElementById('chooseCard').style.display = 'block'
    }
    function chooseCard() {

        document.getElementById('selectCardInTasksNotBelong').style.display = 'block'
        document.getElementById('chooseCard').style.display = 'none'
    }

    return (
        <>
            <div
                style={{ 'min-height': '47px' }}
                className="show-task row mx-4 border-bottom "
            >

                <FontAwesomeIcon className="dnd-icon mt-2 " id={props.task._id}
                    icon={['fas', 'grip-vertical']}
                ></FontAwesomeIcon>
                <label
                    className="check-task ml-3 py-2 pl-5 col-1 ">
                    {/* <input type="checkbox" /> */}

                    <input
                        type="checkbox"
                        name="name" id="name" title={props.task.name}
                        checked={props.task.complete}
                        className={props.task.complete ? "disabled show-card py-2" : "show-card py-2"}
                        value={props.task.name}
                        onChange={(e) => changeFiledInTask(e)}
                        onBlur={(e) => editTask()}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                editTask()
                            }
                        }}
                    />
                    <span className="checkmark checkmark-place" onClick={() => addChalalit()}></span>

                </label>

                <label className="check-task1 py-2  px-2 col-3 ">

                    {props.task.name}
                </label>
                <label className="check-task border-left  py-2  px-2 col-2 workspaceN ">
                    {/* <div id='chooseWorkspace' onClick={(e) => chooseWorkspace(e)}>--</div> */}
                    <CreatableSelect
                        isClearable
                        onChange={handleChangeWorkspace}
                        // onInputChange={handleInputChange}
                        // value='dd'
                        id='selectWorkspaceInTasksNotBelong'
                        className='selectWorkspaceInTasksNotBelong'
                        options={workspaceSelect}
                    />
                </label>
                <label className="check-task border-left  py-2  px-2 col-2 " >
                    {/* <div id='chooseProject' onClick={() => chooseProject()}>--</div> */}

                    <CreatableSelect
                        // id='selectProjectInAllTask'
                        isClearable
                        onChange={handleChangeProject}
                        // onInputChange={handleInputChange}
                        id='selectProjectInTasksNotBelong'
                        className='selectProjectInTasksNotBelong'
                        options={projectSelect}
                    />
                </label>
                <label className="check-task border-left  py-2  px-2 col-2">
                    {/* <div id='chooseCard' onClick={(e) => chooseCard(e)}>--</div> */}

                    <CreatableSelect
                        // id='selectProjectInAllTask'
                        isClearable
                        onChange={handleChangeCard}
                        id='selectCardInTasksNotBelong'
                        className='selectCardInTasksNotBelong'

                        // onInputChange={handleInputChange}
                        options={cardsSelect}
                    />

                </label>
                <label className="check-task border-left d-flex justify-content-between  py-2  px-2 col">

                    {myWorkspace && !cardId ?
                        <>
                            <button id='buttonSaveSelect' type="button" class="btn-sm saveSelect" onClick={() => belongTask()}>save</button>
                            <button id='buttonCancleSelect' type="button" class="btn-sm ">cancle</button>

                        </>
                        : null
                    }

                    {cardId ?
                        <>
                            <button id='buttonSaveSelect' type="button" class="btn-sm saveSelectActive" onClick={() => belongTask()}>save</button>
                            <button id='buttonCancleSelect' type="button" class="btn-sm ">cancle</button>

                        </> : null

                    }

                </label>
                {viewDetails ?
                    <div className="closeDet" >
                        <ViewDetails showToast={deleteTask} closeViewDetails={() => setViewDetails(false)}
                            from={detailsOrEditTask} task={task} open={true}> </ViewDetails>
                    </div>
                    : null}
            </div>
            {/* </div>
                )}
            </Draggable> */}

            { showchalalit ? <div className="animation"><Animation /> </div> : null}


        </>
    )
}
const mapStateToProps = (state) => {

    return {
        tasks: state.public_reducer.tasks,
        workspaces: state.public_reducer.workspaces,
        statuses: state.status_reducer.statuses,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        EditTask: (task) => dispatch(actions.editTask(task)),
        setTaskStatus: (index) => dispatch(actions.setTaskStatus(index)),
        getAllWorkspacesFromServer: () => dispatch(actions.getAllWorkspacesFromServer()),
        completeTask: (task) => dispatch(actions.completeTask(task)),
        setComlitedTask: (taskDetails) => dispatch(actions.setComlitedTask(taskDetails)),
        belongTask: (ids) => dispatch(actions.belongTask(ids)),
        getAllStatusesTaskForWorkspace: (task) => dispatch(actions.getAllStatusesTaskForWorkspace1(task)),
        setIndexWorkspace: (index) => dispatch(actions.saveIndexOfWorkspaceInRedux(index)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TasksNotBelongCardByMap)
