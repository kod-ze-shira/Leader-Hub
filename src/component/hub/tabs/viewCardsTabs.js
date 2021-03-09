
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action'
import './viewCardsTabs.css'
// import history from '../../../history'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ViewTaskByCradTabs from './viewTaskByCardTabs/viewTaskByCardTabs'
// import ViewDetails from '../../viewDetails/viewDetails'
// import ToastDelete from '../../toastDelete/toastDelete1'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuItem, Button } from '@material-ui/core';
import $ from "jquery";
function ViewCardsTabs(props) {
    useEffect(() => {

    }, [props.flag])

    const [flag, setFlag] = useState(false)
    const [flagFromSelect, setFlagFromSelect] = useState(true)
    const [cardId, setCardId] = useState("")
    const [viewDetails, setViewDetails] = useState(false)
    const [addTaskInInput, setAddTaskInInput] = useState(false)
    const [inputValue, setInputValue] = useState()
    const [editCardName, setEditCardName] = useState(props.cardFromMap.name)
    const [indexToEdit, setIndexToEdit] = useState(props.index)
    const [anchorEl, setAnchorEl] = React.useState(null);



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
    const showDetails =
        (event) => {
            setViewDetails(true)
            setCardId(props.cardFromMap._id)
            // props.setTask(props.task)
        }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);


    };

    // $('.more').click(function () {
    //     $(`#${indexToEdit}`).focus();
    // });
    const handleClose = () => {
        setAnchorEl(null);
        setIndexToEdit(indexToEdit)
        $('.more').click(function () {
            $(`#${indexToEdit}`).focus();
        });
        // $(`#${indexToEdit}`).focus();
    };

    return (
        <>
            <div className="col-3 mt-4">
                <Draggable draggableId={props.cardFromMap._id} index={props.index}>
                    {provided => (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <div className="view-cards-tabs">
                                <div class="card " >
                                    <div class="container">
                                        <div class="card-header row">
                                            <input
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
                                                <MenuItem className="rename-card" onClick={handleClose}>Rename Card</MenuItem>
                                                <MenuItem onClick={handleClose}>Delete Card</MenuItem>
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
                                                        <ViewTaskByCradTabs key={task._id} task={task} index={index} />
                                                    ))}
                                                    {
                                                        addTaskInInput ?
                                                            <div class="">
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
                                        <p className="add-task-tabs mt-1" onClick={addTask}>Add Task +</p>
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