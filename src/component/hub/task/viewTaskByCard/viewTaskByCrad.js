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
import Toast from '../../toast/toast'

function ViewTaskByCrad(props) {
    const [currentIndexTask, setCurrentIndexTask] = useState("")
    const [currentIndexCard, setCurrentIndexCard] = useState("")

    useEffect(() => {
        setCurrentIndexTask(props.indexTask)
        setCurrentIndexCard(props.indexCard)
        props.getAllStatusesTaskForWorkspace()


    }, [
        props.cards])
    useEffect(() => {
        setDoneStatus(props.task.complete)
    }, [props.task.complete])
    const [status, setStatus] = useState()
    const [viewCompleteTask, setViewCompleteTask] = useState(false)
    const [viewDetails, setViewDetails] = useState(false)
    const [showchalalit, setShowChalalit] = useState(false)
    const [detailsOrEditTask, setDetailsOrEditTask] = useState()
    const [editTaskName, setEditTaskName] = useState(props.task.name)
    const [doneStatus, setDoneStatus] = useState(props.task.complete)

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
        let editTaskInRedux = { "nameFiled": input.target.name, "value": value }
        props.setTaskByFiledFromTasks(editTaskInRedux)
        if (input.target.name == "complete")
            editCompleteTask()

        console.log("task", props.task.complete);

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
            "complete": true,
            "endDate": today,
            "status": props.statuses[2],
            // "card": props.task.card
        }
        props.setTaskComplete(completeTask)
        props.completeTask(task)
        setViewCompleteTask(true)
    }
    const editTaskNameInReduxs = (taskName) => {

        setEditTaskName(taskName)
        props.setTaskName(taskName)
        let temp = { ...task }
        temp.name = editTaskName
        setTask(temp);
    }
    return (
        <>
            <Draggable draggableId={props.task._id} index={props.index}>
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div id={props.task._id + "disappear"}>
                            <div onMouseOver={(e) => overTask(props.task._id)}
                                onMouseOut={() => outOver(props.task._id)}
                                className="show-task row mx-4 border-bottom"
                            >
                                <FontAwesomeIcon className="dnd-icon mt-2" id={props.task._id} title="Drag and Drop"
                                    icon={['fas', 'grip-vertical']}
                                ></FontAwesomeIcon>
                                <div className=" col-5">
                                    <label
                                        title="Complete Task"
                                        className="check-task py-2 ">
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
                                        className={props.task.complete ? "disabled show-card py-2" : "show-card py-2"}
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
                                <label className="check-task py-2   view-details-btn" title="View Details">
                                    <button onClick={(e) => openViewDetails(e)}>view details +</button>
                                </label>
                                <label className="check-task border-left  py-2  px-2 col " >
                                    <div className="status-task" style={{ "backgroundColor": props.task.status.color }} >
                                        {props.task.status.statusName}
                                    </div>
                                </label>
                                <label className="check-task border-left  py-2  px-2 col">{props.task.startDate}
                                </label>
                                <label className="check-task border-left  py-2  px-2 col">{props.task.dueDate}
                                </label>
                                <label className="check-task border-left  py-2  px-2 col-add-task">
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
        completeTask: (task) => dispatch(actions.completeTask(task))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskByCrad)
