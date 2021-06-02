
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
import placeholder from '../../../img/placeholder.png'; // with import
import { blue } from '@material-ui/core/colors';
// import {angleDown} from 'react-fa'


function TasksNotBelongCardByMap(props) {

    const [viewDetails, setViewDetails] = useState(false)
    const [showchalalit, setShowChalalit] = useState(false)
    const [detailsOrEditTask, setDetailsOrEditTask] = useState()
    const [editTaskName, setEditTaskName] = useState(props.task.name)
    const [cardId, setCardId] = useState()
    const [myProjects, setMyProjects] = useState([])
    const [myCards, setMyCards] = useState()
    const [myWorkspace, setMyWorkspace] = useState()
    // const [viewCompleteTask, setViewCompleteTask] = useState(false)
    const [idWorkspace, setIdWorkspace] = useState()
    const [indexOfWorkspace, setIndexOfWorkspace] = useState()
    const [task, setTask] = useState({
        "_id": props.task._id, "name": props.task.name, "description": props.task.description
        , "status": props.status, "dueDate": props.task.dueDate, "startDate": props.task.startDate
    })

    const [indexOfProject, setIndexOfProject] = useState(null);
    const [indexOfCard, setIndexOfCard] = useState(null);

    useEffect(() => {
        if (!props.workspaces.length) {
            props.getAllWorkspacesFromServer()
        }

    }, [props.workspaces])

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
            "card": props.task.card ? props.task.card : ''
        }
        props.completeTask(completeTask)
    }

    const changeFiledInTask = (input) => {
        let indexTask
        for (let index = 0; index < props.tasks.length; index++) {
            if (props.tasks[index]._id == props.task._id)
                indexTask = index
        }
        let value = input.target.value
        let editTaskInRedux = { "index": indexTask, "value": !props.task.complete }
        editCompleteTask(!props.task.complete)
        props.setComlitedTask(editTaskInRedux)

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
                            style={{ backgroundColor: workspace.color, display: 'inline-block', 'text-align': 'center' }}
                        >
                            {workspace.name ? workspace.name[0].toUpperCase() : null}
                        </div>
                    </div>
                    <div>
                        {workspace.name}
                        {/* <i class="fa fa-angle-down" aria-hidden="true"></i> */}
                        {/* <FontAwesomeIcon icon={angleDown}  /> */}

                    </div>
                    <div></div>

                </div >
        } : null
    )) : null
    // const selectPlaceHorder = <img className="selectPlaceHorder" src={require('../../../img/remove.svg')}></img>

    // const selectPlaceHorder = <img src={placeholder}></img>
    const selectPlaceHorder = <hr
        style={{
            border: 0,
            clear: 'solid',
            display: 'block',
            width: '6vw',
            backgroundColor: '#68C7CB',
            height: '2px'
        }}
    />

    const handleChangeWorkspace = (newValue, actionMeta) => {
        if (newValue) {
            setMyCards(null)
            setMyProjects(null)
            setIndexOfProject(null)
            setIndexOfCard(null)
            document.getElementById("selectProjectInTasksNotBelong").click();

            let indexWorkspace
            for (let index = 0; index < props.workspaces.length; index++) {
                if (props.workspaces[index]._id == newValue.value._id) {
                    indexWorkspace = index
                    setIndexOfWorkspace(index)
                    setIdWorkspace(props.workspaces[index]._id)
                }
            }

            // chooseWorkspace()
            setMyWorkspace('selectedWorkspace')
            setTimeout(() => {
                setMyProjects(props.workspaces[indexWorkspace].projects ? props.workspaces[indexWorkspace].projects : null)

            }, 10);
            setCardId(null)
        }

    };
    const handleChangeProject = (newValue, actionMeta) => {
        if (newValue) {
            //   props.options == 
            let indexProject
            // setIndexOfProject(0) ;
            console.log(indexOfProject);
            for (let index = 0; index < myProjects.length; index++) {
                if (myProjects[index]._id == newValue.value._id) {
                    setIndexOfProject(index);
                    indexProject = index;
                }
            }
            setIndexOfCard(null)
            setMyCards(null)
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
            setCardId(newValue.value._id)
            setIndexOfCard(newValue.value.index)
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
                    "card": props.task.card ? props.task.card : ''
                }

                props.belongTask({ 'taskId': task._id, 'cardId': cardId, 'workspaceId': idWorkspace })

                // if (props.statuses.length) {

                //     resolve('suc')
                //     
                //     task.statuses = props.statuses
                //     props.editTask(task)
                //     reject('gg')
                // }

            });





            // לא מתעדכן הכומפליטד ברידקס 
            // props.setTaskComplete(completeTask)
        }
    }

    function deleteAllSelect() {
        setMyCards(null)
        setMyProjects(null)
        setIndexOfProject(null)
        setIndexOfCard(null)
        setIndexOfWorkspace(null)

    }
    function setPropertiesOfTask() {

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



    // function chooseCard() {

    //     document.getElementById('selectCardInTasksNotBelong').style.display = 'block'
    //     document.getElementById('chooseCard').style.display = 'none'
    // }
    function openViewDetails(e) {
        // props.setTaskName(props.task.name)
        setDetailsOrEditTask("viewTaskByCard")
        // props.setCurrentIndexTask(currentIndexTask)
        // props.setCurrentIndexCard(currentIndexCard)
        setViewDetails(true)
        e.stopPropagation();

    }

    $(window).click(function () {
        setViewDetails(false)
    });
    return (
        <>
            <div
                style={{ 'min-height': '47px' }}
                className="show-task row mx-4 border-bottom "
                id={props.task._id + 'disappear'}
            >
                <div className="col-5 row">
                    <label className="check-task1 py-2 row col-8    nameTaskNotBelong">

                        <label
                            className="check-task col-1">
                            {/* className="check-task ml-3 py-2 pl-5 col-1 "> */}
                            {/* <input type="checkbox" /> */}

                            <FontAwesomeIcon className="dnd-icon  " id={props.task._id}
                                icon={['fas', 'grip-vertical']}
                            ></FontAwesomeIcon>


                            <input
                                type="checkbox"
                                name="name" id="name" title={props.task.name}
                                checked={props.task.complete}
                                className={props.task.complete ? "disabled show-card " : "show-card "}
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
                        <label className='col-10'>
                            {props.task.name}
                        </label>
                    </label>

                    <label className="check-task col  d-flex align-items-center justify-content-end  view-details-btn" >
                        <button
                            onClick={(e) => openViewDetails(e)}
                        >
                            view details
                      <FontAwesomeIcon className="ml-2"
                                icon={['fas', 'caret-right']}>
                            </FontAwesomeIcon>
                        </button>
                    </label>
                </div>
                <label className="check-task text-center border-left  py-2  px-2 col-2 workspaceN">
                    {/* <div id='chooseWorkspace' onClick={(e) => chooseWorkspace(e)}>--</div> */}
                    <div className="justify-content-center">
                        <CreatableSelect
                            theme={theme => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#68c7cb1a',
                                    primary: '#68C7CB',
                                    primary50: '#68C7CB',
                                },
                            })}
                            onChange={handleChangeWorkspace}
                            id='selectWorkspaceInTasksNotBelong'
                            className='selectWorkspaceInTasksNotBelong text-center '
                            placeholder={selectPlaceHorder}
                            options={workspaceSelect}
                            value={indexOfWorkspace !== null ?
                                workspaceSelect[indexOfWorkspace] : 'Select...'}

                        />
                        {/* <div className="drop-down"> 
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                            <FontAwesomeIcon 
                                Icon='chevron-down'>
                            </FontAwesomeIcon>
                        </div> */}
                    </div>
                </label>
                <label className="check-task border-left  py-2  px-2 col-2 " >
                    {/* <div id='chooseProject' onClick={() => chooseProject()}>--</div> */}
                    <CreatableSelect
                        // id='selectProjectInAllTask'
                        isClearable
                        onChange={handleChangeProject}
                        placeholder={selectPlaceHorder}
                        theme={theme => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary25: '#68c7cb1a',
                                primary: '#68C7CB',
                                primary50: '#68C7CB',
                            },
                        })}
                        id='selectProjectInTasksNotBelong'
                        className='selectProjectInTasksNotBelong'
                        options={projectSelect}
                        value={indexOfProject !== null ?
                            projectSelect[indexOfProject] : 'Select...'}
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
                        theme={theme => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary25: '#68c7cb1a',
                                primary: '#68C7CB',
                                primary50: '#68C7CB',
                            },
                        })}
                        options={cardsSelect}
                        placeholder={selectPlaceHorder}

                        value={indexOfCard !== null ?
                            cardsSelect[indexOfCard] : 'Select...'}
                    />
                </label>
                <label className="check-task border-left d-flex justify-content-around align-items-center  py-2  px-2 col">

                    {myWorkspace && !cardId ?
                        <>
                            <button id='buttonSaveSelect' type="button" class="btn-sm saveSelect">save</button>
                            <button id='buttonCancleSelect' type="button" class="btn-sm" onClick={() => deleteAllSelect()}>cancle</button>

                        </>
                        : null
                    }

                    {cardId ?
                        <>
                            <button id='buttonSaveSelect' type="button" class="btn-sm saveSelectActive" onClick={() => belongTask()}>save</button>
                            <button id='buttonCancleSelect' type="button" class="btn-sm" onClick={() => deleteAllSelect()}>cancle</button>

                        </> : null

                    }

                </label>
                {viewDetails ?
                    <div className="closeDet" >
                        <ViewDetails
                            showToast={deleteTask}
                            closeViewDetails={() => setViewDetails(false)}
                            from='taskNotBelongDetails'
                            task={props.task}
                            open={true} />
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
        setIndexWorkspace: (index) => dispatch(actions.saveIndexOfWorkspaceInRedux(index)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TasksNotBelongCardByMap)
