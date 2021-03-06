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
    // const [completeTask, setCompleteTask] = useState(props.task.complete)
    const [milstone, setMilstone] = useState()

    useEffect(() => {
        setMilstone(props.cards[props.indexCurrentCard] && props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].milestones)
        console.log(props.task.assingTo1);
        if (props.cards.length > 0) {
            setTaskBeforeChanges(({ ...props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask] }))
            props.setFilesFromTask(props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].files)

            props.objectBeforeChanges({ 'type': 'task', 'task': taskBeforeChanges })
            if (!(props.statuses && props.statuses.length > 0))
                props.getAllStatusesTaskForWorkspace();
            if (props.contactsUser.length == 0)
                props.getContactsForUser()
        }
    }, [props.cards, milstone])

    // useEffect(() => {
    //     // nameRequired.current.focus();
    // }, [])

    let doneStatus = props.cards[props.indexCurrentCard] ? props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].complete : null
    useEffect(() => {


    }, [props.arrFilesOfTask])
    const [openPopUp, setOpenPopUp] = useState(false)
    const [fileComponentArr, setFileComponentArr] = useState([])
    const [startTimerComp, setStartTimerComp] = useState(false)
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
                newFiles = props.arrFilesOfTask.filter((file) => file.url == 'new')
            if (newFiles.length) {
                newFiles = await compressedFile(newFiles)
                props.uploadFiles({ 'files': newFiles, 'task': props.task })
            }
            else
                props.EditTask(props.task)
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
                    <img referrerpolicy="no-referrer" src={priority.icon} />
                    <p >{priority.level}</p>
                </div>
        }
    )) : null

    const [priorityTask, setPriorityTask] = useState()
    const changePriority = (event) => {
        setPriorityTask(event.value)
        console.log(priorityTask);
        let editTaskInRedux = { "nameFiled": "priority", "value": event.value }
        props.setTaskByFiledFromTasks(editTaskInRedux)
        let editTask = { "_id": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]._id, "priority": event.value._id }
        console.log(editTask)
        props.EditTask(editTask)
    };

    const deleteTask = (e) => {
        $(`#${props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]._id + "disappear"}`).css("display", "none")
        props.showToast({ 'type': 'Task', 'object': props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask] })
        props.closeViewDetails();

    }

    // let dueDate = props.cards[props.indexCurrentCard] ? props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].dueDate : null;
    // let startDate = props.cards[props.indexCurrentCard] ? props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].startDate : null;
    let dueDate_ = ''// dueDate.split("/")[2] + '-' + dueDate.split("/")[1] + '-' + dueDate.split("/")[0];
    let startDate_ = ''//startDate.split("/")[2] + '-' + startDate.split("/")[1] + '-' + startDate.split("/")[0];

    let [dueDateTask, setDueDateTask] = useState(dueDate_)
    let [startDateTask, setStartDateTask] = useState(startDate_)


    const changeFiledInTask = (input) => {
        let editTaskInRedux
        let value = input.target.value
        if (input.target.name == "startDate") {
            value = value.split("-")[2] + '/' + value.split("-")[1] + '/' + value.split("-")[0];
            setStartDateTask(input.target.value)
        }
        else
            if (input.target.name == "dueDate") {
                value = value.split("-")[2] + '/' + value.split("-")[1] + '/' + value.split("-")[0];
                setDueDateTask(input.target.value)
            }
            else
                if (input.target.name == "milestones") {
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
    }
    function closeViewDetailsInTask() {
        props.setTaskFromTasks(taskBeforeChanges)
        props.closeViewDetails()
    }
    function func(val) {
        // alert(val)
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
    const completeTask = () => {
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        const yyyy = today.getFullYear()
        today = (dd <= 9 ? '0' + dd : dd) + '/' + (mm <= 9 ? '0' + mm : mm) + '/' + yyyy
        let completeTask = {
            "_id": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]._id,
            "name": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].name,
            "description": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].description,
            "dueDate": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].dueDate,
            "startDate": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].startDate,
            "complete": doneStatus,
            "endDate": today,
            "likes": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].likes,
            "assingTo": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].assingTo,
            "status": props.statuses ? doneStatus ? props.statuses[2] : props.statuses[0] : null,
            "files": props.task.files ? props.task.files : null,
            "priority": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].priority

        }
        // let project = props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject]
        // props.editProjectInServer({ 'project': { 'id': project._id, 'countReadyTasks': project.countReadyTasks + 1 } })

        props.setTaskComplete(completeTask)//redux
        props.completeTask(completeTask)//server
        if (doneStatus) {
            props.setCountReadyTasks(true)
            // setShowChalalit(true)

            props.viewToastMassege({ show: true, massege: 'comlited task!!' })
        }
        else {
            props.setCountReadyTasks(false)
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

                                    <div class="close pr-3" onClick={() => closeViewDetailsInTask()}>x</div>
                                </div>

                                <div className="row justify-content-between mx-1" >
                                    <label>Create
                                        {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].startDate}</label>
                                    <label className="">Last Update
                                        {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].updateDates ? props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].updateDates : null}</label>
                                </div>
                                <div class="form-group" id='nameRequired'>
                                    <label for="name">Name</label>
                                    <input name="name"
                                        required ref={nameRequired}
                                        class="form-control"
                                        id="name"
                                        onChange={(e) => changeFiledInTask(e)}
                                        // onBlur={(e) => editTaskInServer()}
                                        // onMouseLeave={(e) => alert("ff")}
                                        value={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].name} />
                                    <div class="invalid-feedback">
                                        Please enter task name.
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <QuillEditTask />


                                    {/* <textarea class="form-control"
                                rows="3"
                                placeholder="Write a description about your workspace"
                                name="description"
                                value={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].description}
                                onChange={(e) => changeFiledInTask(e)}
                                // onBlur={(e) => editTaskInServer()}
                                contentEditable
                            ></textarea> */}
                                </div>
                                <div className="row justify-content-between">
                                    <div class="form-group col-md-6 col-lg-5">
                                        <label for="startDate">Start Date</label>
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
                                    <div class="form-group col-md-6 col-lg-5">
                                        <label for="dueDate">Due Date</label>
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
                                    <div class="dropdown col-md-6 col-lg-5">
                                        {/* form-control */}
                                        <label for="status">Status</label>

                                        <button onClick={(e) => openPopUpStatus(e)} class=" dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                                                value={props.task.milestones}
                                                onChange={(e) => changeFiledInTask(e)}
                                            // onBlur={(e) => editTaskInServer()}
                                            />
                                            <span className="slider round" ></span>
                                        </label>

                                    </div>

                                </div>
                                <div className="row justify-content-between ">
                                    <div className=" col-md-6 col-lg-5 mt-2 priority-task-details">
                                        <label for="priority">Priority</label>

                                        <Select
                                            isSearchable={false}
                                            name="priority"
                                            // classNamePrefix="select"
                                            options={viewPriortyList}
                                            placeholder={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].priority ?
                                                <div className="prioprty-select  dropdown-toggle">
                                                    <img referrerpolicy="no-referrer" src={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].priority.icon} />
                                                    <p >{props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].priority.level}</p>
                                                </div> : <div className="prioprty-select  dropdown-toggle">
                                                    <img referrerpolicy="no-referrer" src={props.priorities[0].icon} />
                                                    <p >{props.priorities[0].level}</p>
                                                </div>}
                                            onChange={(e) => changePriority(e)}
                                        />
                                    </div>
                                    <div className="form-group col-md-6 col-lg-5 priority-task-details">
                                        <Timer></Timer>
                                    </div>
                                </div>
                            </div>

                            <div className='row  mt-3 d-flex justify-content-between mr-3 ml-3'>
                                {newFileComponentArr}
                            </div>
                            <hr></hr>

                        </div>

                        <div className="row   ">

                            {/* {props.task.assingTo ?

                        props.task.assingTo.contact.thumbnail ? <img referrerpolicy="no-referrer" src={props.task.assingTo.contact.thumbnail} className="thumbnail-contact-details mr-1 mt-1" />
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
                                <img className="files-task" src={require('../../../../assets/img/files-icon.png')} ></img>
                                <img data-tip id="files" className="files-task-hover" src={require('../../../../assets/img/files-hover.png')} ></img>
                                <ReactTooltip className="tooltip-style" place="top" effect="solid">
                                    {title.title_files}
                                </ReactTooltip>
                            </div>
                            <div className="delete-details mx-2" data-tip data-for="delete">
                                <img className="delete-task" src={require('../../../../assets/img/delete-icon.png')} onClick={(e) => deleteTask(e)} ></img>
                                <img className="delete-task-hover" src={require('../../../../assets/img/delete-hover.png')} onClick={(e) => deleteTask(e)} ></img>
                                <ReactTooltip className="tooltip-style" data-tip id="delete" place="top" effect="solid" >
                                    {title.title_delete}
                                </ReactTooltip>
                            </div>
                            {showContactList ?
                                <ContactList closeContactList={(e) => setShowContactList(false)} taskDetails={true} ></ContactList> : null
                            }
                            <div className="widthofContacts col-4 mt-1 ml-1">
                                {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].assignTo1 ? props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].assignTo1.map((assingTo, index) => {
                                    if (index < 3)
                                        // return assingTo.contact.thumbnail ? <img referrerpolicy="no-referrer" src={assingTo.contact.thumbnail} className="imgContact" />
                                        return assingTo.contact !== null ? <img referrerpolicy="no-referrer" src={assingTo.contact.thumbnail} className="imgContact" />

                                            : null
                                }) : null}
                                {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].assignTo1 && props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].assignTo1.length > 3 ? <div className="imgContact  marginTeam">+{props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].assignTo1.length - 3}</div> : null}
                            </div>

                            {/* <button onClick={(e) => completeTask(e)}>complete</button> */}

                            <button data-tip data-for="save" onClick={(e) => saveTask(e)} className=" save_canges_btn col-3 mr-0 ml-3 btn-block mb-lg-4">Save</button>
                            <ReactTooltip className="tooltip-style" data-tip id="save" place="top" effect="solid" >
                                {title.title_save}
                            </ReactTooltip>
                        </div>
                    </div>
                </div>}
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

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)