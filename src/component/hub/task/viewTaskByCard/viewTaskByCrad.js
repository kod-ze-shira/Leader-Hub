import React, { useState, useEffect, useRef } from 'react'
import './ViewTaskByCrad.css'
import CardsByProject from '../../Cards/cardsByProject/cardsByProject'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import { InputGroup, FormControl, Table } from 'react-bootstrap'
// import './viewTaskByCard.css'
// import './viewTaskByCrad.css'
import Select from 'react-select';

import ViewDetails from '../../viewDetails/viewDetails'
import $ from 'jquery';
import Animation from '../../animation/animation'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Toast from '../../toast/toastMessage'
import ReactTooltip from 'react-tooltip';


function ViewTaskByCrad(props) {
    const [currentIndexTask, setCurrentIndexTask] = useState("")
    const [currentIndexCard, setCurrentIndexCard] = useState("")
    const [userHasLike, setUserHasLike] = useState(false)
    const [flag, setFlag] = useState(true)

    useEffect(() => {
        setCurrentIndexTask(props.indexTask)
        setCurrentIndexCard(props.indexCard)
        let hasLike = props.task.likes.length ? props.task.likes.find(user => user === props.userId) : null
        if (hasLike)
            setUserHasLike(true)
        $(`#${props.task._id}assing-to`).css("display", "none")

    }, [props.cards, props.userId])

    useEffect(() => {
        doneStatus = props.task.complete
    }, [props.task.complete])

    useEffect(() => {

    }, [props.task.status])
    const [status, setStatus] = useState()
    const [viewCompleteTask, setViewCompleteTask] = useState(false)
    const [viewDetails, setViewDetails] = useState(false)
    const [showContactList, setShowContactList] = useState(false)
    const [detailsOrEditTask, setDetailsOrEditTask] = useState()
    const [editTaskName, setEditTaskName] = useState(props.task.name)
    let doneStatus = props.task.complete
    const [downloadFile, setDownloadFile] = useState(false)
    const [task, setTask] = useState({
        "_id": props.task._id,
        "name": props.task.name,
        "description": props.task.description
        , "status": "", "dueDate": props.task.dueDate,
        "startDate": props.task.startDate,

    })

    const changeFiledInTask = (input) => {
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        let value = input.target.value
        if (input.target.name === "complete") {
            doneStatus = !doneStatus
            value = doneStatus
            editCompleteTask()
        }
        else {
            let editTaskInRedux = { "nameFiled": input.target.name, "value": value }
            props.setTaskByFiledFromTasks(editTaskInRedux)
        }


    }
    const viewPriortyList = props.priorities ? props.priorities.map(priority => (
        {
            value: priority,
            label:
                <div className="prioprty-select">
                    <img referrerPolicy="no-referrer" src={priority.icon} />
                    <p >{priority.level}</p>
                </div>
        }
    )) : null
    const showDetails = (from) => {
        props.setTaskName(task.name)
        setDetailsOrEditTask(from)
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        setViewDetails(true)
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
                if (viewDetails) {
                    setViewDetails(false)
                    // props.EditTask(props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask])
                }
                // setViewDetails(false)
            }
        }
    })

    function openViewDetails(event) {
        showDetails("viewTaskByCard")
        event.stopPropagation();
    }
    function stopP(event) {
        event.stopPropagation();
    }
    function addChalalit() {
        if (props.task.complete === false)
            props.showRocketShip(true)
    }

    function deleteTask() {
        console.log(props.task._id)
        $(`#${props.task._id + "disappear"}`).css("display", "none")
        props.objectToast({ 'type': 'Task', 'object': props.task })

    }

    function overTask(id) {
        $(`#${id}`).css({ 'opacity': '0.7' })
    }
    function outOver(id) {
        $(`#${id}`).css({ 'opacity': '0' })
    }


    const editTask = () => {
        let temp = { ...task }
        temp.name = editTaskName
        setTask(temp)
    }
    const editCompleteTask = () => {

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
            "complete": doneStatus,
            "endDate": today,
            "likes": props.task.likes,
            "assingTo": props.task.assingTo,
            "status": props.statuses ? doneStatus ? props.statuses[2] : props.statuses[0] : null,
            "files": props.task.files
        }

        props.setTaskComplete(completeTask)//redux
        props.completeTask(completeTask)//server
        if (doneStatus) {
            props.setCountReadyTasks(true)
            props.viewToastMassege({ show: true, massege: 'Completed task!!' })
        }
        else
            props.setCountReadyTasks(false)
    }
    const editTaskNameInReduxs = (taskName) => {

        setEditTaskName(taskName)
        props.setTaskName(taskName)
        let temp = { ...task }
        temp.name = editTaskName
        setTask(temp);
    }
    const [assigneeDetails, setAssigneeDetails] = useState()//all contacts detail
    const setStateMailToContactMail = (emailMember) => {

        setAssigneeDetails(emailMember.value.email)
        console.log(assigneeDetails);
        props.assingTo(emailMember.value.email)
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        props.assingTo(emailMember.value.email)

    }
    const [priorityTask, setPriorityTask] = useState()
    const changePriority = (event) => {
        setPriorityTask(event.value)
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        console.log(priorityTask);
        let editTaskInRedux = { "nameFiled": "priority", "value": event.value }
        props.setTaskByFiledFromTasks(editTaskInRedux)
        let editTask = { "_id": props.task._id, "priority": event.value._id }
        console.log(editTask)
        props.EditTask(editTask)


    };

    const showAssigToOrCalander = (object) => {

        let e = object.e
        let name = object.name
        e.stopPropagation()
        var x = e.clientX;
        var y = e.clientY;
        var height = $(window).height();
        var width = $(window).width();
        props.setLeftContactList(x)
        props.setTopContactList(y)
        props.setWidthScreen(width)
        props.setHeightScreen(height)
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        props.viewContactList(name)
    }
    const showAssign = () => {
        if (!props.task.assingTo)
            $(`#${props.task._id}assing-to`).css("display", "inline-block")
    }
    const closeAssign = () => {
        if (!props.task.assingTo)
            $(`#${props.task._id}assing-to`).css("display", "none")
    }

    const updateLike = (e) => {

        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        props.updateLike(props.task._id)
        setUserHasLike(!userHasLike)
        e.stopPropagation()
    }


    return (
        <>
            <Draggable draggableId={props.task._id} index={props.indexTask} Draggable="false">
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div id={props.task._id + "disappear"}>
                            <div onMouseOver={(e) => overTask(props.task._id)}
                                onMouseOut={() => outOver(props.task._id)}
                                className="show-task row mx-4 border-bottom "
                            >
                                <img src={require('../../../../assets/img/dnd-icon.svg')} className="dnd-icon  " id={props.task._id}></img>
                                {/* <FontAwesomeIcon  
                                    icon={['fas', 'grip-vertical']}
                                ></FontAwesomeIcon> */}
                                <div className=" col-4">
                                    <label
                                        data-tip data-for="comlite_task"
                                        className="check-task ml-4 ">
                                        <input type="checkbox"
                                            name="complete"
                                            checked={doneStatus}
                                            value={props.task.complete}
                                            onChange={(e) => changeFiledInTask(e)}
                                        />
                                        <ReactTooltip className="tooltip-style" data-tip id="comlite_task" place="top" effect="solid">
                                            Complete Task
                                        </ReactTooltip>
                                        <span className="checkmark checkmark-place ml-1" onClick={() => addChalalit()}></span>
                                    </label>
                                    <input
                                        name="name" id="name" data-tip data-for="task_name"
                                        className={props.task.complete ? "disabled show-task mt-2" : "show-task mt-2"}
                                        value={props.task.name}
                                        onChange={(e) => changeFiledInTask(e)}
                                        onBlur={(e) => editTask()}
                                        onKeyPress={e => {
                                            if (e.key === 'Enter') {
                                                editTask()
                                            }
                                        }}
                                    >
                                    </input>
                                    <ReactTooltip className="tooltip-style" data-tip id="task_name" place="top" effect="solid">
                                        {props.task.name}
                                    </ReactTooltip>
                                </div>
                                <div onClick={(e) => updateLike(e)} className="p-2">

                                    <p className="likes-num mr-1">{props.task.likes.length > 0 ? props.task.likes.length : null}</p>
                                    <img
                                        onClick={updateLike}
                                        // src={userHasLike ? require('../../../img/heart.png') : props.task.likes.length > 0 ? require('../../../img/border-heart.svg') : require('../../../img/like-icon.png')}>
                                        src={userHasLike ? require('../../../../assets/img/heart.png') : require('../../../../assets/img/border-heart.svg')}>
                                    </img>
                                </div>
                                <label className="check-task view-details-btn">
                                    <button onClick={(e) => openViewDetails(e)}>
                                        view details
                                        <FontAwesomeIcon className="ml-2"
                                            icon={['fas', 'caret-right']}>
                                        </FontAwesomeIcon>
                                    </button>
                                </label>

                                <label className="check-task border-left    px-2 col-assignee" onMouseOver={(e) => showAssign(e)}
                                    onMouseOut={(e) => closeAssign(e)}>
                                    <div className="assing-to-list">
                                        {props.task.assignTo ? <div className="assing-to" onClick={(e) => showAssigToOrCalander({ "e": e, "name": "share" })} >
                                            {props.task.assignTo ? <img referrerPolicy="no-referrer" src={props.task.assignTo.contact.thumbnail} className="thumbnail-contact ml-2" />
                                                : <div className="logo-contact ml-2" >{props.task.assignTo.contact.name ? props.task.assignTo.contact.name[0] : null}</div>}
                                        </div> : null}
                                        {props.task.assignTo && props.task.assignTo.length > 0 ?
                                            <div className="widthofContacts col-4">
                                                {props.task.assignTo ? props.task.assignTo.map((assingTo, index) => {
                                                    if (index < 3)
                                                        return assingTo.contact.thumbnail ? <img referrerPolicy="no-referrer" src={assingTo.contact.thumbnail} className="imgTeam" />
                                                            : null
                                                }) : null}
                                                {props.task.assignTo ? <div className="imgTeam marginTeam" onClick={(e) => showAssigToOrCalander({ "e": e, "name": "share" })} >+{props.task.assignTo.length > 3 ? props.task.assignTo.length - 3 : null}</div> : null}
                                            </div> : <img
                                                className="ml-2"
                                                onClick={(e) => showAssigToOrCalander({ "e": e, "name": "share" })}
                                                src={require('../../../../assets/img/share-icon.png')}>
                                            </img>}
                                    </div>
                                </label>
                                <label className="check-task border-left px-1 col-status " >
                                    <div onClick={(e) => showAssigToOrCalander({ "e": e, "name": "status" })} className="status-task mb-2" style={{ "backgroundColor": props.task.status ? props.task.status.color : null }} >
                                        {props.task.status ? props.task.status.statusName : null}

                                    </div>
                                </label>
                                <label className="check-task border-left  col">{props.task.startDate}
                                </label>
                                <label className="check-task border-left  col">{props.task.dueDate}
                                </label>
                                <label className="check-task border-left  px-2 col-priority">{props.task.priority ?
                                    <img referrerPolicy="no-referrer" src={props.task.priority.icon} />
                                    : null}
                                </label>
                                <label className="check-task border-left  px-2 col-add-task">
                                </label>
                                {viewDetails ?
                                    <div className="closeDet" onClick={(e) => stopP(e)}>
                                        <ViewDetails showToast={deleteTask}
                                            closeViewDetails={() => setViewDetails(false)}
                                            from={detailsOrEditTask} task={props.task} open={true}
                                            setDownloadFile={(e) => setDownloadFile(e)}
                                            viewToastComplete={props.viewToastComplete}
                                            viewToastMassege={props.viewToastMassege}
                                        > </ViewDetails>
                                    </div>
                                    : null}
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>

        </>
    )
}
const mapStateToProps = (state) => {

    return {
        userId: state.public_reducer.userId,
        tasks: state.public_reducer.tasks,
        cards: state.public_reducer.cards,
        statuses: state.status_reducer.statuses,
        indexCurrentCard: state.public_reducer.indexCurrentCard,
        indexCurrentTask: state.public_reducer.indexCurrentTask,
        priorities: state.public_reducer.priorities
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCountReadyTasks: (value) => dispatch(actions.setCountReadyTasks(value)),
        updateLike: (taskId) => dispatch(actions.updateLike(taskId)),
        EditTask: (task) => dispatch(actions.editTask(task)),
        setTaskStatus: (index) => dispatch(actions.setTaskStatus(index)),
        setTaskName: (name) => dispatch(actions.setTaskNameInTaskReducer(name)),
        setTaskByFiledFromTasks: (taskDetails) => dispatch(actions.setTaskByFiledFromTasks(taskDetails)),
        setTaskComplete: (completeDetails) => dispatch(actions.setTaskComplete(completeDetails)),
        setCurrentIndexTask: (index) => dispatch(actions.saveCurrentIndexOfTaskInRedux(index)),
        setCurrentIndexCard: (index) => dispatch(actions.saveCurrentIndexOfCardInRedux(index)),
        completeTask: (task) => dispatch(actions.completeTask(task)),
        assingTo: (emailOfContact) => dispatch(actions.assingTo(emailOfContact)),
        setTopContactList: (top) => dispatch(actions.saveTopContactListInRedux(top)),
        setLeftContactList: (left) => dispatch(actions.saveLeftContactListInRedux(left)),
        setWidthScreen: (width) => dispatch(actions.saveWidthScreenInRedux(width)),
        setHeightScreen: (height) => dispatch(actions.saveHeightScreenInRedux(height)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskByCrad)