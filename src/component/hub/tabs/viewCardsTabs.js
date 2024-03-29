
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
            if (props.openInputTask && props.cards[props.indexCurrentCard]._id === props.cardFromMap._id) {
                document.getElementById("add-new-card").focus();
                setAddTaskInInput(true)
                // props.setCard(props.cardFromMap)
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
                startDate: today, dueDate: today, "card": props.cardFromMap._id
            }
            debugger
            props.newTask(task)
            //לבדוק נפילה
            let countTasksInProject = props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject].countTasks
            props.setCountTasks(countTasksInProject += 1)

        }
        setInputValue("")
        // setAddTaskInInput(!addTaskInInput)
    }

    const addTask = (e) => {
        setAddTaskInInput(!addTaskInInput)
        // props.setCard(props.cardFromMap)//becouse delete card
        e.stopPropagation();

    }
   
    const editCard = (event) => {
        let card = { "_id": props.cardFromMap._id, "name": textInput.current.innerHTML, "project": props.cardFromMap.project }
        console.log("edut-card", card)
        props.editCard(card);
    }

    const handleClick = (event) => {
        textInput.current.focus()

        if (event === "rename") {
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
        if (nameAction === "delete") {
            // $(`#${props.cards[props.indexCard]._id}`).css("display", "none")
            props.showToast({ 'type': 'Card', 'object': props.cardFromMap })
        }
    }
    autosize();

    function autosize() {
        var text = $('.autosize');

        text.each(function () {
            $(this).attr('rows', 1);
            resize($(this));

        });
        $(".autosize").keydown(function (e) {
            // Enter was pressed without shift key
            if (e.key === 'Enter' && !e.shiftKey) {
                resize($(this));

                // prevent default behavior
                e.preventDefault();

            }
            if (e.key === 'Enter') {
                newTask()

            }
        });

        function resize($text) {
            $text.css('height', 'auto');
            $text.css('height', $text[0].scrollHeight + 'px');
        }
    }

    const openViewDetails = (task) => {
        if (task !== false) {
            props.openViewDetails(task)
        }
    };

    $(window).click(function () {
        setAddTaskInInput(false)
    })

    $('.draggable input').click(function () {
        $(this).focus();
    });

    $('span').bind('click',
        function () {
            $(this).attr('contenteditable', true);
        });

    $('span').bind('blur',
        function () {
            $(this).attr('contenteditable', false);
        });
    return (
        <>

            <div className="col-md-3 col-sm-10 px-2 mt-4 pb-0" id={props.cards[props.indexCard]._id}>
                <Draggable draggableId={props.cardFromMap._id} index={props.index}>
                    {provided => (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <div className="view-cards-tabs"
                                id={props.cardFromMap._id}>
                                <div className="card" >
                                    <div className="container " >
                                        <div className="draggable card-header row">
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
                                            <ReactTooltip className="tooltip-style" data-tip id="more_a" place="top" effect="solid">
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
                                    <div className="card-body allTaskInCard " >
                                        <Droppable droppableId={props.cardFromMap._id} >
                                            {provided => (
                                                <div className="mt-0 glila mb-2"
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps} >
                                                    {props.cardFromMap.tasks ? props.cardFromMap.tasks.map((task, index) => (
                                                        <ViewTaskByCradTabs
                                                            openViewDetails={openViewDetails}
                                                            objectToast={(obj) => props.showToast(obj)}
                                                            task={props.cards[props.indexCard].tasks[index]}
                                                            indexCard={props.indexCard}
                                                            showRocketShip={props.showRocketShip}
                                                            indexTask={index}
                                                            viewToastMassege={props.viewToastMassege}
                                                            viewContactList={props.viewContactList}
                                                            openNewInputTask={(cardId) => props.cardFromMap._id === cardId ? setAddTaskInInput(true) : null} />
                                                    )) : null}
                                                    {
                                                        addTaskInInput ?
                                                            <div className="mt-3">
                                                                <input
                                                                    autoFocus="true"
                                                                    type="text"
                                                                    className="  form-control col-12 mx-0" placeholder="Add Task"
                                                                    id="input-task"
                                                                    autocomplete="off" value={inputValue}
                                                                    // onMouseLeave={(e)=>setAddTaskInInput(false)}
                                                                    onChange={updateInputValue}
                                                                    onKeyPress={event => {
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
                                            className="add-task-tabs mt-4 mt-3 pl-1 ">Add Task</a>
                                        {/* <img className="mt-2 new-task-tabs" onClick={(e) => addTask(e)} src={require('../../img/Link.png')}></img> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Draggable>
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        cards: state.public_reducer.cards,
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
        newTask: (task) => dispatch(actions.newTask(task)),
        getTasksByCardId: (id) => dispatch(actions.getTasksByCardId(id)),
        editCard: (card) => dispatch(actions.editCard(card)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCardsTabs)