import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

import { actions } from '../../../../redux/actions/action'
import Select from 'react-select';
import './taskDetails.css'
import UploadFile from '../../uploadFile/uploadFile'
import editStatus from '../../status/editStatus';
import File from '../../file/file'
import ViewAllStatuses from '../../status/viewAllStatuses';
import ReactTooltip from 'react-tooltip';
import title from '../../../../Data/title.json'
import imageCompression from "browser-image-compression";
import ContactList from '../../contact/contactList';
import Timer from '../../timer/timer'
import QuillEditTask from '../quilEditTask/quillEditTask';
import ModalFiles from '../../modalFIles/modalFiles';

function TaskDetails(props) {
    const nameRequired = useRef()
    let [taskBeforeChanges, setTaskBeforeChanges] = useState();
    const [flugFiles, setFlugFiles] = useState(false)
    const [showContactList, setShowContactList] = useState(false)
    const [taskName, setTaskName] = useState(props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].name)
    const [milstone, setMilstone] = useState()
    const [priorityTask, setPriorityTask] = useState()

    useEffect(() => {
        setMilstone(props.cards[props.indexCurrentCard] && props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].milestones)
        if (props.cards.length > 0) {
            setTaskBeforeChanges(({ ...props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask] }))
            props.setFilesFromTask(props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].files)

            props.objectBeforeChanges({ 'type': 'task', 'task': taskBeforeChanges })
            if (!(props.statuses && props.statuses.length > 0))
                props.getAllStatusesTaskForWorkspace();
            if (props.contactsUser.length === 0)
                props.getContactsForUser()
        }
        setTaskName(props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].name)
    }, [props.cards, milstone])


    let doneStatus = props.cards[props.indexCurrentCard] ? props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].complete : null
    useEffect(() => {
        doneStatus = props.cards[props.indexCurrentCard] ? props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].complete : null
    }, [ props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].complete])

    useEffect(() => {
    }, [props.arrFilesOfTask])
    useEffect(() => {
        return () => {
            props.EditTask(props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask])
        };
    }, [])
    const [openPopUp, setOpenPopUp] = useState(false)
    const [shoewModalFiles, setShoewModalFiles] = useState(false)
    const [url, setUrl] = useState('dddd')

    const openPopUpStatus = (event) => {
        setOpenPopUp(true)
        event.stopPropagation();

    }
    $(window).click(function () {
        setOpenPopUp(false)
    });

    function stopP(event) {
        event.stopPropagation();
    }
    function closeStatus(event) {
        setOpenPopUp(false)
    }
    function closeContactList(event) {
        setShowContactList(false)
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
    const saveTask = async () => {
        if (nameRequired.current.value) {
            if (milstone)
                props.viewToastMassege({ show: true, massege: 'Mark milstone!!' })
            props.objectBeforeChanges(null)
            let newFiles
            if (props.arrFilesOfTask)
                newFiles = props.arrFilesOfTask.filter((file) => file.url === 'new')
            if (newFiles.length) {
                newFiles = await compressedFile(newFiles)
                props.uploadFiles({ 'files': newFiles, 'task': props.task })
            }
            props.closeViewDetails();
        }
        else {
            nameRequired.current.focus()
            var form = document.getElementById('nameRequired')
            form.classList.add('was-validated')
        }
    }
    const viewPriortyList = props.priorities ? props.priorities.map(priority => (
        {
            value: priority,
            label:
                <div className="prioprty-select ">
                    <img referrerPolicy="no-referrer" src={priority.icon} />
                    <p >{priority.level}</p>
                </div>
        }
    )) : null

    const changePriority = (event) => {
        setPriorityTask(event.value)
        let editTaskInRedux = { "nameFiled": "priority", "value": event.value }
        props.setTaskByFiledFromTasks(editTaskInRedux)
        let editTask = { "_id": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]._id, "priority": event.value._id }
    };

    const deleteTask = (e) => {
        $(`#${props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]._id + "disappear"}`).css("display", "none")
        props.showToast({ 'type': 'Task', 'object': props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask] })
        props.closeViewDetails();

    }

    let dueDate = props.cards[props.indexCurrentCard] ? props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].dueDate : null;
    let startDate = props.cards[props.indexCurrentCard] ? props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].startDate : null;
    let dueDate_ = dueDate.split("/")[2] + '-' + dueDate.split("/")[1] + '-' + dueDate.split("/")[0];
    let startDate_ = startDate.split("/")[2] + '-' + startDate.split("/")[1] + '-' + startDate.split("/")[0];

    let [dueDateTask, setDueDateTask] = useState(dueDate_)
    let [startDateTask, setStartDateTask] = useState(startDate_)

    const changeFiledInTask = (input) => {
        let editTaskInRedux
        let value = input.target.value
        // setTaskName(input.target.value)
        if (input.target.name === "startDate") {
            value = value.split("-")[2] + '/' + value.split("-")[1] + '/' + value.split("-")[0];
            setStartDateTask(input.target.value)
        }
        else
            if (input.target.name === "dueDate") {
                value = value.split("-")[2] + '/' + value.split("-")[1] + '/' + value.split("-")[0];
                setDueDateTask(input.target.value)
            }
            else
                if (input.target.name === "milestones") {
                    setMilstone(!props.task.milestones)
                    value = !milstone
                    if (!milstone)
                    props.viewToastMassege({ show: true, massege: 'Task mark as milstone!!' })
                }
        editTaskInRedux = { "nameFiled": input.target.name, "value": value }
        props.setTaskByFiledFromTasks(editTaskInRedux)
    }
    const assingto = (e) => {
        var x = e.clientX;
        var y = e.clientY;
        var height = $(window).height();
        var width = $(window).width();
        props.setLeftContactList(x)
        props.setTopContactList(y)
        props.setWidthScreen(width)
        props.setHeightScreen(height)
        setShowContactList(true)
        // props.viewToastMassege({ show: true, massege: 'Completed task!!' })

    }
    function closeViewDetailsInTask() {
        props.setTaskFromTasks(taskBeforeChanges)
        props.closeViewDetails()
    }
    function func(val) {
        setShoewModalFiles(val)
    }

    const newFileComponentArr = props.arrFilesOfTask ? props.arrFilesOfTask.map((file) => {
        return <File file={file}
            setDownloadFile={(e) => { props.setDownloadFile(e) }}
            taskId=''
            url={(val) => setUrl(val)}
            shoewModalFiles={(val) => func(val)}
        />
    }) : null

    $('.assingto-details').hover(function () {
        $(this).find('.assingto-task').hide();
        $(this).find('.assingto-task-hover').show();
    }, function () {
        $(this).find('.assingto-task-hover').hide();
        $(this).find('.assingto-task').show();
    });
    $('.delete-details').hover(function () {
        $(this).find('.delete-task').hide();
        $(this).find('.delete-task-hover').show();

    }, function () {
        $(this).find('.delete-task-hover').hide();
        $(this).find('.delete-task').show();

    });
    $('.files-details').hover(function () {
        $(this).find('.files-task').hide();
        $(this).find('.files-task-hover').show();
    }, function () {
        $(this).find('.files-task-hover').hide();
        $(this).find('.files-task').show();
    });
    $('.complete-details ').hover(function () {
        $(this).find('.delete-task').hide();
        $(this).find('.complete-task-hover').show();
    }, function () {
        $(this).find('.complete-task-hover').hide();
        $(this).find('.delete-task').show();
    });
    const completeTask = () => {

            doneStatus = !doneStatus
            console.log("doneStatus:",doneStatus);
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        const yyyy = today.getFullYear()
        today = (dd <= 9 ? '0' + dd : dd) + '/' + (mm <= 9 ? '0' + mm : mm) + '/' + yyyy
        let completeTask = {
            "_id": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]._id,
            "name": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].name,
            "description": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].description?props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].description:null,
            "dueDate": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].dueDate,
            "startDate": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].startDate,
            "complete": doneStatus,
            "endDate": today,
            "likes": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].likes,
            "assignTo1": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].assignTo1,
            "status": props.statuses ? doneStatus ? props.statuses[2] : props.statuses[0] : null,
            "files": props.task.files ? props.task.files : null,
            "priority": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].priority?props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].priority:null
        }
       
        // let project = props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject]
        // props.editProjectInServer({ 'project': { 'id': project._id, 'countReadyTasks': project.countReadyTasks + 1 } })
        props.setTaskComplete(completeTask)//redux
        props.completeTask(completeTask)//server
        if (doneStatus) {
            props.setCountReadyTasks(true)
            // setShowChalalit(true)
            props.viewToastMassege({ show: true, massege: 'Completed task!!' })
        }
        else {
            props.setCountReadyTasks(false)
        }
    }
    const removeMemberFromAssign = (email) => {
        // props.setCurrentIndexTask(currentIndexTask)
        // props.setCurrentIndexCard(currentIndexCard)
        props.removeMemberFromAssign(email)
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
            if (e.key == 'Enter' && !e.shiftKey) {
                resize($(this));

                // prevent default behavior
                e.preventDefault();
            }
            if (e.key == 'Enter') {
                // editTask()
            }

        });

        function resize($text) {
            $text.css('height', 'auto');
            $text.css('height', $text[0].scrollHeight + 'px');
        }
    }

    return (
        <>
            {
                shoewModalFiles &&
                <ModalFiles url={url} show={(val) => setShoewModalFiles(val)} />
            }
            {props.cards[props.indexCurrentCard] && props.priorities.length > 0 &&
                <div>
                    {/* <div className="details task-details mr-4 ml-4" onClick={(e) => closeStatus(e)}> */}
                    <div className="details task-details ml-4" onClick={(e) => closeStatus(e)}>
                        <div className='propertiesViewDitails' onClick={(e) => closeContactList(e)}>
                            <div className='mr-4 '>
                                <div className='row mt-4 justify-content-between headerDitails'>
                                    <h5 className=" title-view-details   pl-3">Task details</h5>
                                    {/* <img className="files-task-hover" src={require('../../../assets/img/close.svg')} ></img> */}
                                    <div className="close pr-3" onClick={() => closeViewDetailsInTask()}>x</div>
                                </div>
                                <div className="row justify-content-between mx-1" >
                                    <label>Create
                                        {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].startDate}</label>
                                    <label className="">Last Update
                                        {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].updateDates ? props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].updateDates : null}</label>
                                </div>
                                <div className="form-group" id='nameRequired'>
                                    <label for="name">Name</label>
                                    <textarea
                                        required ref={nameRequired}
                                        className="autosize textarea-name-task form-control"
                                        value={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].name} onClick={(e) => e.stopPropagation()}
                                        name="name"
                                        onChange={(e) => changeFiledInTask(e)}
                                    />
                                    {/* <input name="name"
                                        required ref={nameRequired}
                                        className="form-control"
                                        id="name"
                                        onChange={(e) => changeFiledInTask(e)}
                                        // onChange={(e) => {setTaskName(e.target.value);changeFiledInTask(e)}}
                                        // value={taskName}
                                        // onBlur={(e) => editTaskInServer()}
                                        // onMouseLeave={(e) => alert("ff")}
                                        value={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].name} /> */}
                                    <div class="invalid-feedback">
                                        Please enter task name.
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <QuillEditTask />


                                    {/* <textarea className="form-control"
                                rows="3"
                                placeholder="Write a description about your workspace"
                                name="description"
                                value={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].description}
                                onChange={(e) => changeFiledInTask(e)}
                                // onBlur={(e) => editTaskInServer()}
                                contenteditable
                            ></textarea> */}
                                </div>
                                <div className="row justify-content-between">
                                    <div className="form-group col-md-6 col-lg-5">
                                        <label htmlFor="startDate">Start Date</label>
                                        <input
                                            className="form-control"
                                            name="startDate"
                                            type="date"
                                            id="startDate"
                                            value={startDateTask}
                                            onChange={(e) => changeFiledInTask(e)}
                                        // onBlur={(e) => editTaskInServer()}
                                        />
                                    </div>
                                    <div className="form-group col-md-6 col-lg-5">
                                        <label htmlFor="dueDate">Due Date</label>
                                        <input
                                            className="form-control "
                                            name="dueDate"
                                            type="date"
                                            id="dueDate"
                                            value={dueDateTask}
                                            onChange={(e) => changeFiledInTask(e)}
                                        // onBlur={(e) => editTaskInServer()}
                                        />
                                    </div>

                                </div>
                                <div className="row justify-content-between">
                                    <div className="dropdown col-md-6 col-lg-5">
                                        {/* form-control */}
                                        <label htmlFor="status">Status</label>

                                        <button onClick={(e) => openPopUpStatus(e)} className=" dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {props.cards[props.indexCurrentCard] && props.statuses && props.statuses.length > 0 ? <>
                                                <div
                                                    className="color-status-first px-3"
                                                    style={{ "backgroundColor": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status ? props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status.color : null }} >
                                                    {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status ? props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status.statusName : null}
                                                </div>
                                                {/* <div className="color-status-first col-3 mt-1 mx-1" style={{ "backgroundColor": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status.color }} > </div>
                                        <span className="ml-1">{props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status.statusName}</span> */}
                                            </> : null}
                                        </button>
                                        {openPopUp ?
                                            <div onClick={(e) => stopP(e)}>
                                                <ViewAllStatuses
                                                    task={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]}
                                                    status={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status}
                                                    openPopUp={openPopUp}
                                                    closeStatuses={(e) => setOpenPopUp(false)} />
                                            </div>
                                            : null}

                                    </div>
                                    <div className="col-md-6 col-lg-5">
                                        <span className="milestones-span mt-2">Mark as milestone</span>
                                        <label className="switch ml-2 mt-1">
                                            <input type="checkbox"
                                                name="milestones"
                                                checked={milstone}
                                                // value={props.task.milestones}
                                                onChange={(e) => changeFiledInTask(e)}
                                            // onBlur={(e) => editTaskInServer()}
                                            />
                                            <span className="slider round" ></span>
                                        </label>

                                    </div>

                                </div>
                                <div className="row justify-content-between ">
                                    <div className=" col-md-6 col-lg-5 mt-2 priority-task-details">
                                        <label htmlFor="priority">Priority</label>

                                        <Select
                                            isSearchable={false}
                                            name="priority"
                                            // classNamePrefix="select"
                                            options={viewPriortyList}
                                            placeholder={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].priority ?
                                                <div className="prioprty-select  dropdown-toggle">
                                                    <img referrerPolicy="no-referrer" src={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].priority.icon} />
                                                    <p >{props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].priority.level}</p>
                                                </div> : <div className="prioprty-select  dropdown-toggle">
                                                    <img referrerPolicy="no-referrer" src={props.priorities[0].icon} />
                                                    <p >{props.priorities[0].level}</p>
                                                </div>}
                                            onChange={(e) => changePriority(e)}
                                        />
                                    </div>
                                    <div className="form-group col-md-6 col-lg-5 priority-task-details">
                                        <Timer></Timer>
                                    </div>
                                </div >
                            </div >

                            <div className='row  mt-3 d-flex justify-content-between mr-3 ml-3'>
                                {newFileComponentArr}
                            </div>
                            <hr></hr>

                        </div >

                        <div className="row   ">

                            {/* {props.task.assingTo ?

                        props.task.assingTo.contact.thumbnail ? <img referrerPolicy="no-referrer" src={props.task.assingTo.contact.thumbnail} className="thumbnail-contact-details mr-1 mt-1" />
                            : <div className="logo-contact-details mr-1 mt-1" >{props.task.assingTo.contact.name ? props.task.assingTo.contact.name[0] : null}</div>
                        : null} */}
                            <div className="assingto-details mr-2" data-tip data-for="assing">

                                <img className="assingto-task" src={require('../../../../assets/img/share-contact.svg')} ></img>
                                <img className="assingto-task-hover" src={require('../../../../assets/img/share-hover.png')} onClick={(e) => assingto(e)}></img>
                                <ReactTooltip className="tooltip-style" data-tip id="assing" place="top" effect="solid">
                                    {title.title_assing}
                                </ReactTooltip>
                            </div>
                            <div className=" files-details mx-1" data-tip id="files">
                                <UploadFile />
                                <img className="files-task" src={require('../../../../assets/img/files-icon.svg')} ></img>
                                <img data-tip id="files" className="files-task-hover" src={require('../../../../assets/img/files-hover.png')} ></img>
                                <ReactTooltip className="tooltip-style" place="top" effect="solid">
                                    {title.title_files}
                                </ReactTooltip>
                            </div>
                            <div className="delete-details mx-1" data-tip data-for="delete">
                                <img className="delete-task" src={require('../../../../assets/img/delete-icon.svg')} onClick={(e) => deleteTask(e)} ></img>
                                <img className="delete-task-hover" src={require('../../../../assets/img/delete-hover.png')} onClick={(e) => deleteTask(e)} ></img>
                                <ReactTooltip className="tooltip-style" data-tip id="delete" place="top" effect="solid" >
                                    {title.title_delete}
                                </ReactTooltip>
                            </div>
                            <div className="complete-details mx-1">
                                <img className="delete-task" src={require('../../../../assets/img/delete-icon.svg')} ></img>
                                <img className="complete-task-hover" src={require('../../../../assets/img/complete-hover.svg')} onClick={(e)=>completeTask(e)}></img>
                             
                            </div>
                            {showContactList ?
                                <ContactList viewToastMassege={props.viewToastMassege} closeContactList={(e) => setShowContactList(false)} taskDetails={true} ></ContactList> : null
                            }
                            <div className="widthofContacts col-4 mt-1 ml-1">
                                {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].assignTo ? props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].assignTo.map((assingTo, index) => {
                                    if (index < 3)
                                        // return assingTo.contact.thumbnail ? <img referrerPolicy="no-referrer" src={assingTo.contact.thumbnail} className="imgContact" />
                                        return assingTo.contact !== null ? <> <img referrerPolicy="no-referrer" src={assingTo.contact.thumbnail} className="imgContact" /><p className="remove-member-from-assign" onClick={(e) => removeMemberFromAssign(assingTo.contact.email)}>x</p>
                                        </>

                                            : null
                                }) : null}
                                {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].assignTo && props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].assignTo.length > 3 ? <div className="imgContact  marginTeam">+{props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].assignTo.length - 3}</div> : null}
                            </div>

                            {/* <button onClick={(e) => completeTask(e)}>complete</button> */}

                            <button data-tip data-for="save" onClick={(e) => saveTask(e)} className=" save_canges_btn col-3 mr-0 ml-3 btn-block mb-lg-4">Save</button>
                            <ReactTooltip className="tooltip-style" data-tip id="save" place="top" effect="solid" >
                                {title.title_save}
                            </ReactTooltip>
                        </div>
                    </div >
                </div >}
        </>

    )
}

const mapStateToProps = (state) => {
    return {
        tasks: state.public_reducer.tasks,
        user: state.public_reducer.userName,
        statuses: state.status_reducer.statuses,
        cards: state.public_reducer.cards,
        indexCurrentCard: state.public_reducer.indexCurrentCard,
        indexCurrentTask: state.public_reducer.indexCurrentTask,
        arrFilesOfTask: state.public_reducer.arrFilesOfTask,
        arrDeleteFilesOfTask: state.public_reducer.arrDeleteFilesOfTask,
        contactsUser: state.share_reducer.contactsUser,
        priorities: state.public_reducer.priorities,


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeFile: (file) => dispatch(actions.removeFile(file)),
        uploadFiles: (uploadFile) => dispatch(actions.uploadFiles(uploadFile)),
        EditTask: (task) => dispatch(actions.editTask(task)),
        setTaskName: (name) => dispatch(actions.setTaskNameInTaskReducer(name)),
        getAllStatusesTaskForWorkspace: () => dispatch(actions.getAllStatusesTaskForWorkspace()),
        createStatus: (status) => dispatch(actions.createStatus(status)),
        setFilesFromTask: (task) => dispatch(actions.setFilesFromTask(task)),
        setTaskByFiledFromTasks: (taskDetails) => dispatch(actions.setTaskByFiledFromTasks(taskDetails)),
        setTaskFromTasks: (task) => dispatch(actions.setTaskFromTasks(task)),
        getContactsForUser: () => dispatch(actions.getContactsForUser()),
        setTopContactList: (top) => dispatch(actions.saveTopContactListInRedux(top)),
        setLeftContactList: (left) => dispatch(actions.saveLeftContactListInRedux(left)),
        setWidthScreen: (width) => dispatch(actions.saveWidthScreenInRedux(width)),
        setHeightScreen: (height) => dispatch(actions.saveHeightScreenInRedux(height)),
        removeMemberFromAssign: (member) => dispatch(actions.removeMemberFromAssign(member)),
        setTaskComplete: (completeDetails) => dispatch(actions.setTaskComplete(completeDetails)),
        completeTask: (task) => dispatch(actions.completeTask(task)),
        setCountReadyTasks: (value) => dispatch(actions.setCountReadyTasks(value)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)