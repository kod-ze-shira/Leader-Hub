
import { Button, Menu, MenuItem } from '@material-ui/core';
import $ from "jquery";
import React, { useEffect, useRef, useState } from 'react';
// import history from '../../../history'
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import title from '../../../Data/title.json';
import { actions } from '../../../redux/actions/action';
import './viewCardsTabs.css';
import ViewTaskByCradTabs from './viewTaskByCardTabs/viewTaskByCardTabs';

function ViewCardsTabs(props) {


    useEffect(() => {
        if (props.cards[props.indexCurrentCard])
            if (props.openInputTask && props.cards[props.indexCurrentCard]._id == props.cardFromMap._id) {
                document.getElementById("add-new-card").focus();
                setAddTaskInInput(true)
                props.setCard(props.cardFromMap)
            }

    }, [props.flag, props.openInputTask])


    const [addTaskInInput, setAddTaskInInput] = useState(false)
    const [inputValue, setInputValue] = useState()
    const [editCardName, setEditCardName] = useState(props.cardFromMap.name)
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
            let countTasksInProject = props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject].countTasks
            props.setCountTasks(countTasksInProject += 1)

        }
        setInputValue("")
        // setAddTaskInInput(!addTaskInInput)
    }

    const addTask = (e) => {
        setAddTaskInInput(!addTaskInInput)
        props.setCard(props.cardFromMap)
        e.stopPropagation();

    }
    // const updateCardName = (event) => {

    //     setEditCardName(event.target.value)
    // }
    const editCard = (event) => {
        let card = { "_id": props.cardFromMap._id, "name": textInput.current.innerHTML, "project": props.project._id }
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
        }
    }

    // function enterK(event) {
    //     if (event.key === 'Enter') {
    //         editCard()
    //         document.getElementById("input-card-name").blur();
    //     }
    // }
    const [task, setTask] = useState(false)

    const openViewDetails = (task) => {
        setTask(task)
        props.openViewDetails(task)

    };

    $(window).click(function () {
        setAddTaskInInput(false)
    })

    $('.draggable input').click(function () {
        $(this).focus();
    });

    $('span').bind('click',
        function () {
            $(this).attr('contentEditable', true);
        });

    $('span').bind('blur',
        function () {
            $(this).attr('contentEditable', false);
        });
    console.log(props.cards);
    return (
        <>
            <div className="card-width px-2 mt-4" id={props.cards[props.indexCard]._id}>
                <Draggable draggableId={props.cardFromMap._id} index={props.index} >
                    {provided => (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <div className="view-cards-tabs"
                                id={props.cardFromMap._id}>
                                <div class="card" >
                                    <div class="container " >
                                        <div class="draggable card-header row">
                                            <span
                                                id="input-card-name"
                                                ref={textInput}
                                                onBlur={() => editCard()}
                                                className=" mb-2 pl-4 col-10"

                                            >{editCardName}
                                            </span>
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
                                    <div class="card-body allTaskInCard " >
                                        <Droppable droppableId={props.cardFromMap._id} >
                                            {provided => (
                                                <div className="mt-0 glila mb-2"
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps} >

                                                    {props.cardFromMap.tasks.map((task, index) => (
                                                        <ViewTaskByCradTabs
                                                            openViewDetails={openViewDetails}
                                                            objectToast={(obj) => props.showToast(obj)}
                                                            task={props.cards[props.indexCard].tasks[index]}
                                                            indexCard={props.indexCard}
                                                            showRocketShip={props.showRocketShip}
                                                            indexTask={index}
                                                            viewToastComplete={props.viewToastComplete}
                                                            viewContactList={props.viewContactList} />
                                                    ))}
                                                    {
                                                        addTaskInInput ?
                                                            <div class="mt-3">
                                                                <input
                                                                    autoFocus="true"
                                                                    type="text"
                                                                    class="form-control" placeholder="Add Task"
                                                                    id="input-task"
                                                                    autocomplete="chrome-off"
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
                                        <a data-tip data-for="add_t" onClick={(e) => addTask(e)}
                                            className="add-task-tabs mt-4 mt-3 ">Add Task</a>
                                        {/* <img className="mt-2 new-task-tabs" onClick={(e) => addTask(e)} src={require('../../img/Link.png')}></img> */}
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
        indexCurrentProject: state.public_reducer.indexCurrentProject,
        indexCurrentCard: state.public_reducer.indexCurrentCard,
        indexCurrentTask: state.public_reducer.indexCurrentTask,
        indexOfWorkspace: state.public_reducer.indexOfWorkspace,
        statuses: state.status_reducer.statuses,
        workspaces: state.public_reducer.workspaces,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCountTasks: (count) => dispatch(actions.setCountTasks(count)),
        setCard: (card) => dispatch(actions.setCard(card)),
        newTask: (task) => dispatch(actions.newTask(task)),
        getTasksByCardId: (id) => dispatch(actions.getTasksByCardId(id)),
        editCard: (card) => dispatch(actions.editCard(card)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCardsTabs)