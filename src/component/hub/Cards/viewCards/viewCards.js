import { Button, Menu, MenuItem } from '@material-ui/core';
import $ from 'jquery';
import React, { useEffect, useState, useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import title from '../../../../../src/Data/title.json';
import { actions } from '../../../../redux/actions/action';
import ViewTaskByCradTryS from '../../task/viewTaskByCardTryS/viewTaskByCradTryS';
import ViewDetails from '../../viewDetails/viewDetails';
import './viewCards.css';

function ViewCards(props) {
    useEffect(() => {
    }, [props.flag])

    const [flag, setFlag] = useState(true)
    const [flagFromSelect, setFlagFromSelect] = useState(true)
    const [cardId, setCardId] = useState("")
    const [viewDetails, setViewDetails] = useState(false)
    const [addTaskInInput, setAddTaskInInput] = useState(false)
    const [inputValue, setInputValue] = useState()
    const [editCardName, setEditCardName] = useState(props.cardFromMap.name)
    const [anchorEl, setAnchorEl] = React.useState(null);
    let actionINcard = { renameCard: "rename", deleteCard: "delete" };
    const textInput = useRef();

    const updateInputValue = (evt) => {
        setInputValue(evt.target.value)
    }
    const newTask = () => {
        //לבדוק למה הוא נופל על התאריך 
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        const yyyy = today.getFullYear()
        today = (dd <= 9 ? '0' + dd : dd) + '/' + (mm <= 9 ? '0' + mm : mm) + '/' + yyyy;
        let task;
        if (inputValue) {
            let status = props.statuses[0]
            console.log(status);
            // props.statuses[0]._id
            task = { name: inputValue, description: "", status: status, startDate: today, dueDate: today, "card": props.cardFromMap._id }
            // console.log(props.statuses[0].statusName);
            props.newTask(task)
            let countTasksInProject = props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject].countTasks
            props.setCountTasks(countTasksInProject += 1)
        }
        setInputValue("")
        // setAddTaskInInput(!addTaskInInput)
    }


    const addTask = () => {
        // props.setCard(props.cardFromMap)//becouse delete reducer
        setAddTaskInInput(true)
        if (props.cardFromMap.tasks.length)
            if (!(props.flag === props.cardFromMap._id && flagFromSelect) && !flag) {
                changeSelectedCard()
            }
    }

    const deleteCard = () => {
        // addNewStyle(`${props.cardFromMap._id} {display:none !important;}`)
        // document.getElementById(props.cardFromMap._id).setAttribute('style', 'display:none !important');

        $(`#${props.cardFromMap._id}`).addClass("displayNone")
        // $(`#${props.cardFromMap._id + "disappear"}`).css("display", "none")
        props.showToastDelete({ 'type': 'Card', 'object': props.cardFromMap })
    }
    const editCard = (event) => {
        let card = { "_id": props.cardFromMap._id, "name": textInput.current.innerHTML, "project": props.cardFromMap.project }
        props.EditCard(card);
    }
    const showDetails =
        (event) => {
            setViewDetails(true)
            setCardId(props.cardFromMap._id)
        }
    const triangleSide = (id) => {
        if ($(`#${id}`).hasClass("newTriangle")) {
            $(`#${id}`).addClass("triangle")
            $(`#${id}`).removeClass("newTriangle")
        }
        else {
            $(`#${id}`).removeClass("triangle")
            $(`#${id}`).addClass("newTriangle")
        }

    }
    const changeSelectedCard = (e) => {
        triangleSide(props.cardFromMap._id)
        if (props.flag === props.cardFromMap._id && flagFromSelect === true) {
            setFlagFromSelect(false)
            setAddTaskInInput(false)

        }
        else
            if (!flag && props.cardFromMap.tasks[0]) {
                setFlag(true)
            }
            else {
                console.log(props.cardFromMap.tasks[0])
                setFlag(false)
                setAddTaskInInput(false)
            }

    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        setAnchorEl(null);
        if (e === "delete")
            deleteCard()
        else
            if (e === "rename") {
            }

    };

    $('span').bind('click',
        function () {
            $(this).attr('contenteditable', true);
        });

    // $(window).click(function () {
    //     setAddTaskInInput(false)
    // })

    $('span').bind('blur',
        function () {
            $(this).attr('contenteditable', false);
        });

    return (
        <>
            <div className="container-scroll" id={props.cardFromMap._id + "disappear"}>
                <div className=" row justify-content-start card-name  mx-4 mt-4"
                >
                    <div className="col-4 d-flex justify-content-between">
                        <div className=" "
                            onMouseOver={(e) => $(`#task${props.cardFromMap._id}`).css({ 'display': 'inline' })}
                            onMouseOut={(e) => $(`#task${props.cardFromMap._id}`).css({ 'display': 'none' })}
                        >
                            <div className="wrap-triangle">
                                <div id={props.cardFromMap._id}
                                    className=" newTriangle ml-1"
                                    onClick={(e) => changeSelectedCard(e)} ></div>
                            </div>
                            <span
                                ref={textInput}
                                onBlur={() => editCard()}
                                className="show-card show-card-list ml-2 col-10 ">
                                {editCardName}</span>
                            <button data-tip data-for="add" className="new-task ml-2"
                                // id={`task${props.cardFromMap._id}`}
                                onClick={addTask}>+</button>
                        </div>
                        <Button className="more  " data-tip data-for="more_a"
                            onClick={handleClick}>
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
                            value={actionINcard}
                        >
                            <MenuItem className="rename-card" onClick={(e) => handleClose(actionINcard.renameCard)}>Rename Card</MenuItem>
                            <MenuItem onClick={(e) => handleClose(actionINcard.deleteCard)} > Delete Card</MenuItem>
                        </Menu>
                    </div>
                    {/* <p className="col">Team</p> */}

                    <p className="col-1">Start</p>
                    <p className="col-1">End</p>
                    <p className="col-1">Total</p>
                    <p className="col-1">Assignee</p>
                    <p className="col-1 ">Status</p>
                    {/* <p className="col">Start date</p> */}
                    <p className="col-1 ">Due date</p>
                    <p className="col-1">Priority</p>
                    {/* <p className="col-1 "></p> */}

                </div >
                <p className=""><a>
                    <ReactTooltip className="tooltip-style" data-tip id="add" place="bottom" effect="solid">
                        {title.title_add_task}
                    </ReactTooltip>
                </a></p>
                {
                    props.flag === props.cardFromMap._id && flagFromSelect || flag ?
                        <div className="allTaskInCard">
                            <Droppable droppableId={props.cardFromMap._id}  >
                                {provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}>
                                        {props.cardFromMap.tasks.map((task, index) => (
                                            <ViewTaskByCradTryS
                                                closeCalendarOrContact={props.closeCalendarOrContact}
                                                viewContactList={props.viewContactList}
                                                viewToastMassege={props.viewToastMassege}
                                                objectToast={(task) => props.showToastDelete(task)}
                                                key={task._id} task={task}
                                                indexCard={props.indexCard}
                                                indexTask={index}
                                                showRocketShip={props.showRocketShip}
                                            />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div> : null
                }

                {addTaskInInput ?
                    <input
                        autoFocus="true"
                        type="text"
                        // className="add-task"
                        className="form-control scroll-container mt-2   ml-4"
                        placeholder="Add Task" id="input-task"
                        autocomplete="chrome-off"
                        value={inputValue} onChange={updateInputValue} onKeyPress={event => {
                            if (event.key === 'Enter') {
                                newTask()
                            }
                        }}
                    />
                    : null}


                {
                    viewDetails ?
                        <div className="closeDet">
                            <ViewDetails viewContactList={props.viewContactList}
                                closeViewDetails={() => setViewDetails(false)}
                                cardId={cardId} from={"addTask"}
                                viewToastMassege={props.viewToastMassege}
                            >

                            </ViewDetails>
                        </div>
                        : null
                }
            </div>
        </>
    )
}
const mapStateToProps = (state) => {

    return {
        workspaces: state.public_reducer.workspaces,
        tasks: state.public_reducer.tasks,
        statuses: state.status_reducer.statuses,
        indexCurrentProject: state.public_reducer.indexCurrentProject,
        indexOfWorkspace: state.public_reducer.indexOfWorkspace,

        // user: state.public_reducer.userName,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCountTasks: (count) => dispatch(actions.setCountTasks(count)),
        newTask: (task) => dispatch(actions.newTask(task)),
        getTasksByCardId: (id) => dispatch(actions.getTasksByCardId(id)),
        EditCard: (card) => dispatch(actions.editCard(card)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCards)