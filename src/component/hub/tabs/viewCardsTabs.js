
import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action'
import './viewCardsTabs.css'
// import history from '../../../history'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ViewTaskByCradTabs from './viewTaskByCardTabs/viewTaskByCardTabs'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuItem, Button, useEventCallback } from '@material-ui/core';
import $ from "jquery";

function ViewCardsTabs(props) {

    useEffect(() => {
        console.log(props.cardFromMap._id)
    }, [props.flag])

    const [flagFromSelect, setFlagFromSelect] = useState(true)
    const [addTaskInInput, setAddTaskInInput] = useState(false)
    const [inputValue, setInputValue] = useState()
    const [editCardName, setEditCardName] = useState(props.cardFromMap.name)
    const [indexToEdit, setIndexToEdit] = useState(props.index)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [a, setA] = useState()

    let actionCard = { renameCard: "rename", deleteCard: "delete" };
    const textInput = useRef(null);

    const updateInputValue = (evt) => {
        setInputValue(evt.target.value)
    }
    const newTask = () => {
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        const yyyy = today.getFullYear()
        today = (dd <= 9 ? '0' + dd : dd) + '/' + (mm <= 9 ? '0' + mm : mm) + '/' + yyyy;
        let task;
        if (inputValue) {
            task = { name: inputValue, description: "", status: "to do", startDate: today, dueDate: today, "card": props.card._id }
            props.newTask(task)
        }
        setInputValue("")
        setAddTaskInInput(!addTaskInInput)
    }

    const addTask = () => {
        setAddTaskInInput(!addTaskInInput)
        props.setCard(props.cardFromMap)
    }
    const updateCardName = (event) => {
        setEditCardName(event.target.value)

    }
    const deleteCard = () => {
        props.showToastDelete(props.cardFromMap)
    }
    const editCard = (event) => {
        let card = { "_id": props.cardFromMap._id, "name": editCardName, "project": props.project._id }
        console.log("edut-card", card)
        props.editCard(card);
    }

    const handleClick = (event) => {
        if (event == "rename") {
            textInput.current.focus()
        }
        else
            setAnchorEl(event.currentTarget)

    };

    const handleClose = (nameAction) => {
        handleClick(nameAction)
        setAnchorEl(null)
        textInput.current.focus()
        if (nameAction == "delete") {
            props.showToast({ 'type': 'Card', 'object': props.cardFromMap })
            $(`#${props.cardFromMap._id + "disappear"}`).css("display", "none")

        }
    };
    const [task, setTask] = useState(false)

    const openViewDetails = (task) => {
        setTask(task)
        props.openViewDetails(task)
    };

    return (
        <>
            <div className="col-3 mt-4" >
                <Draggable draggableId={props.cardFromMap._id} index={props.index}>
                    {provided => (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <div className="view-cards-tabs"
                                id={props.cardFromMap._id + "disappear"}>
                                <div class="card " >
                                    <div class="container">
                                        <div class="card-header row">
                                            <input
                                                ref={textInput}
                                                className="form-control col-8"
                                                value={editCardName}
                                                onChange={updateCardName}
                                                // onBlur={editCard}
                                                onKeyPress={event => {
                                                    if (event.key === 'Enter') {
                                                        editCard()
                                                    }
                                                }}
                                            >
                                            </input>
                                            <Button className="more col-2" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                                . . .
                                            </Button>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem className="rename-card" onClick={(e) => handleClose(actionCard.renameCard)}>Rename Card</MenuItem>
                                                <MenuItem onClick={(e) => handleClose(actionCard.deleteCard)}>Delete Card</MenuItem>
                                            </Menu>

                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <Droppable droppableId={props.cardFromMap._id} >
                                            {provided => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}>
                                                    {props.cardFromMap.tasks.map((task, index) => (
                                                        <ViewTaskByCradTabs openViewDetails={openViewDetails}
                                                            objectToast={(obj) => props.showToast(obj)}
                                                            key={task._id} task={task} index={index} />
                                                    ))}
                                                    {
                                                        addTaskInInput ?
                                                            <div class="mt-2">
                                                                <input type="text" class="form-control scroll-container" placeholder="Add Task" id="input-task"
                                                                    value={inputValue} onChange={updateInputValue} onKeyPress={event => {
                                                                        if (event.key === 'Enter') {
                                                                            newTask()
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                            : null
                                                    }
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                        <a href="#input-task" className="add-task-tabs mt-1" onClick={addTask}>Add Task +</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Draggable>
            </div >

        </>
    )
}
const mapStateToProps = (state) => {

    return {
        project: state.project_reducer.project,
        card: state.card_reducer.card,
        task: state.task_reducer.task,
        tasks: state.public_reducer.tasks,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCard: (card) => dispatch(actions.setCard(card)),
        newTask: (task) => dispatch(actions.newTask(task)),
        getTasksByCardId: (id) => dispatch(actions.getTasksByCardId(id)),
        editCard: (card) => dispatch(actions.editCard(card))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCardsTabs)