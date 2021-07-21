import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import imageCompression from "browser-image-compression";
import $ from 'jquery';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuItem, Button } from '@material-ui/core';
import ReactTooltip from 'react-tooltip';
import title from '../../../../Data/title.json'
import { useParams } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './ViewTaskByCradTabs.css'
import UploadFile from '../../uploadFile/uploadFile'
import Animation from '../../animation/animation'


function ViewTaskByCradTabs(props) {
    const textInput = useRef();
    const [currentIndexTask, setCurrentIndexTask] = useState("")
    const [currentIndexCard, setCurrentIndexCard] = useState("")
    const [showchalalit, setShowChalalit] = useState(false)
    const [userHasLike, setUserHasLike] = useState(false)

    let actionCard = { renameCard: "rename", deleteCard: "delete", viewCard: "viewCard" };
    let doneStatus = props.task ? props.task.complete : null
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
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

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();

    };


    autosize();

    function autosize() {
        var text = $('.autosize');

        text.each(function () {
            $(this).attr('rows', 1);
            resize($(this));
        });
        $(".autosize").keydown(function (e) {
            // Enter was pressed without shift key
            if (e.key == 'Enter' && !e.shiftKey) {
                resize($(this));

                // prevent default behavior
                e.preventDefault();
            }
            if (e.key == 'Enter') {
                editTask()
            }

        });

        function resize($text) {
            $text.css('height', 'auto');
            $text.css('height', $text[0].scrollHeight + 'px');
        }
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

        let task_ = props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]
        props.EditTask(task_);
        // props.openNewInputTask(task_.card)
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
            "assingTo1": props.task.assingTo1 ? props.task.assingTo1 : null,
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
            props.showRocketShip(true)
            props.viewToastMassege({ show: true, massege: 'comlited task!!' })
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

    const checkURL = (url) => {
        return (url.match(/^http[^\?]*\.(jpeg|jpg|gif|png|PNG)$/) != null);
    }

    const addFile = async (file) => {


        let url
        if (file)
            url = file
        // else
        //     url = document.getElementById('inputImageInD').value;
        // צריכה לבדוק פה אם הכתובת תקינה?
        // this.props.setTaskByFiledFromTasks(url)

        url = decodeURI(url)

        let isGood = checkURL(url)

        if (isGood) {
            // flug = true;
            let file = await fetch(url)
                .then(r => r.blob())
                .then(blobFile => new File([blobFile],
                    url.match(/.*\/(.*)$/)[1],
                    { type: "image/jpeg" }))
            console.log(file)
            props.setFileFromTask(file)
            file = [{
                'url': 'new',
                'name': file.name,
                'file': file,
                'size': file.size
            }]
            file = await compressedFile(file)
            let task = {}

            task = props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]
            props.uploadFiles({ 'files': file, 'task': task, type: 'task' })
        }
    }

    const changeFiledInTask = (event) => {
        debugger
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

            let text = value
            debugger
            if (text.includes("https://") || text.includes("https://")) {
                if (text.includes("https://"))
                    text = "https://" + text.split("https://")[1]
                else if (text.includes("http://"))
                    text = "http://" + text.split("http://")[1]
                // let myText
                if (text.includes('.jpg')) {
                    text = text.split('.jpg')[0] + '.jpg'
                    addFile(text)
                    // text = event.replace(text, '')
                } else if (text.includes('.png')) {
                    text = text.split('.png')[0] + '.png'
                    addFile(text)
                    // text = event.replace(text, '')
                } else if (text.includes('.jpeg')) {
                    text = text.split('.jpeg')[0] + '.jpeg'
                    addFile(text)
                    // text = event.replace(text, '')
                }
                if (text.includes('.gif')) {
                    text = text.split('.gif')[0] + '.gif'
                    addFile(text)
                    // text = event.replace(text, '')
                }
            }

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
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
    const fileInputRef = useRef()

    const uploadMulti = async () => {
        if (fileInputRef.current.files) {
            props.setFileFromTask(fileInputRef.current.files[0])
            let file = [{
                'url': 'new',
                'name': fileInputRef.current.files[0].name,
                'file': fileInputRef.current.files[0],
                'size': fileInputRef.current.files[0].size
            }]
            file = await compressedFile(file)
            let task = {}, type
            type = 'task'
            props.uploadFiles({ 'files': file, 'task': task, type: type })
        }
    }
    const compressedFile = async (myFiles) => {

        let compressedFile;
        let compressedFiles = [];

        await Promise.all(
            myFiles.map(async (file) => {
                if (file.file.type.includes("image")) {
                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                    };
                    compressedFile = await imageCompression(file.file, options);

                    console.log(
                        `compressedFile size ${compressedFile.size / 1024} MB`
                    );
                } else {
                    compressedFile = file.file;
                }
                compressedFiles.push(compressedFile)

            })
        )

        return compressedFiles
    }
    const setIndex = (e) => {
        e.stopPropagation()
        setCurrentIndexTask(props.indexTask)
        setCurrentIndexCard(props.indexCard)

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

                        <div className="task-card mb-2 pb-2"
                            onClick={(e) => showDetails(e)}
                            id={props.task._id + "disappear"}>
                            <div className=" ">
                                <div className="row  mx-1 mt-1">
                                    <label
                                        className="check-task pb-2  check-tabs "
                                        data-tip data-for="complite_task"
                                    >
                                        <input type="checkbox"
                                            name="complete"
                                            checked={doneStatus}
                                            value={props.task.complete}
                                            onChange={(e) => changeFiledInTask(e)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <ReactTooltip className="tooltip-style" data-tip id="complite_task" place="top" effect="solid">
                                            Complete Task
                                        </ReactTooltip>
                                        <span
                                            className="checkmark checkmark-tabs"
                                            onClick={(e) => addChalalit(e)}></span>
                                    </label>
                                    <div
                                        onClick={(e) => showAssigToOrCalander({ "e": e, "name": "status" })}
                                        className={props.task.complete ? "status-task-tabs-opacity px-2 ml-5" : "status-task-tabs px-2 ml-5"}
                                        style={{ "backgroundColor": props.task.status ? props.task.status.color : null }} >
                                        {props.task.status ? props.task.status.statusName : null}
                                    </div>
                                    {/* <Button className="more col align-self-end mr-0 more-task"
                                        data-tip data-for="more_a"
                                        aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                        . . .
                                    </Button> */}

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
                                        {/* <MenuItem onClick={handleClose}>Edit Task Name</MenuItem> */}
                                        <MenuItem onClick={(e) => handleClose(actionCard.viewCard, e)} >View Details</MenuItem>
                                        <MenuItem onClick={(e) => handleClose(actionCard.deleteCard, e)}>Delete Task</MenuItem>
                                    </Menu>
                                </div>

                                {/* <img className="files-task" src={require('../../../img/files-icon.png')} ></img> */}

                                {/* <button className="more col-4 mr-0">. . .</button> */}


                                {myFiles}
                                {/* <div>
                                    <span className="span-name-task mt-2" contentEditable={true} >
                                        {props.task.name}
                                    </span>

                                </div> */}
                                <textarea
                                    className={props.task.complete ? "autosize disabled form-control textarea-name-task col-12 mx-0" : "autosize textarea-name-task form-control col-12 mx-0"}
                                    style={props.task.files && props.task.files.length ? null : { 'marginTop': '12px' }}
                                    value={props.task.name}
                                    onClick={(e) => e.stopPropagation()}
                                    name="name"
                                    onChange={(e) => changeFiledInTask(e)}
                                // onBlur={(e) => editTask()}
                                // onKeyPress={event => {
                                //     if (event.key === 'Enter') {
                                //         editTask()
                                //     }
                                // }}
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

                                <div className=" icons-in-task-tabs pt-0">
                                    <div className="mx-2  row justify-content-between  mt-3 mb-0">
                                        <div className="p_task ">
                                            <div>
                                                {/* ? assingTo.contact.thumbnail */}
                                                {props.task.assignTo1 && props.task.assignTo1.length > 0 ? <div className="widthofContacts col-4">
                                                    {props.task.assignTo1 ? props.task.assignTo1.map((assingTo, index) => {
                                                        if (index < 2)
                                                            return assingTo.contact ? <img referrerpolicy="no-referrer" src={assingTo.contact.thumbnail} className="imgTeamTabs" />
                                                                : null
                                                    }) : null}
                                                    {props.task.assignTo1 ? <div className="imgTeam marginTeam " onClick={(e) => showAssigToOrCalander({ "e": e, "name": "share" })} >+{props.task.assignTo1.length > 2 ? props.task.assignTo1.length - 2 : null}</div> : null}
                                                </div> : <img
                                                    // id={`${props.task._id}assing-to`}
                                                    className="ml-1 assing-to-icon"
                                                    onClick={(e) => showAssigToOrCalander({ "e": e, "name": "share" })}
                                                    src={require('../../../../assets/img/share-icon.png')}>
                                                </img>}
                                            </div>


                                            <div>
                                                {props.task.milestones ?
                                                    <img className=" mr-1" referrerpolicy="no-referrer" src={require('../../../img/milstone.png')} />
                                                    : null}
                                            </div>
                                            <label for="fileFromTask">
                                                <img className="mr-1 ml-1" referrerpolicy="no-referrer" src={require('../../../img/attachment-alt.png')} />
                                            </label>
                                            <input
                                                type={"file"}
                                                id="fileFromTask"
                                                htmlFor="myInput"
                                                style={{
                                                    display: 'none',
                                                    background: 'red',
                                                    cursor: 'pointer',
                                                }}
                                                ref={fileInputRef}
                                                multiple
                                                onClick={(e) => setIndex(e)}
                                                onChange={(e) => uploadMulti(e)}
                                            />
                                        </div>

                                        <div className="icons-task-tabs">
                                            <div className="px-1"> {props.task.priority ?
                                                <img className="priority-img mr-1" referrerpolicy="no-referrer" src={props.task.priority.icon} />
                                                : null}
                                            </div>
                                            <div className="due-date-hover" title={title.title_due_date}>
                                                <p onClick={(e) => showAssigToOrCalander({ "e": e, "name": "calander" })}
                                                >{dateInString}</p>
                                            </div>
                                            <ReactTooltip className="tooltip-style" data-tip id="title_due" place="top" effect="solid">
                                                {title.title_due_date}
                                            </ReactTooltip>
                                            <div className="like-hover">
                                                <img
                                                    className="like-icon-tabs"
                                                    onClick={(e) => showAssigToOrCalander({ "e": e, "name": "like" })}
                                                    src={require('../../../../assets/img/like-icon.png')}>
                                                </img>
                                                <div onClick={(e) => updateLike(e)}>
                                                    <p className="pr-1">{props.task.likes.length > 0 ? props.task.likes.length : null}</p>
                                                    <img
                                                        onClick={updateLike}
                                                        src={userHasLike ? require('../../../../assets/img/heart.png') : require('../../../../assets/img/heart.png')}>
                                                        {/* src={userHasLike ? require('../../../img/heart.png') : props.task.likes.length > 0 ? require('../../../img/border-heart.svg') : require('../../../img/like-icon.png')}> */}
                                                    </img>
                                                </div>
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
        setFileFromTask: (file) => dispatch(actions.setFileFromTask(file)),
        addFile: (files) => dispatch(actions.addFile(files)),
        uploadFiles: (file) => dispatch(actions.uploadFiles(file)),
        setCountReadyTasks: (value) => dispatch(actions.setCountReadyTasks(value)),
        updateLike: (taskId) => dispatch(actions.updateLike(taskId)),
        EditTask: (task) => dispatch(actions.editTask(task)),
        setTaskStatus: (index) => dispatch(actions.setTaskStatus(index)),
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