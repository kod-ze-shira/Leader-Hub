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


function ViewTaskByCrad(props) {

    const [viewDetails, setViewDetails] = useState(false)
    const [showchalalit, setShowChalalit] = useState(false)
    const [detailsOrEditTask, setDetailsOrEditTask] = useState()
    const [editTaskName, setEditTaskName] = useState(props.task.name)
    const [task, setTask] = useState({
        "_id": props.task._id, "name": editTaskName, "description": props.task.description
        , "status": props.status, "dueDate": props.task.dueDate, "startDate": props.task.startDate
    })
    useEffect(() => {

    }, [props.task])



    const showDetails = (from) => {
        setDetailsOrEditTask(from)
        setViewDetails(true)
    }
    const closeDetails = (e) => {
        setViewDetails(false)
    }

    function addChalalit() {
        let object, iCard, iTask
        for (iCard = 0; iCard < props.cards.length; iCard++) {
            if (props.cards[iCard]._id == props.task.card) {
                break
            }
        }
        for (iTask = 0; iTask < props.cards[iCard].tasks.length; iTask++) {
            if (props.cards[iCard].tasks[iTask]._id == props.task._id) {
                break
            }
        }
        object = [iCard, iTask]
        props.setTaskStatus(object)
        setShowChalalit(true)
    }
    function deleteTask() {
        props.objectToast(props.task)
    }
    function overTask(id) {
        $(`#${id}`).css({ 'opacity': '0.5' })
    }
    function outOver(id) {
        $(`#${id}`).css({ 'opacity': '0' })
    }
    const editTask = (event) => {
        let task1 = {
            "_id": props.task._id, "name": editTaskName, "description": props.task.description
            , "status": props.status, "dueDate": props.task.dueDate, "startDate": props.task.startDate
        }
        setTask(task1)
        console.log("edut-card", task)
        props.EditTask(task);
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
                        <div onMouseOver={(e) => overTask(props.task._id)}
                            onMouseOut={() => outOver(props.task._id)}
                            className="show-task row mx-4 border-bottom"
                        >

                            <FontAwesomeIcon className="dnd-icon mt-2 " id={props.task._id}
                                icon={['fas', 'grip-vertical']}
                            ></FontAwesomeIcon>
                            <label
                                className="check-task ml-3 py-2 pl-5 col-1 ">
                                <input type="checkbox" />
                                <span className="checkmark " onClick={() => addChalalit()}></span>
                            </label>
                            <input
                                className="show-card col-3"
                                value={editTaskName}
                                onChange={(e) => setEditTaskName(e.target.value)}
                                onBlur={(e) => editTask(e)}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        editTask()
                                    }
                                }}
                            ></input>
                            <label className="check-task py-2  px-2 col-3 ">
                                <button onClick={(e) => showDetails("viewTaskByCard")}>view details +</button>
                            </label>
                            <label className="check-task border-left  py-2  px-2 col ">{props.task.status}
                            </label>
                            <label className="check-task border-left  py-2  px-2 col " >
                                <div className={(props.task.status) == "in progress" ? 'status-task-in-progress' : props.task.status == "done" ? 'status-task-done' : 'status-task-to-do'}>{props.task.status}</div>
                            </label>
                            <label className="check-task border-left  py-2  px-2 col">{props.task.dueDate}

                            </label>


                            {viewDetails ?
                                <div className="closeDet" >
                                    <ViewDetails showToast={deleteTask} closeViewDetails={() => setViewDetails(false)}
                                        from={detailsOrEditTask} task={task} open={true}> </ViewDetails>
                                </div>
                                : null}
                        </div>
                    </div>
                )}
            </Draggable>

            { showchalalit ? <div className="animation"><Animation /> </div> : null}

        </>
    )
}
const mapStateToProps = (state) => {

    return {
        tasks: state.public_reducer.tasks,
        cards: state.public_reducer.cards
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        EditTask: (task) => dispatch(actions.editTask(task)),
        setTaskStatus: (index) => dispatch(actions.setTaskStatus(index)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskByCrad)
