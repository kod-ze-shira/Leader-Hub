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

    useEffect(() => {
        setCurrentIndexTask(props.indexTask)
        setCurrentIndexCard(props.indexCard)
    }, [
        props.cards])
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
    const [task, setTask] = useState({
        "_id": props.task._id,
        "name": props.task.name,
        "description": props.task.description
        , "status": "", "dueDate": props.task.dueDate,
        "startDate": props.task.startDate,

    })
    const unCompleteTask = {
        "_id": props.task._id,
        "name": props.task.name,
        "description": props.task.description,
        "dueDate": props.task.dueDate,
        "startDate": props.task.startDate,
        "complete": false,
        "status": props.statuses[0],
        // "card": props.task.card
    }
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
    $(window).click(function () {
        setViewDetails(false)
    });

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
        $(`#${id}`).css({ 'opacity': '0.3' })
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
            "status": doneStatus ? props.statuses[2] : props.statuses[0],
            // "card": props.task.card
        }
        props.setTaskComplete(completeTask)//redux
        props.completeTask(completeTask)//server
        if (doneStatus)
            props.viewToastComplete(true)
    }
    const editTaskNameInReduxs = (taskName) => {

        setEditTaskName(taskName)
        props.setTaskName(taskName)
        let temp = { ...task }
        temp.name = editTaskName
        setTask(temp);
    }
    const [disabledSelectPermission, setDisabledSelectPermission] = useState('false')
    const [assigneeDetails, setAssigneeDetails] = useState()//all contacts detail

    const setStateMailToContactMail = (emailMember) => {
        debugger

        setAssigneeDetails(emailMember.value.email)
        console.log(assigneeDetails);
        props.assingTo(emailMember.value.email)
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        let editTaskInRedux = { "nameFiled": "assingTo", "value": emailMember.value }
        props.setTaskByFiledFromTasks(editTaskInRedux)
        console.log(props.task.assingTo);

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
                                <FontAwesomeIcon className="dnd-icon " id={props.task._id} title="Drag and Drop"
                                    icon={['fas', 'grip-vertical']}
                                ></FontAwesomeIcon>
                                <div className=" col-5">
                                    <label
                                        title="Complete Task"
                                        className="check-task  ">
                                        <input type="checkbox"
                                            name="complete"
                                            checked={doneStatus}
                                            value={props.task.complete}
                                            onChange={(e) => changeFiledInTask(e)}
                                        // onClick={(e) => editCompleteTask(e)}
                                        />
                                        <span className="checkmark checkmark-place ml-1" onClick={() => addChalalit()}></span>
                                    </label>
                                    <input
                                        name="name" id="name" title={props.task.name}
                                        className={props.task.complete ? "disabled show-card mt-2" : "show-card mt-2"}
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

                                <label className="check-task    view-details-btn" title="View Details">
                                    <button onClick={(e) => openViewDetails(e)}>view details +</button>
                                </label>

                                <label className="check-task border-left    px-2 col">
                                    <DynamicSelect setContactEmail={setStateMailToContactMail} options={'contacts'} />
                                </label>
                                <label className="check-task border-left    px-2 col " >
                                    <div className="status-task" style={{ "backgroundColor": props.task.status ? props.task.status.color : null }} >
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
                                        > </ViewDetails>
                                    </div>
                                    : null}
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
            {/* {viewCompleteTask ? <Toast></Toast> : null} */}
            {showchalalit ? <div className="animation"><Animation /> </div> : null}
            {/* {showContactList ? <DynamicSelect options={'contacts'} /> : null} */}

        </>
    )
}
const mapStateToProps = (state) => {

    return {
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
        EditTask: (task) => dispatch(actions.editTask(task)),
        setTaskStatus: (index) => dispatch(actions.setTaskStatus(index)),
        setTaskName: (name) => dispatch(actions.setTaskNameInTaskReducer(name)),
        getAllStatusesTaskForWorkspace: () => dispatch(actions.getAllStatusesTaskForWorkspace()),
        setTaskByFiledFromTasks: (taskDetails) => dispatch(actions.setTaskByFiledFromTasks(taskDetails)),
        setTaskComplete: (completeDetails) => dispatch(actions.setTaskComplete(completeDetails)),
        setCurrentIndexTask: (index) => dispatch(actions.saveCurrentIndexOfTaskInRedux(index)),
        setCurrentIndexCard: (index) => dispatch(actions.saveCurrentIndexOfCardInRedux(index)),
        completeTask: (task) => dispatch(actions.completeTask(task)),
        assingTo: (emailOfContact) => dispatch(actions.assingTo(emailOfContact))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskByCrad)
