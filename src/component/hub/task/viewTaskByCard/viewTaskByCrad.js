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


function ViewTaskByCrad(props) {
    const [currentIndexTask, setCurrentIndexTask] = useState("")
    const [currentIndexCard, setCurrentIndexCard] = useState("")

    useEffect(() => {
        setCurrentIndexTask(props.indexTask)
        setCurrentIndexCard(props.indexCard)
        let a = props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask];
        console.log(a)


    }, [
        props.cards])
    const [status, setStatus] = useState()

    const [viewDetails, setViewDetails] = useState(false)
    const [showchalalit, setShowChalalit] = useState(false)
    const [detailsOrEditTask, setDetailsOrEditTask] = useState()
    const [editTaskName, setEditTaskName] = useState(props.task.name)
    const [doneStatus, setDoneStatus] = useState(props.task.complete)

    const [task, setTask] = useState({
        "_id": props.task._id, "name": props.task.name, "description": props.task.description
        , "status": "", "dueDate": props.task.dueDate, "startDate": props.task.startDate
    })

    const changeFiledInTask = (input) => {
        debugger
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        let value = input.target.value

        if (input.target.name == "complete") {
            setDoneStatus(!props.task.complete)
            value = !doneStatus
            console.log(value);
            // let status = props.task.status
            // status = props.statuses[2]
        }
        let editTaskInRedux = { "nameFiled": input.target.name, "value": value }
        props.setTaskByFiledFromTasks(editTaskInRedux)

        console.log("task", props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].complete);

    }
    const showDetails = (from) => {
        props.setTaskName(task.name)
        setDetailsOrEditTask(from)
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        setViewDetails(true)
    }

    function addChalalit() {
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        const yyyy = today.getFullYear()
        today = (dd <= 9 ? '0' + dd : dd) + '/' + (mm <= 9 ? '0' + mm : mm) + '/' + yyyy
        // props.task.status=props.statuses[2]
        // console.log(props.task.status);
        // setTask(task.status = "done", task.endDate = today)
        props.EditTask(props.task)
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

    // useEffect(() => {
    //     props.EditTask(task);
    // }, [task])

    const editTask = () => {
        let temp = { ...task }
        temp.name = editTaskName
        setTask(temp)
    }
    const editCompleteTask = () => {
        let temp = { ...task }
        temp.complete = editCompleteTask
        setTask(temp)
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
                                <FontAwesomeIcon className="dnd-icon mt-2" id={props.task._id}
                                    icon={['fas', 'grip-vertical']}
                                ></FontAwesomeIcon>
                                <div className=" col-5">
                                    <label
                                        className="check-task py-2 ">
                                        <input type="checkbox"
                                            name="complete"
                                            checked={doneStatus}
                                            value={props.task.complete}
                                            onChange={(e) => changeFiledInTask(e)}
                                        />
                                        <span className="checkmark checkmark-place ml-1" onClick={() => addChalalit()}></span>
                                    </label>
                                    <input
                                        name="name" id="name"
                                        className="show-card col-10 py-2"
                                        value={props.task.name}
                                        onChange={(e) => changeFiledInTask(e)}
                                        // onChange={(e) => editTaskNameInReduxs(e.target.value)}
                                        onBlur={(e) => editTask()}
                                        onKeyPress={e => {
                                            if (e.key === 'Enter') {
                                                editTask()
                                            }
                                        }}
                                    >

                                    </input>
                                </div>
                                <label className="check-task py-2   view-details-btn">
                                    <button onClick={(e) => showDetails("viewTaskByCard")}>view details +</button>
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
                                    <div className="closeDet" >
                                        <ViewDetails showToast={deleteTask} closeViewDetails={() => setViewDetails(false)}
                                            from={detailsOrEditTask} task={props.task} open={true}> </ViewDetails>
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
        setCurrentIndexTask: (index) => dispatch(actions.saveCurrentIndexOfTaskInRedux(index)),
        setCurrentIndexCard: (index) => dispatch(actions.saveCurrentIndexOfCardInRedux(index))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskByCrad)
