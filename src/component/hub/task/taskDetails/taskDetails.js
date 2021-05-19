import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

import { actions } from '../../../../redux/actions/action'
import Select from 'react-select';
import './taskDetails.css'
import task_reducer from '../../../../redux/Reducers/task_reducer';
import { createStatus } from '../../../../redux/middleware/statusCrud';
import ViewStatus from '../../status/viewStatus'
import AddStatus from '../../status/addStatus'
import UploadFile from '../../uploadFile/uploadFile'
import editStatus from '../../status/editStatus';
import File from '../../uploadFile/file/file'
import ViewAllStatuses from '../../status/viewAllStatuses';
import file from '../../uploadFile/file/file';
import ReactTooltip from 'react-tooltip';
import title from '../../../../Data/title.json'
import imageCompression from "browser-image-compression";

function TaskDetails(props) {
    const nameRequired = useRef()
    const [taskBeforeChanges] = useState({ ...props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask] })
    const [flugFiles, setFlugFiles] = useState(false)
    // const [completeTask, setCompleteTask] = useState(props.task.complete)


    useEffect(() => {
        props.objectBeforeChanges({ 'type': 'task', 'task': taskBeforeChanges })
        props.setFilesFromTask(props.task.files)
        if (!(props.statuses && props.statuses.length > 0))
            props.getAllStatusesTaskForWorkspace();

    }, [props.cards])

    const [milstone, setMilstone] = useState(props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].milestones)
    const [openPopUp, setOpenPopUp] = useState(false)
    const [fileComponentArr, setFileComponentArr] = useState([])
    const [showUploadFiles, setShowUploadFiles] = useState(false)

    const openPopUpStatus = (event) => {
        setOpenPopUp(true)
        event.stopPropagation();

    }
    $(window).click(function () {
        setOpenPopUp(!openPopUp)
    });


    function stopP(event) {
        event.stopPropagation();
    }
    function closeStatus(event) {
        setOpenPopUp(false)
    }
    function addFile(event) {
        setShowUploadFiles(true)
    }
    const compressedFile = async (myFiles) => {

        let compressedFile;
        let compressedFiles = [];

        await Promise.all(
            myFiles.map(async (file) => {
                if (file.file.type.includes("image")) {
                    console.log("in img type");
                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                    };
                    // console.log(file);
                    compressedFile = await imageCompression(file.file, options);
                    // console.log("compressedFile  " + JSON.stringify(compressedFile));
                    console.log(
                        "compressedFile instanceof Blob",
                        compressedFile instanceof Blob
                    ); // true
                    // console.log(
                    //     `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
                    // );
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
            props.objectBeforeChanges(null)
            let newFiles
            if (props.arrFilesOfTask)
                newFiles = props.arrFilesOfTask.filter((file) => file.url == 'new')
            if (newFiles.length) {
                newFiles = await compressedFile(newFiles)
                props.uploadFiles({ 'files': newFiles, 'task': props.task })
            }
            else
                if (props.arrDeleteFilesOfTask.length) {
                    for (let index = 0; index < props.arrDeleteFilesOfTask.length; index++) {
                        // props.task.files.filter((myFile) => myFile.url == props.arrDeleteFilesOfTask[index].url)
                        for (let index2 = 0; index2 < props.task.files.length; index2++) {
                            if (props.arrDeleteFilesOfTask[index]._id == props.task.files[index2]._id) {
                                console.log(props.task.files)
                                let r = props.task.files
                                r.splice(index2, 1);
                            }
                            // first element removed
                        }
                        // props.task.files.filter((myFile) => myFile.url != props.arrDeleteFilesOfTask[index].url)

                    }
                    let r = props.task.files
                    props.EditTask(props.task)
                    // props.removeFile(props.ArrDeleteFilesOfTask)

                } else
                    props.EditTask(props.task)
            props.closeViewDetails();

        }
        else {
            nameRequired.current.focus()
            var form = document.getElementById('nameRequired')
            form.classList.add('was-validated')
        }
    }



    const deleteTask = (e) => {
        $(`#${props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]._id + "disappear"}`).css("display", "none")
        props.showToast({ 'type': 'Task', 'object': props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask] })
        props.closeViewDetails();

    }

    let dueDate = props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].dueDate;
    let startDate = props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].startDate;
    let dueDate_ = dueDate.split("/")[2] + '-' + dueDate.split("/")[1] + '-' + dueDate.split("/")[0];
    let startDate_ = startDate.split("/")[2] + '-' + startDate.split("/")[1] + '-' + startDate.split("/")[0];

    let [dueDateTask, setDueDateTask] = useState(dueDate_)
    let [startDateTask, setStartDateTask] = useState(startDate_)


    const changeFiledInTask = (input) => {
        let editTaskInRedux
        let value = input.target.value
        if (input.target.name == "startDate") {
            value = startDateTask.split("-")[2] + '/' + startDateTask.split("-")[1] + '/' + startDateTask.split("-")[0];
            setStartDateTask(input.target.value)
        }
        else
            if (input.target.name == "dueDate") {
                value = dueDateTask.split("-")[2] + '/' + dueDateTask.split("-")[1] + '/' + dueDateTask.split("-")[0];
                setDueDateTask(input.target.value)
            }
            else
                if (input.target.name == "milestones") {
                    setMilstone(!props.task.milestones)
                    value = !milstone
                }
        editTaskInRedux = { "nameFiled": input.target.name, "value": value }
        props.setTaskByFiledFromTasks(editTaskInRedux)
    }
    function filesInTask() {
        let newComponent
        props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].files.map((file) => {
            newComponent = addFileComponent(file.url, file.name)
            if (!fileComponentArr.length)
                setFileComponentArr([newComponent])
            else
                setFileComponentArr([...fileComponentArr, newComponent])
        })
    }
    const addFileComponent = (urlFile, nameFile) => {
        return <File urlFile={urlFile} nameFile={nameFile} />
    }

    function closeViewDetailsInTask() {
        props.setTaskFromTasks(taskBeforeChanges)
        props.closeViewDetails()
    }

    const newFileComponentArr = props.arrFilesOfTask ? props.arrFilesOfTask.map((file) => {
        return <File url={file.url} name={file.name} />
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


    return (
        <>
            <div className="details task-details mr-4 ml-4" onClick={(e) => closeStatus(e)}>
                <div className='propertiesViewDitails'>
                    <div className='row mt-4 justify-content-between headerDitails'>
                        <h5 className=" title-view-details   pl-3">Task details</h5>
                        <div class="close pr-3" onClick={() => closeViewDetailsInTask()}>x</div>
                        {/* <h5 className="mt-5 title-view-details pb-2">Task details</h5> */}

                    </div>

                    <div className="row justify-content-between mx-1" >
                        <label>Create {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].startDate}</label>
                        <label className="">Last Update {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].dueDate}</label>
                    </div>
                    <div class="form-group" id='nameRequired'>
                        <label for="name">Name</label>
                        <input name="name"
                            required ref={nameRequired}
                            type="text" class="form-control"
                            id="name"
                            onChange={(e) => changeFiledInTask(e)}
                            value={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].name} />
                        <div class="invalid-feedback">
                            Please enter task name.
                     </div>
                    </div>

                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control"
                            rows="3"
                            placeholder="Write a description about your workspace"
                            name="description"
                            value={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].description}
                            onChange={(e) => changeFiledInTask(e)} contentEditable
                        ></textarea>
                    </div>
                    {/* <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control" name="description"
                            id="descriptionProject" rows="2"
                            onChange={(e) => changeFiledInTask(e)}
                            value={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].description}>
                        </textarea>
                    </div>
                 */}
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
                            />
                        </div>

                    </div>
                    <div className="row justify-content-between">
                        <div class="dropdown col-md-6 col-lg-5">
                            <button onClick={(e) => openPopUpStatus(e)} class="form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {props.statuses && props.statuses.length > 0 ? <>

                                    <div className="color-status-first col-3 mt-1 mx-1" style={{ "backgroundColor": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status.color }} > </div>
                                    <span className="ml-1">{props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status.statusName}</span>
                                </> : null}
                            </button>
                            {openPopUp ?
                                <div onClick={(e) => stopP(e)}>
                                    <ViewAllStatuses
                                        task={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]}
                                        status={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status}
                                        openPopUp={openPopUp} />
                                </div>
                                : null}

                        </div>
                        {/* <div className="row mb-3"> */}
                        <div className="col-md-6 col-lg-5">
                            <span className="milestones-span mt-2">Mark as milestone</span>
                            <label className="switch ml-2 mt-1">
                                <input type="checkbox"
                                    name="milestones"
                                    checked={milstone}
                                    value={props.task.milestones}
                                    onChange={(e) => changeFiledInTask(e)}
                                />
                                <span className="slider round" ></span>


                            </label>
                        </div>
                    </div>
                    {/* </div> */}
                    {newFileComponentArr}
                    {showUploadFiles ? < UploadFile /> : null}
                    <hr></hr>

                </div>

                <div className="row justify-content-around mx-1 ">

                    {/* <div className="btn-option-in-task col-3"> */}
                    <div className="delete-details">
                        <img className="delete-task" src={require('../../../img/delete-icon.png')} onClick={(e) => deleteTask(e)} ></img>
                        <img className="delete-task-hover" src={require('../../../img/delete-hover.png')} onClick={(e) => deleteTask(e)} ></img>
                    </div>
                    <div className="files-details ">
                        <img className="files-task" src={require('../../../img/share-icon.png')}></img>
                        <img className="files-task-hover" src={require('../../../img/share-hover.png')} onClick={(e) => deleteTask(e)} ></img>
                    </div>
                    <div className="assingto-details ">
                        <img className="assingto-task" src={require('../../../img/files-icon.png')} onClick={(e) => addFile(e)}></img>
                        <img className="assingto-task-hover" src={require('../../../img/files-hover.png')} onClick={(e) => addFile(e)}></img>
                    </div>
                    {/* </div> */}
                    <button data-tip data-for="save" onClick={(e) => saveTask(e)} className=" save_canges_btn offset-4  col-3 btn-block mb-lg-4">Save</button>
                    <ReactTooltip data-tip id="save" place="top" effect="solid">
                        {title.title_save}
                    </ReactTooltip>
                </div>
            </div>

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
        arrDeleteFilesOfTask: state.public_reducer.arrDeleteFilesOfTask

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

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)