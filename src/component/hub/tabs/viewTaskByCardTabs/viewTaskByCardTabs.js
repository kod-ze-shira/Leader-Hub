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
import Animation from '../../animation/animation'

import ContactList from '../../contact/contactList';

function ViewTaskByCradTabs(props) {
    const textInput = useRef();

    const [currentIndexTask, setCurrentIndexTask] = useState("")
    const [currentIndexCard, setCurrentIndexCard] = useState("")
    const [showchalalit, setShowChalalit] = useState(false)
    const [userHasLike, setUserHasLike] = useState(false)
    const [numOfRows, setNumOfRows] = useState(1)

    let actionCard = { renameCard: "rename", deleteCard: "delete", viewCard: "viewCard" };
    let doneStatus = props.task.complete
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        console.log(props.task);
        setCurrentIndexTask(props.indexTask)
        setCurrentIndexCard(props.indexCard)
        if (props.task.assingTo)
            $(`#${props.task._id}assing-to`).css("display", "none")

        let hasLike = props.task.likes ? props.task.likes.find(user => user == props.userId) : null
        if (hasLike)
            setUserHasLike(true)

    }, [props.cards, props.userId])

    useEffect(() => {
        doneStatus = props.task.complete
    }, [props.task.complete])

    // useEffect(() => {

    // }, [props.task.status])


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
                $(`#${props.task._id + "disappear"}`).css("display", "none")
                props.objectToast({ 'type': 'Task', 'object': props.task })
            }
        }
        else
            e.stopPropagation()
    };
    const editTask = (event) => {
        setNumOfRows(numOfRows + 1)
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
            "likes": props.task.likes,
            "assingTo": props.task.assingTo,
            "status": props.statuses ? doneStatus ? props.statuses[2] : props.statuses[0] : null,
            "files": props.task.files ? props.task.files : null,
            "priority": props.task.priority

        }
        // let project = props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject]
        // props.editProjectInServer({ 'project': { 'id': project._id, 'countReadyTasks': project.countReadyTasks + 1 } })

        props.setTaskComplete(completeTask)//redux
        props.completeTask(completeTask)//server
        if (doneStatus) {
            props.setCountReadyTasks(true)
            setShowChalalit(true)

            props.viewToastComplete({ show: true, massege: 'comlited task!!' })
        }
        else {
            props.setCountReadyTasks(false)
        }
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

        // if (event.name == "name") {
        //     editTaskInRedux = { "nameFiled": event.name, "value": textInput.current.innerHTML }
        //     props.setTaskByFiledFromTasks(editTaskInRedux)
        // }
        // else {
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
        // }
    }

    function addChalalit(e) {
        // if (props.task.complete == false)
        // setShowChalalit(true)
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


    const updateLike = (e) => {
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        props.updateLike(props.task._id)
        setUserHasLike(!userHasLike)
        e.stopPropagation()
    }

    $('.span-name-task').on('DOMSubtreeModified', function (event) {
        $(".span-name-task").text($(this).val());
        var val = $(".span-name-task").text($(this).val());
        console.log(val);


    })


    const myFiles = props.task.files && props.task.files.length ?
        props.task.files.map((myFile) => {
            return myFile.url.endsWith(".pdf") || myFile.url.endsWith(".docx") ?
                null : <img className='imgInTask' src={myFile.url}></img>

        })
        : null

    return (
        <>
            {showchalalit ? <div className="animation"><Animation /> </div> : null}

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
                            onClick={(e) => showDetails(e)}
                            id={props.task._id + "disappear"}>
                            <div className=" ">
                                <label
                                    title="Complete Task"
                                    className="check-task pb-2  check-tabs ">
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
                                    {/* <MenuItem onClick={handleClose}>Edit Task Name</MenuItem> */}
                                    <MenuItem onClick={(e) => handleClose(actionCard.viewCard, e)} >View Details</MenuItem>
                                    <MenuItem onClick={(e) => handleClose(actionCard.deleteCard, e)}>Delete Task</MenuItem>
                                </Menu>
                                {myFiles}
                                {/* <div>
                                    <span className="span-name-task mt-2" contentEditable={true} >
                                        {props.task.name}
                                    </span>

                                </div> */}
                                <textarea
                                    className={props.task.complete ? "disabled form-control textarea-name-task col-12 mx-0" : "textarea-name-task form-control col-12 mx-0"}
                                    style={props.task.files && props.task.files.length ? null : { 'margin-top': '20px' }}
                                    value={props.task.name}
                                    // rows={numOfRows}
                                    name="name"
                                    onChange={(e) => changeFiledInTask(e)}
                                    onClick={(e) => e.stopPropagation()}
                                    onBlur={(e) => editTask()}
                                    onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            editTask()
                                        }
                                    }}
                                />

                                {/* <span
                                    name="name"
                                    ref={textInput}
                                    onBlur={(e) => editTask(e)}
                                    className="task-name-span ml-3 col-12 "
                                    onClick={(e) => e.stopPropagation()}
                                    onKeyPress={(e) => changeFiledInTask({ event: e, name: "name" })}
                                >
                                    {props.task.name}
                                </span> */}

                                <div className="icons-in-task-tabs pt-0">
                                    <div className="row justify-content-between mx-2 mt-3 mb-0">
                                        <div className="p_task">
                                            <div> {props.task.priority ?
                                                <img className="priority-img mr-1" referrerpolicy="no-referrer" src={props.task.priority.icon} />
                                                : null}
                                            </div>
                                            <div
                                                className={props.task.complete ? "status-task-tabs-opacity px-2  " : "status-task-tabs px-2 "}
                                                style={{ "backgroundColor": props.task.status ? props.task.status.color : null }} >
                                                {props.task.status ? props.task.status.statusName : null}
                                            </div>
                                        </div>
                                        {/* {props.task.status ? <div title={props.task.status.statusName}
                                        className="color-task col-3  "
                                        style={{ "backgroundColor": props.task.status.color }}></div> : null} */}
                                        <div className="icons-task-tabs">

                                            <div className="due-date-hover" title={title.title_due_date}>
                                                <p onClick={(e) => showAssigToOrCalander({ "e": e, "name": "calander" })}
                                                >{dateInString}</p>
                                            </div>

                                            <div className="like-hover">
                                                <img
                                                    className="like-icon-tabs"
                                                    onClick={(e) => showAssigToOrCalander({ "e": e, "name": "like" })}
                                                    src={require('../../../img/like-icon.png')}>
                                                </img>
                                                <div title={title.title_like} onClick={(e) => updateLike(e)}>
                                                    <p className="mr-1">{props.task.likes.length}</p>
                                                    <img
                                                        onClick={updateLike}
                                                        src={userHasLike ? require('../../../img/heart.png') : require('../../../img/border-heart.svg')}>
                                                    </img>
                                                </div>
                                            </div>
                                            <div>
                                                <img
                                                    id={`${props.task._id}assing-to`}
                                                    title={title.title_assing}
                                                    className="ml-2 assing-to-icon"
                                                    onClick={(e) => showAssigToOrCalander({ "e": e, "name": "share" })}
                                                    src={require('../../../img/share-icon.png')}>
                                                </img>
                                                {props.task.assingTo ?
                                                    <div className="assing-to" onClick={(e) => showAssigToOrCalander({ "e": e, "name": "share" })} >
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
        userId: state.public_reducer.userId,
        tasks: state.public_reducer.tasks,
        cards: state.public_reducer.cards,
        card: state.card_reducer.card,
        workspaces: state.public_reducer.workspaces,
        indexCurrentProject: state.public_reducer.indexCurrentProject,
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
        setCountReadyTasks: (value) => dispatch(actions.setCountReadyTasks(value)),
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