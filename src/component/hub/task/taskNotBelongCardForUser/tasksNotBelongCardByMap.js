
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
import { blue } from '@material-ui/core/colors';
// import {angleDown} from 'react-fa'
import ProjectStyle from "../../project/projectStyle";
import Background from '../../../img/down-arrow.svg';
function TasksNotBelongCardByMap(props) {

    const [viewDetails, setViewDetails] = useState(false)
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

    let doneStatus = props.task?.complete;
    const [downloadFile, setDownloadFile] = useState(false)
    const [flag, setFlag] = useState(true)
    useEffect(() => {
        if (!props.workspaces.length) {
            props.getAllWorkspacesFromServer()
        }

    }, [props.workspaces])
    useEffect(() => {
        doneStatus = props.task.complete
    }, [props.task.complete])
    // const editTask = () => {
    //     let temp = { ...task }
    //     temp.name = editTaskName
    //     setTask(temp)
    // }

    function addChalalit() {
        if (props.task.complete == false)
            props.showRocketShip(true)


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
        doneStatus = !doneStatus
        if (doneStatus) {
            props.viewToastMassege({ show: true, massege: 'comlited task!!' })
        }
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


    }

    function deleteTask() {
        console.log(props.task._id)
        $(`#${props.task._id + "disappear"}`).css("display", "none")
        props.objectToast({ 'type': 'Task', 'object': props.task })
    }

    const workspaceSelect = props.workspaces ? props.workspaces.map((workspace) => (
        workspace.name ? {
            value: workspace, label:
                <div className="d-flex flex-row" >
                    <div  >
                        <div className="  logo-w-little "
                            style={{ backgroundColor: workspace.color, display: 'inline-block', 'text-align': 'center' }}
                        >
                            {workspace.name ? workspace.name[0].toUpperCase() : null}
                        </div>
                    </div>
                    <div className="select-not-belong">
                        {workspace.name}
                    </div>
                </div >
        } : null
    )) : null

    const selectPlaceHorder = <hr className="hr-place-holder" />

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
    const style = {
        control: (base, state) => ({
            ...base,
            backgroundSize: '10px 10px',
            backgroundPosition: '90%',
            backgroundImage: `url(${Background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: state.isFocused ? '#eeeeee' : 'white',
            border: 0,
            // This line disable the blue border
            boxShadow: 0,
            "&:hover": {
                border: 0,
                backgroundColor: '#eeeeee',
            }
        })
    };
    const projectSelect = myProjects ? myProjects.map((project) => (
        project.name ? {
            value: project, label:
                <div className="d-flex flex-row" style={{ color: project.color }}>
                    <div style={{ marginTop: '0.5px' }}>
                        <ProjectStyle color={project.color}></ProjectStyle>
                    </div>
                    <span className="select-not-belong project-select-not-belong">{project.name}</span>
                </div >
        } : null
    )) : null


    const cardsSelect = myCards ? myCards.map((card) => (
        card.name ? {
            value: card, label:
                <div className="d-flex flex-row pl-2 select-not-belong" >
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
                props.viewToastMassege({ show: true, massege: 'Task assign!!' })

            });
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

    function openViewDetails(e) {
        // props.setTaskName(props.task.name)
        setDetailsOrEditTask("viewTaskByCard")
        // props.setCurrentIndexTask(currentIndexTask)
        // props.setCurrentIndexCard(currentIndexCard)
        setViewDetails(true)
        e.stopPropagation();

    }

    $(window).on("click", function () {
        if (flag) {
            if (downloadFile) {
                setViewDetails(true)
                setFlag(false)
                setTimeout(() => {
                    setFlag(true)
                    setDownloadFile(false)
                }, 1000);
            }
            else {
                setViewDetails(false)
            }
        }
    })

    return (
        <>
            <div
                style={{ 'min-height': '47px' }}
                className="show-task row mx-4 border-bottom "
                id={props.task._id + 'disappear'}
            >
                <div className="wrap-not-belong col-4  row">
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
                                className={props.task.complete ?
                                    "disabled show-card " : "show-card "}
                            />
                            <span className="checkmark checkmark-place"
                                onClick={(e) => { addChalalit(); changeFiledInTask(e) }}></span>

                        </label>
                        <label className='col-10 mt-2 task-name-no-belong'>
                            {props.task.name}
                        </label>
                    </label>

                    <label className="check-task col  d-flex align-items-center justify-content-end mr-2" >
                        <button className="btn-open-details "
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
                            className='selectWorkspaceInTasksNotBelong selectInTasksNotBelong text-center '
                            placeholder={selectPlaceHorder}
                            options={workspaceSelect}
                            value={indexOfWorkspace !== null ?
                                workspaceSelect[indexOfWorkspace] : 'Select...'}
                            styles={style}

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
                    <CreatableSelect
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
                        className='selectProjectInTasksNotBelong selectInTasksNotBelong'
                        options={projectSelect}
                        // value={indexOfProject !== null ?
                        //     projectSelect[indexOfProject] : 'Select...'}
                        styles={style}

                    />
                </label>
                <label className="check-task border-left  py-2  px-2 col-2">
                    {/* <div id='chooseCard' onClick={(e) => chooseCard(e)}>--</div> */}

                    <CreatableSelect
                        // isClearable
                        onChange={handleChangeCard}
                        className='selectCardInTasksNotBelong selectInTasksNotBelong'
                        theme={theme => ({
                            ...theme,
                            border: 0,
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
                        styles={style}

                    />


                </label>
                <label className="check-task border-left d-flex justify-content-around align-items-center  py-2  px-2 col">

                    {!cardId ?
                        <>
                            <button id='buttonCancleSelect' type="button" class="btn-sm" onClick={() => deleteAllSelect()}>cancle</button>
                            <button id='buttonSaveSelect' type="button" class="btn-sm saveSelect">move to</button>
                        </>
                        : null
                    }

                    {cardId ?
                        <>
                            <button id='buttonCancleSelect' type="button" class="btn-sm" onClick={() => deleteAllSelect()}>cancle</button>
                            <button id='buttonSaveSelect' type="button" class="btn-sm saveSelectActive" onClick={() => belongTask()}>move to</button>
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
                            setDownloadFile={(e) => setDownloadFile(e)}
                            viewToastMassege={props.viewToastMassege}
                            open={true} />
                    </div>
                    : null}
            </div>


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
