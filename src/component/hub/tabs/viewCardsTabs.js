
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
import ReactTooltip from 'react-tooltip';
import title from '../../../Data/title.json'

function ViewCardsTabs(props) {


    useEffect(() => {
        
        if (props.cards[props.indexCurrentCard])
            if (props.openInputTask && props.cards[props.indexCurrentCard]._id == props.cardFromMap._id) {
                document.getElementById("add-new-card").focus();
                setAddTaskInInput(true)
                props.setCard(props.cardFromMap)
            }
    }, [props.flag, props.openInputTask])

    const [flagFromSelect, setFlagFromSelect] = useState(true)
    const [addTaskInInput, setAddTaskInInput] = useState(false)
    const [inputValue, setInputValue] = useState()
    const [editCardName, setEditCardName] = useState(props.cardFromMap.name)
    const [indexToEdit, setIndexToEdit] = useState(props.index)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [a, setA] = useState()

    let actionCard = { renameCard: "rename", deleteCard: "delete" };
    const textInput = useRef();

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
            // let status = props.statuses[0]
            task = {
                name: inputValue, description: "",
                // status: status,
                startDate: today, dueDate: today, "card": props.card._id
            }
            props.newTask(task)
        }
        setInputValue("")
        // setAddTaskInInput(!addTaskInInput)
    }

    const addTask = (e) => {
        setAddTaskInInput(!addTaskInInput)
        props.setCard(props.cardFromMap)
        e.stopPropagation();
    }
    const updateCardName = (event) => {
        setEditCardName(event.target.value)
    }
    const editCard = (event) => {
        let card = { "_id": props.cardFromMap._id, "name": editCardName, "project": props.project._id }
        console.log("edut-card", card)
        props.editCard(card);
    }

    const handleClick = (event) => {
        textInput.current.focus()

        if (event == "rename") {
            console.log(textInput.current)
            // textInput.current.focus()
        }
        else
            setAnchorEl(event.currentTarget)
    };


    const handleClose = (nameAction) => {
        handleClick(nameAction)
        setAnchorEl(null)
        // textInput.current.focus()
        if (nameAction == "delete") {
            props.showToast({ 'type': 'Card', 'object': props.cardFromMap })
            $(`#${props.cardFromMap._id}`).css("display", "none")
        }
    }

    function enterK(event) {
        if (event.key === 'Enter') {
            editCard()
            document.getElementById("input-card-name").blur();
        }

    }
    const [task, setTask] = useState(false)

    const openViewDetails = (task) => {
        setTask(task)
        props.openViewDetails(task)

    };

    $(window).click(function () {
        setAddTaskInInput(false)
    })

    return (
        <>
            <div className="card-width px-3 mt-4" id={props.cards[props.indexCard]._id}>
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
                                                id="input-card-name"
                                                ref={textInput}
                                                className="form-control pl-4 col-10"
                                                value={editCardName}
                                                onChange={updateCardName}
                                                onBlur={() => editCard()}
                                                title={editCardName}
                                                onKeyPress={event => {
                                                    enterK(event)
                                                }}
                                            >
                                            </input>
                                            <p>{props.cardFromMap.index}</p>
                                            <Button className="more col-2" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} data-tip data-for="more_a"
                                            >
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
                                                <MenuItem className="rename-card" onClick={(e) => handleClose(actionCard.renameCard)}>Rename Card</MenuItem>
                                                <MenuItem onClick={(e) => handleClose(actionCard.deleteCard)}>Delete Card</MenuItem>
                                            </Menu>

                                        </div>
                                    </div>
                                    <div class="card-body allTaskInCard">
                                        <Droppable droppableId={props.cardFromMap._id} >
                                            {provided => (
                                                <div className="mt-0"
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps} >
                                                    {props.cardFromMap.tasks.map((task, index) => (
                                                        <ViewTaskByCradTabs

                                                            openViewDetails={openViewDetails}
                                                            objectToast={(obj) => props.showToast(obj)}
                                                            task={props.cards[props.indexCard].tasks[index]}
                                                            indexCard={props.indexCard}
                                                            indexTask={index}
                                                            viewToastComplete={props.viewToastComplete} />
                                                    ))}

                                                    {
                                                        addTaskInInput ?
                                                            <div class="mt-2">
                                                                <input
                                                                    autoFocus="true"
                                                                    type="text"
                                                                    class="form-control" placeholder="Add Task"
                                                                    id="input-task"
                                                                    value={inputValue}
                                                                    // onMouseLeave={(e)=>setAddTaskInInput(false)}
                                                                    onChange={updateInputValue} onKeyPress={event => {
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
                                        <a data-tip data-for="add_t"
                                            className="add-task-tabs mt-1 "
                                            onClick={(e) => addTask(e)}>Add Task +</a>

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
        cards: state.public_reducer.cards,
        card: state.card_reducer.card,
        task: state.task_reducer.task,
        tasks: state.public_reducer.tasks,
        indexCurrentCard: state.public_reducer.indexCurrentCard,
        indexCurrentTask: state.public_reducer.indexCurrentTask,
        indexOfWorkspace: state.public_reducer.indexOfWorkspace,
        statuses: state.status_reducer.statuses,
        workspaces: state.public_reducer.workspaces,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCard: (card) => dispatch(actions.setCard(card)),
        newTask: (task) => dispatch(actions.newTask(task)),
        getTasksByCardId: (id) => dispatch(actions.getTasksByCardId(id)),
        editCard: (card) => dispatch(actions.editCard(card)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCardsTabs)