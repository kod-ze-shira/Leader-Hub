import React, { useState, useEffect, useRef } from 'react'
import './ViewTaskByCrad.css'
import CardsByProject from '../../Cards/cardsByProject/cardsByProject'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import { InputGroup, FormControl, Table } from 'react-bootstrap'
// import './viewTaskByCard.css'
// import './viewTaskByCrad.css'
import ViewDetails from '../../viewDetails/viewDetails'
import $ from 'jquery';
import Animation from '../../animation/animation'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import task_reducer from '../../../../redux/Reducers/task_reducer';
import Toast from '../../toast/toastTaskCompleted'
import DynamicSelect from '../../team/dynamicSelect';

function ViewTaskByCrad(props) {
    const [currentIndexTask, setCurrentIndexTask] = useState("")
    const [currentIndexCard, setCurrentIndexCard] = useState("")
    const [userHasLike, setUserHasLike] = useState(false)
    const [flag, setFlag] = useState(true)

    useEffect(() => {
        setCurrentIndexTask(props.indexTask)
        setCurrentIndexCard(props.indexCard)
        let hasLike = props.task.likes.length ? props.task.likes.find(user => user == props.userId) : null
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
    const [showchalalit, setShowChalalit] = useState(false)
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
        if (input.target.name == "complete") {
            doneStatus = !doneStatus
            value = doneStatus
            editCompleteTask()

        }
        else {
            let editTaskInRedux = { "nameFiled": input.target.name, "value": value }
            props.setTaskByFiledFromTasks(editTaskInRedux)
        }


    }
    const showDetails = (from) => {
        props.setTaskName(task.name)
        setDetailsOrEditTask(from)
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        setViewDetails(true)
    }
    
    $(window).on("click",function () {
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

    function openViewDetails(event) {
        showDetails("viewTaskByCard")
        event.stopPropagation();
    }
    function stopP(event) {
        event.stopPropagation();
    }
    function addChalalit() {
        if (props.task.complete == false)
            setShowChalalit(true)
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
        }

        props.setTaskComplete(completeTask)//redux
        props.completeTask(completeTask)//server
        if (doneStatus) {
            props.viewToastComplete(true)
        }
    }
    const editTaskNameInReduxs = (taskName) => {

        setEditTaskName(taskName)
        props.setTaskName(taskName)
        let temp = { ...task }
        temp.name = editTaskName
        setTask(temp);
    }
    const [assigneeDetails, setAssigneeDetails] = useState()//all contacts detail
    let contact
    const setStateMailToContactMail = (emailMember) => {

        setAssigneeDetails(emailMember.value.email)
        console.log(assigneeDetails);
        props.assingTo(emailMember.value.email)
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        props.assingTo(emailMember.value.email)

    }

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
                                <img src={require('../../../img/dnd-icon.svg')} className="dnd-icon pl-3 " id={props.task._id}></img>
                                {/* <FontAwesomeIcon  title="Drag and Drop"
                                    icon={['fas', 'grip-vertical']}
                                ></FontAwesomeIcon> */}
                                <div className=" col-5">
                                    <label
                                        title="Complete Task"
                                        className="check-task ml-4 ">
                                        <input type="checkbox"
                                            name="complete"
                                            checked={doneStatus}
                                            value={props.task.complete}
                                            onChange={(e) => changeFiledInTask(e)}
                                        />
                                        <span className="checkmark checkmark-place ml-1" onClick={() => addChalalit()}></span>
                                    </label>
                                    <input
                                        name="name" id="name" title={props.task.name}
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
                                </div>
                                <div onClick={(e) => updateLike(e)} className="p-3">
                                    <p className="likes-num mr-1">{props.task.likes.length}</p>
                                    <img
                                        onClick={updateLike}
                                        src={userHasLike ? require('../../../img/heart.png') : require('../../../img/border-heart.svg')}>
                                    </img>
                                </div>
                                <label className="check-task view-details-btn" title="View Details">
                                    <button onClick={(e) => openViewDetails(e)}>view details +</button>
                                </label>

                                <label className="check-task border-left    px-2 col" onMouseOver={(e) => showAssign(e)}
                                    onMouseOut={(e) => closeAssign(e)}>
                                    <div className="assing-to-list">
                                        {props.task.assingTo ? <div className="assing-to" onClick={(e) => showAssigToOrCalander({ "e": e, "name": "share" })} >
                                            {props.task.assingTo ? <img referrerpolicy="no-referrer" src={props.task.assingTo ? props.task.assingTo.contact.thumbnail : null} className="thumbnail-contact ml-2" />
                                                : <div className="logo-contact ml-2" >{props.task.assingTo.contact.name ? props.task.assingTo.contact.name[0] : null}</div>}
                                        </div> : null}
                                        {!props.task.assingTo ? <img
                                            // id={`${props.task._id}assing-to`}
                                            className="ml-2 assing-to-icon"
                                            onClick={(e) => showAssigToOrCalander({ "e": e, "name": "share" })}
                                            src={require('../../../img/share-icon.png')}>
                                        </img> : null}
                                    </div>
                                    {/* <DynamicSelect
                                        value={props.task.assingTo ? props.task.assingTo.contact : null}
                                        setContactEmail={setStateMailToContactMail} options={'contacts'} /> */}
                                </label>
                                <label className="check-task border-left    px-2 col " >
                                    <div className="status-task mb-2" style={{ "backgroundColor": props.task.status ? props.task.status.color : null }} >
                                        {props.task.status ? props.task.status.statusName : null}
                                    </div>
                                </label>
                                <label className="check-task border-left  px-2 col">{props.task.startDate}
                                </label>
                                <label className="check-task border-left  px-2 col">{props.task.dueDate}
                                </label>
                                <label className="check-task border-left  px-2 col-add-task">
                                </label>
                                {viewDetails ?
                                    <div className="closeDet" onClick={(e) => stopP(e)}>
                                        <ViewDetails showToast={deleteTask}
                                            closeViewDetails={() => setViewDetails(false)}
                                            from={detailsOrEditTask} task={props.task} open={true}
                                            setDownloadFile={(e) => setDownloadFile(e) }
                                        > </ViewDetails>
                                    </div>
                                    : null}
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
            {showchalalit ? <div className="animation"><Animation /> </div> : null}

        </>
    )
}
const mapStateToProps = (state) => {

    return {
        userId: state.public_reducer.userId,
        tasks: state.public_reducer.tasks,
        taskReducer: state.task_reducer.task,
        cards: state.public_reducer.cards,
        statuses: state.status_reducer.statuses,
        indexCurrentCard: state.public_reducer.indexCurrentCard,
        indexCurrentTask: state.public_reducer.indexCurrentTask
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
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
