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
    const [currentIndexTask,setCurrentIndexTask]=useState("")
    const [currentIndexCard,setCurrentIndexCard]=useState("")
    useEffect(() => {
        setCurrentIndexTask(props.indexTask)
        setCurrentIndexCard(props.indexCard)

        console.log(props);
        // props.getAllStatusesTaskForUser();
        // console.log("statuses" + props.statuses)
        // if (props.task.status == props.statuses._id)
        //     if (props.statuses.length > 0) {
        //         let s = props.statuses.find(status => status._id == props.task.status)
        //         setStatus(s.statusName)
        //         console.log(status);

        //     }

    }, [
        // props.task, 
        // props.statuses,
        props.cards])
    const [status, setStatus] = useState()

    console.log(status)
    const [viewDetails, setViewDetails] = useState(false)
    const [showchalalit, setShowChalalit] = useState(false)
    const [detailsOrEditTask, setDetailsOrEditTask] = useState()
    const [editTaskName, setEditTaskName] = useState(props.task.name)
    const [task, setTask] = useState({
        "_id": props.task._id, "name": props.task.name, "description": props.task.description
        , "status": status, "dueDate": props.task.dueDate, "startDate": props.task.startDate
    })
    // const findStatusById = () => {
    //     let temp = { ...task }
    //     props.statuses.map(status => {
    //         if (status._id == task.status)
    //             temp.status = status
    //         setTask(temp);
    //     })
    // }

    const changeFiledInTask = (input) => {
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        let editTaskInRedux = { "nameFiled": input.target.name, "value": input.target.value }
        props.setTaskByFiledFromTasks(editTaskInRedux)
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
        setTask(task.status = "done", task.endDate = today)
        // findStatusById()
        props.EditTask(task)
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

        // props.EditTask(task);

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
                                        <input type="checkbox" />
                                        <span className="checkmark checkmark-place ml-1" onClick={() => addChalalit()}></span>
                                    </label>
                                    <input
                                        name="name" id="name"
                                        className="show-card py-2"
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
                                {/* <label className="check-task py-2  px-2 col-3 view-details-btn">
                                    <button onClick={(e) => showDetails("viewTaskByCard")}>view details +</button>
                                </label> */}
                                <label className="check-task py-2   view-details-btn">
                                    <button onClick={(e) => showDetails("viewTaskByCard")}>view details +</button>
                                </label>
                                {/* <label className="check-task border-left  py-2  px-2 col ">{status} */}
                                {/* </label> */}
                                <label className="check-task border-left  py-2  px-2 col " >
                                    <div className={(status) == "in progress" ? 'status-task-in-progress' : status == "done" ? 'status-task-done' : 'status-task-to-do'}>To do</div>
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
        statuses: state.status_reducer.statuses
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        EditTask: (task) => dispatch(actions.editTask(task)),
        setTaskStatus: (index) => dispatch(actions.setTaskStatus(index)),
        setTaskName: (name) => dispatch(actions.setTaskNameInTaskReducer(name)),
        getAllStatusesTaskForUser: () => dispatch(actions.getAllStatusesTaskForUser()),
        setTaskByFiledFromTasks: (taskDetails) => dispatch(actions.setTaskByFiledFromTasks(taskDetails)),
        setCurrentIndexTask:(index)=>dispatch(actions.saveCurrentIndexOfTaskInRedux(index)),
        setCurrentIndexCard:(index)=>dispatch(actions.saveCurrentIndexOfCardInRedux(index))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskByCrad)
