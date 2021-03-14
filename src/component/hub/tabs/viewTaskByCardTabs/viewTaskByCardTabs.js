import React, { useState, useEffect, useRef } from 'react'
import CardsByProject from '../../Cards/cardsByProject/cardsByProject'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import { InputGroup, FormControl, Table } from 'react-bootstrap'
import $ from 'jquery';
import Animation from '../../animation/animation'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuItem, Button } from '@material-ui/core';



function ViewTaskByCradTabs(props) {

    const [viewDetails, setViewDetails] = useState(false)
    const [showchalalit, setShowChalalit] = useState(false)
    const [detailsOrEditTask, setDetailsOrEditTask] = useState()
    const [editTaskName, setEditTaskName] = useState(props.task.name)
    const [task, setTask] = useState({
        "_id": props.task._id, "name": editTaskName, "description": props.task.description
        , "status": props.status, "dueDate": props.task.dueDate, "startDate": props.task.startDate
    })
    let actionCard = { renameCard: "rename", deleteCard: "delete", viewCard: "viewCard" };


    useEffect(() => {

    }, [props.task])
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        if (e == "viewCard")
            showDetails("viewTaskByCard")
    };
    const editTask = (event) => {
        let task1 = {
            "_id": props.task._id, "name": editTaskName, "description": props.task.description
            , "status": props.status, "dueDate": props.task.dueDate, "startDate": props.task.startDate
        }
        setTask(task1)
        props.EditTask(task);
    }
    const showDetails = (from) => {
        // setDetailsOrEditTask(from)
        setViewDetails(props.openViewDetails(task))
    }
    const closeDetails = (e) => {
        setViewDetails(false)
    }

    return (
        <>

            {/* <div className="color-task mb-2 ml-2" ></div> */}
            <Draggable draggableId={props.task._id} index={props.index}>
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="task-card mt-2 "
                            onClick={(e) => showDetails("viewTaskByCard")}>
                            <div className="container">
                                <div className="row">
                                    <div className={(props.task.status) == "in progress" ? 'color-task col-5 mt-3 ml-2  status-task-in-progress' : props.task.status == "done" ? 'color-task col-5 mt-3 ml-2  status-task-done' : 'color-task col-5 mt-3 ml-2  status-task-to-do'} ></div>
                                    {/* <button className="more col-4 mr-0">. . .</button> */}
                                    <Button className="more col-3 mr-0" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                        . . .
                                    </Button>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>Edit Task Name</MenuItem>
                                        <MenuItem onClick={(e) => handleClose(actionCard.viewCard)} >View Details</MenuItem>
                                        <MenuItem onClick={handleClose}>Delete Task</MenuItem>

                                    </Menu>
                                </div>
                                <input
                                    className="form-control col-12"
                                    value={editTaskName}
                                    onChange={(e) => setEditTaskName(e.target.value)}
                                    onBlur={(e) => editTask(e)}
                                    onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            editTask()
                                        }
                                    }}
                                ></input>
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
        tasks: state.public_reducer.tasks,
        cards: state.public_reducer.cards,
        card: state.card_reducer.card
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        EditTask: (task) => dispatch(actions.editTask(task)),
        setTaskStatus: (index) => dispatch(actions.setTaskStatus(index)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskByCradTabs)
