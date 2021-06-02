import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import { InputGroup, FormControl, Table } from 'react-bootstrap'
import $ from 'jquery';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuItem, Button } from '@material-ui/core';
import ReactTooltip from 'react-tooltip';
import title from '../../../../Data/title.json'
import { useParams } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './ViewTaskByCradTabs.css'
import ContactList from '../../contact/contactList';

function ViewTaskByCradTabs(props) {
    const textInput = useRef();

    const [editTaskName, setEditTaskName] = useState(props.task.name)
    const [currentIndexTask, setCurrentIndexTask] = useState("")
    const [currentIndexCard, setCurrentIndexCard] = useState("")
    // const [task, setTask] = useState({
    //     "milestones": props.task.milestones,
    //     "_id": props.task._id, "name": editTaskName, "description": props.task.description
    //     , "status": props.status, "dueDate": props.task.dueDate, "startDate": props.task.startDate
    // })
    let actionCard = { renameCard: "rename", deleteCard: "delete", viewCard: "viewCard" };
    let doneStatus = props.task.complete
    const [showchalalit, setShowChalalit] = useState(false)
    // const [assingToMemberToTask, setAssingToMemberToTask] = useState(false)
    const [assignTo, setAssignTo] = useState(false)


    useEffect(() => {
        setCurrentIndexTask(props.indexTask)
        setCurrentIndexCard(props.indexCard)
        $(`#${props.task._id}assing-to`).css("display", "none")

    }, [props.cards])

    useEffect(() => {
        doneStatus = props.task.complete
    }, [props.task.complete])

    useEffect(() => {

    }, [props.task.status])
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();

    };
    const [showAssignee, setShowAssignee] = useState(true)

    const [assigneeDetails, setAssigneeDetails] = useState()//all contacts detail
    let contact
    const setStateMailToContactMail = (emailMember) => {
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        props.assingTo(emailMember.value.email)

    }

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
                $(`#${props.task._id + "disappear"}`).css("display", "none")
                props.objectToast({ 'type': 'Task', 'object': props.task })
            }
        }
        else
            e.stopPropagation()
    };
    const editTask = (event) => {
        let task1 = {
            "milestones": props.task.milestones, "_id": props.task._id, "name": props.task.name, "description": props.task.description
            , "status": props.status, "dueDate": props.task.dueDate, "startDate": props.task.startDate
        }
        // setTask(task1)
        props.EditTask(task1);
    }

    const showAssigToOrCalander = (object) => {
        let e = object.e
        let name = object.name
        e.stopPropagation()
        var x = e.clientX;
        var y = e.clientY;
        var height = $(window).height();
        var width = $(window).width();
        props.setLeftContactList(x)
        props.setTopContactList(y)
        props.setWidthScreen(width)
        props.setHeightScreen(height)
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        props.viewContactList(name)
    }
    const colors = ["#C967B6", "#8D18AD", "#4D2AC9", "#6A67C9", "#2B79C2", "#32AABA", "#34A38B", "#53A118", "#91A118", "#BDAA1C",
        "#C48E1A", "#C46F1A", "#C43C1A", "#BF2E63", "#C9676F",
        "#FD80E5", "#B620E0", "#6236FC", "#8580FD", "#3598F4", "#40D9ED", "#44D7B6", "#6DD41F", "#BFD41", "#F0D923",
        "#F8B520", "#F88C20", "#F84A20", "#F13B7F", "#FD808B",
        "#FCB3EE", "#CA79E0", "#8868FC", "#B6B3FC", "#67B0F5", "#6FDEED", "#6FD6C0", "#86D44A", "#C4D44A", "#F0DE54",
        "#F7C352", "#F7A452", "#F77352", "#F26B9C", "#FCB3B9"
    ]

    const editCompleteTask = () => {
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        const yyyy = today.getFullYear()
        today = (dd <= 9 ? '0' + dd : dd) + '/' + (mm <= 9 ? '0' + mm : mm) + '/' + yyyy
        let completeTask = {
            "_id": props.task._id,
            "name": props.task.name,
            "description": props.task.description,
            "dueDate": props.task.dueDate,
            "startDate": props.task.startDate,
            "complete": doneStatus,
            "endDate": today,
            "status": props.statuses ? doneStatus ? props.statuses[2] : props.statuses[0] : null,
        }
        props.setTaskComplete(completeTask)//redux
        props.completeTask(completeTask)//server
        if (doneStatus)
            props.viewToastComplete(true)
    }
    const showDetails = (event) => {

        if (anchorEl == null) {
            props.setCurrentIndexTask(currentIndexTask)
            props.setCurrentIndexCard(currentIndexCard)
            props.openViewDetails(props.task)
            event.stopPropagation()
        }
    }
    const changeFiledInTask = (event) => {

        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        let editTaskInRedux
        if (event.name == "name") {
            editTaskInRedux = { "nameFiled": event.name, "value": textInput.current.innerHTML }
            props.setTaskByFiledFromTasks(editTaskInRedux)
        }
        else {
            let value = event.target.value
            if (event.target.name == "complete") {

                doneStatus = !doneStatus
                value = doneStatus
                editCompleteTask()
            }
            else {
                editTaskInRedux = { "nameFiled": event.target.name, "value": value }
                props.setTaskByFiledFromTasks(editTaskInRedux)
            }
        }
    }

    function addChalalit(e) {
        if (props.task.complete == false)
            setShowChalalit(true)
        e.stopPropagation()
    }

    // date in  words
    let dayNumber = props.task.dueDate.split("/")[0];
    let day = Number(dayNumber)
    let monthNumber = props.task.dueDate.split("/")[1];
    let month = Number(monthNumber)
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = monthNames[month];
    let dateInString = day + " " + monthName

    const showAssign = () => {
        if (!props.task.assingTo)
            $(`#${props.task._id}assing-to`).css("display", "inline-block")
    }
    const closeAssign = () => {
        if (!props.task.assingTo)
            $(`#${props.task._id}assing-to`).css("display", "none")
    }
    const updateLike = (e) => {
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        props.updateLike(props.task._id)
        e.stopPropagation()
    }
    return (
        <>

            <Draggable
                draggableId={props.task._id} index={props.indexTask}>
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        id="task-card"
                    >

                        <div className="task-card mt-2 pt-2 pb-2"
                            onMouseOver={(e) => showAssign(e)}
                            onMouseOut={(e) => closeAssign(e)}
                            onClick={(e) => showDetails(e)}
                            id={props.task._id + "disappear"}>
                            <div className="container ">
                                <label
                                    title="Complete Task"
                                    className="check-task pb-2  check-tabs">
                                    <input type="checkbox"
                                        name="complete"
                                        checked={doneStatus}
                                        value={props.task.complete}
                                        onChange={(e) => changeFiledInTask(e)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <span
                                        className="checkmark checkmark-tabs"
                                        onClick={(e) => addChalalit(e)}></span>
                                </label>

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

                                <input
                                    className="form-control col-12 mx-0 mt-2"
                                    value={props.task.name}
                                    name="name"
                                    onChange={(e) => changeFiledInTask(e)}
                                    onClick={(e) => e.stopPropagation()}
                                    onBlur={(e) => editTask()}
                                    onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            editTask()
                                        }
                                    }}
                                ></input>

                                {/* <span
                                    name="name"
                                    ref={textInput}
                                    value={this}
                                    onBlur={(e) => editTask(e)}
                                    className="task-name-span ml-3  col-12 "
                                    onClick={(e) => e.stopPropagation()}
                                    onKeyPress={(e) => changeFiledInTask({ event: e, name: "name" })}>
                                    {props.task.name}
                                </span> */}

                                <div className="icons-in-task-tabs pt-0">

                                    <div className="row justify-content-between mx-2 mt-3 mb-0">
                                        <div className="status-task-tabs " style={{ "backgroundColor": props.task.status ? props.task.status.color : null }} >
                                            {props.task.status ? props.task.status.statusName : null}
                                        </div>

                                        {/* {props.task.status ? <div title={props.task.status.statusName}
                                        className="color-task col-3  "
                                        style={{ "backgroundColor": props.task.status.color }}></div> : null} */}
                                        <div className="icons-task-tabs">

                                            <div className="due-date-hover">
                                                <p onClick={(e) => showAssigToOrCalander({ "e": e, "name": "calander" })}
                                                >{dateInString}</p>
                                            </div>
                                            <div className="like-hover">
                                                <img
                                                    className="like-icon-tabs"
                                                    onClick={(e) => showAssigToOrCalander({ "e": e, "name": "like" })}
                                                    src={require('../../../img/like-icon.png')}>
                                                </img>
                                                <div onClick={(e) => updateLike(e)}>
                                                    <p className="mr-1">{props.task.likes.length}</p>
                                                    <img
                                                        onClick={updateLike}
                                                        src={require('../../../img/heart.png')}>
                                                    </img>
                                                </div>
                                            </div>
                                            <div>
                                                <img
                                                    id={`${props.task._id}assing-to`}
                                                    className="ml-2 assing-to-icon"
                                                    onClick={(e) => showAssigToOrCalander({ "e": e, "name": "share" })}
                                                    src={require('../../../img/share-icon.png')}>
                                                </img>
                                                {props.task.assingTo ? <div className="assing-to" onClick={(e) => showAssigToOrCalander({ "e": e, "name": "share" })} >
                                                    {props.task.assingTo ? <img referrerpolicy="no-referrer" src={props.task.assingTo ? props.task.assingTo.contact.thumbnail : null} className="thumbnail-contact ml-2" />
                                                        : <div className="logo-contact ml-2" >{props.task.assingTo.contact.name ? props.task.assingTo.contact.name[0] : null}</div>}
                                                </div> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
        workspaces: state.public_reducer.workspaces,
        indexCurrentCard: state.public_reducer.indexCurrentCard,
        indexCurrentTask: state.public_reducer.indexCurrentTask,
        indexOfWorkspace: state.public_reducer.indexOfWorkspace,
        statuses: state.status_reducer.statuses,
        contact: state.share_reducer.contactsUser,
        indexContact: state.share_reducer.indexContact,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateLike: (taskId) => dispatch(actions.updateLike(taskId)),
        EditTask: (task) => dispatch(actions.editTask(task)),
        setTaskStatus: (index) => dispatch(actions.setTaskStatus(index)),
        setTaskName: (name) => dispatch(actions.setTaskNameInTaskReducer(name)),
        setTaskByFiledFromTasks: (taskDetails) => dispatch(actions.setTaskByFiledFromTasks(taskDetails)),
        setCurrentIndexTask: (index) => dispatch(actions.saveCurrentIndexOfTaskInRedux(index)),
        setCurrentIndexCard: (index) => dispatch(actions.saveCurrentIndexOfCardInRedux(index)),
        setTopContactList: (top) => dispatch(actions.saveTopContactListInRedux(top)),
        setLeftContactList: (left) => dispatch(actions.saveLeftContactListInRedux(left)),
        setWidthScreen: (width) => dispatch(actions.saveWidthScreenInRedux(width)),
        setHeightScreen: (height) => dispatch(actions.saveHeightScreenInRedux(height)),
        setTaskComplete: (completeDetails) => dispatch(actions.setTaskComplete(completeDetails)),
        completeTask: (task) => dispatch(actions.completeTask(task)),
        assingTo: (emailOfContact) => dispatch(actions.assingTo(emailOfContact))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskByCradTabs)