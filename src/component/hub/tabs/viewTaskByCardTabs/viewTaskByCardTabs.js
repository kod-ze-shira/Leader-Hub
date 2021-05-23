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
import { useParams } from 'react-router-dom';
import DynamicSelect from '../../team/dynamicSelect';

import './ViewTaskByCradTabs.css'
import ContactList from '../../contact/contactList';

function ViewTaskByCradTabs(props) {

    const [editTaskName, setEditTaskName] = useState(props.task.name)
    const [currentIndexTask, setCurrentIndexTask] = useState("")
    const [currentIndexCard, setCurrentIndexCard] = useState("")
    const [task, setTask] = useState({
        "milestones": props.task.milestones,
        "_id": props.task._id, "name": editTaskName, "description": props.task.description
        , "status": props.status, "dueDate": props.task.dueDate, "startDate": props.task.startDate
    })
    let actionCard = { renameCard: "rename", deleteCard: "delete", viewCard: "viewCard" };
    let doneStatus = props.task.complete
    const [showchalalit, setShowChalalit] = useState(false)
    const { idProject } = useParams();

    useEffect(() => {
        setCurrentIndexTask(props.indexTask)
        setCurrentIndexCard(props.indexCard)


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
        // debugger
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
        debugger
        let task1 = {
            "milestones": props.task.milestones, "_id": props.task._id, "name": props.task.name, "description": props.task.description
            , "status": props.status, "dueDate": props.task.dueDate, "startDate": props.task.startDate
        }
        setTask(task1)
        props.EditTask(task1);
    }

    const showAssigTo = (e) => {
        debugger
        e.stopPropagation()
        var x = e.clientX;
        var y = e.clientY;
        var height = $(window).height();
        var width = $(window).width();
        props.setLeftContactList(x)
        props.setTopContactList(y)
        props.setWidthScreen(width)
        props.setHeightScreen(height)
        props.viewContactList(showAssignee)
    }


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
        let value = event.target.value
        if (event.target.name == "complete") {
            doneStatus = !doneStatus
            value = doneStatus
            editCompleteTask()

        }
        else {
            let editTaskInRedux = { "nameFiled": event.target.name, "value": value }
            props.setTaskByFiledFromTasks(editTaskInRedux)
        }

    }
    function addChalalit(e) {
        if (props.task.complete == false)
            setShowChalalit(true)
        e.stopPropagation()
    }
    $('.task-card').hover(function () {
        $(this).find('.color-task').hide();
        $(this).find('.assing-icon').show();
    }, function () {
        $(this).find('.assing-icon').hide();
        $(this).find('.color-task').show();
    });


    return (
        <>

            <Draggable className="taskkk"
                draggableId={props.task._id} index={props.indexTask}>
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        id="task-card"
                    >

                        <div className="task-card mt-2 pt-2"
                            onClick={(e) => showDetails(e)}
                            id={props.task._id + "disappear"}>

                            <div className="container ">
                                <input
                                    className="form-control col-12 mx-0"
                                    value={props.task.name}
                                    name="name"
                                    onChange={(e) => changeFiledInTask(e)}
                                    onClick={(e) => e.stopPropagation()}
                                    // onBlur={(e) => editTask()}
                                    onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            editTask()
                                        }
                                    }}
                                ></input>
                                {/* <div>{props.task.index}</div> */}
                                <div className="row justify-content-between">


                                    {/* <button className="more col-4 mr-0">. . .</button> */}
                                    {/* <Button className="more col-3 mr-0 more-task"
                                        data-tip data-for="more_a"
                                        aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                        . . .
                                    </Button> */}
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
                                    <label
                                        title="Complete Task"
                                        className="check-task py-2 check-tabs">
                                        <input type="checkbox"
                                            name="complete"
                                            checked={doneStatus}
                                            value={props.task.complete}
                                            onChange={(e) => changeFiledInTask(e)}
                                            onClick={(e) => e.stopPropagation()
                                            }
                                        />
                                        <span
                                            className="checkmark checkmark-tabs"
                                            onClick={(e) => addChalalit(e)}></span>
                                    </label>
                                    {props.task.status ? <div title={props.task.status.statusName}
                                        className="color-task col-3  "
                                        style={{ "backgroundColor": props.task.status.color }}></div> : null}

                                    <img
                                        onClick={(e) => showAssigTo(e)}
                                        class='assing-icon pb-3 mr-2' src={require('../../../img/assingTo-small-icon.png')}></img>
                                    {/* {showAssignee ?
                                        <ContactList/>
                                    : null} */}
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
        statuses: state.status_reducer.statuses
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
