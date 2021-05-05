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
import ReactTooltip from 'react-tooltip';
import title from '../../../../Data/title.json'


function ViewTaskByCradTabs(props) {
    const [detailsOrEditTask, setDetailsOrEditTask] = useState()
    // const [editTaskName, setEditTaskName] = useState(props.cards[props.indexCard].tasks[props.indexTask].name)
    const [editTaskName, setEditTaskName] = useState(props.task.name)
    const [currentIndexTask, setCurrentIndexTask] = useState("")
    const [currentIndexCard, setCurrentIndexCard] = useState("")
    const [task, setTask] = useState({
        "milestones": props.task.milestones,
        "_id": props.task._id, "name": editTaskName, "description": props.task.description
        , "status": props.status, "dueDate": props.task.dueDate, "startDate": props.task.startDate
    })
    let actionCard = { renameCard: "rename", deleteCard: "delete", viewCard: "viewCard" };


    useEffect(() => {
        setCurrentIndexTask(props.indexTask)
        setCurrentIndexCard(props.indexCard)
        // if (props.cards[props.indexCurrentCard])
        props.getAllStatusesTaskForWorkspace()

    }, [props.cards])

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();

    };

    const handleClose = (e, event) => {

        setAnchorEl(null);
        if (e) {
            console.log(e);
            if (e == "viewCard") {
                console.log(props.task)
                props.openViewDetails(props.task)
                event.stopPropagation()
            }
            if (e == "delete") {
                $(`#${props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]._id + "disappear"}`).css("display", "none")
                props.objectToast({ 'type': 'Task', 'object': props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask] })
            }
        }
        else
            e.stopPropagation()
    };
    const editTask = (event) => {
        let task1 = {
            "milestones": props.task.milestones, "_id": props.task._id, "name": editTaskName, "description": props.task.description
            , "status": props.status, "dueDate": props.task.dueDate, "startDate": props.task.startDate
        }
        setTask(task1)
        props.EditTask(task);
    }
    const showDetails = (event) => {

        if (anchorEl == null) {
            props.setCurrentIndexTask(currentIndexTask)
            props.setCurrentIndexCard(currentIndexCard)
            props.openViewDetails(props.task)
            event.stopPropagation()
        }
    }
    const changeFiledInTask = (input) => {
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        let editTaskInRedux = { "nameFiled": input.target.name, "value": input.target.value, "task": props.task }
        props.setTaskByFiledFromTasks(editTaskInRedux)
    }

    return (
        <>

            {/* <div className="color-task mb-2 ml-2" ></div> */}
            <Draggable draggableId={props.task._id} index={props.indexTask}>
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="task-card mt-2 "
                            onClick={(e) => showDetails(e)}
                            id={props.task._id + "disappear"}>
                            <div className="container">
                                <div className="row">
                                    {props.task.status ? <div title={props.task.status.statusName} className="color-task col-4 mt-3 ml-2" style={{ "backgroundColor": props.task.status.color }}></div> : null}
                                    {/* <button className="more col-4 mr-0">. . .</button> */}
                                    <Button className="more col-3 mr-0 more-task"
                                        data-tip data-for="more_a"
                                        aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                        . . .
                                    </Button>
                                    <ReactTooltip data-tip id="more_a" place="top" effect="solid">
                                        {title.title_more_actions}
                                    </ReactTooltip>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>Edit Task Name</MenuItem>
                                        <MenuItem onClick={(e) => handleClose(actionCard.viewCard, e)} >View Details</MenuItem>
                                        <MenuItem onClick={(e) => handleClose(actionCard.deleteCard, e)}>Delete Task</MenuItem>
                                    </Menu>
                                </div>
                                {/* <span>{props.task._id}</span> */}
                                <input
                                    className="form-control col-12"
                                    value={props.task.name}
                                    name="name"
                                    onChange={(e) => changeFiledInTask(e)}
                                    onClick={(e) => e.stopPropagation()}
                                    // onBlur={(e) => editTask(e)}
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
        card: state.card_reducer.card,
        indexCurrentCard: state.public_reducer.indexCurrentCard,
        indexCurrentTask: state.public_reducer.indexCurrentTask
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        EditTask: (task) => dispatch(actions.editTask(task)),
        setTaskStatus: (index) => dispatch(actions.setTaskStatus(index)),
        setTaskName: (name) => dispatch(actions.setTaskNameInTaskReducer(name)),
        setTaskByFiledFromTasks: (taskDetails) => dispatch(actions.setTaskByFiledFromTasks(taskDetails)),
        setCurrentIndexTask: (index) => dispatch(actions.saveCurrentIndexOfTaskInRedux(index)),
        setCurrentIndexCard: (index) => dispatch(actions.saveCurrentIndexOfCardInRedux(index)),
        getAllStatusesTaskForWorkspace: () => dispatch(actions.getAllStatusesTaskForWorkspace()),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskByCradTabs)
