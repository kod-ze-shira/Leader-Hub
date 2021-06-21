import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

import { actions } from '../../../../../redux/actions/action'
import '../../taskDetails/taskDetails.css'
import UploadFile from '../../../uploadFile/uploadFile'
import File from '../../../uploadFile/file/file'
// import ViewAllStatuses from '../../../status/viewAllStatuses';
import ReactTooltip from 'react-tooltip';
import title from '../../../../../Data/title.json'
import imageCompression from "browser-image-compression";

function TaskNotBelongDetails(props) {
    const nameRequired = useRef()
    const [taskBeforeChanges] = useState({ ...props.task })
    // const [completeTask, setCompleteTask] = useState(props.task.complete)


    useEffect(() => {
        props.objectBeforeChanges({ 'type': 'task', 'task': taskBeforeChanges })
        props.setFilesFromTask(props.task.files)

    }, [props.task])

    // const [milstone, setMilstone] = useState(props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].milestones)
    const [openPopUp, setOpenPopUp] = useState(false)
    const [fileComponentArr, setFileComponentArr] = useState([])

    // const openPopUpStatus = (event) => {
    //     setOpenPopUp(true)
    //     event.stopPropagation();
    // }
    $(window).click(function () {
        setOpenPopUp(!openPopUp)
    });


    function stopP(event) {
        event.stopPropagation();
    }
    // function closeStatus(event) {

    //     setOpenPopUp(false)
    // }

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
            props.objectBeforeChanges(null)
            let newFiles
            if (props.arrFilesOfTask)
                newFiles = props.arrFilesOfTask.filter((file) => file.url === 'new')
            if (newFiles.length) {
                newFiles = await compressedFile(newFiles)
                props.uploadFiles({ 'files': newFiles, 'task': props.task, 'type': 'taskNotBelong' })
            }
            else
                if (props.arrDeleteFilesOfTask.length) {


                    let arrayUrl = []
                    for (let index = 0; index < props.arrDeleteFilesOfTask.length; index++) {
                        arrayUrl.push(props.arrDeleteFilesOfTask[index].url)
                        // props.task.files.filter((myFile) => myFile.url == props.arrDeleteFilesOfTask[index].url)
                        for (let index2 = 0; index2 < props.task.files.length; index2++) {
                            if (props.arrDeleteFilesOfTask[index]._id == props.task.files[index2]._id) {
                                props.task.files.splice(index2, 1);
                                // delete props.task.files[index2];
                            }
                            // first element removed
                        }
                        // props.task.files.filter((myFile) => myFile.url != props.arrDeleteFilesOfTask[index].url)

                    }

                    props.removeFile(arrayUrl)
                    props.EditTask(props.task)

                } else
                    props.EditTask({ 'type': 'taskNotBelong2', 'idTask': props.task._id })
            props.closeViewDetails();

        }
        else {
            nameRequired.current.focus()
            var form = document.getElementById('nameRequired')
            form.classList.add('was-validated')
        }
    }



    const deleteTask = (e) => {
        $(`#${props.task._id + "disappear"}`).css("display", "none")
        props.showToast({ 'type': 'Task', 'object': props.task })
        props.closeViewDetails();

    }

    let dueDate = props.task.dueDate;
    let startDate = props.task.startDate;
    let dueDate_ = dueDate.split("/")[2] + '-' + dueDate.split("/")[1] + '-' + dueDate.split("/")[0];
    let startDate_ = startDate.split("/")[2] + '-' + startDate.split("/")[1] + '-' + startDate.split("/")[0];

    let [dueDateTask, setDueDateTask] = useState(dueDate_)
    let [startDateTask, setStartDateTask] = useState(startDate_)


    const changeFiledInTask = (input) => {
        let editTaskInRedux
        let value = input.target.value
        if (input.target.name === "startDate") {
            value = value.split("-")[2] + '/' + value.split("-")[1] + '/' + value.split("-")[0];
            setStartDateTask(input.target.value)
        }
        else
            if (input.target.name === "dueDate") {
                value = value.split("-")[2] + '/' + value.split("-")[1] + '/' + value.split("-")[0];
                setDueDateTask(input.target.value)
            }
        // else
        //     if (input.target.name == "milestones") {
        //         setMilstone(!props.task.milestones)
        //         value = !milstone
        //     }
        editTaskInRedux = { "nameFiled": input.target.name, "value": value, 'idTask': props.task._id }
        props.setTaskByFiledFromTasksNotBelong(editTaskInRedux)
    }
    // function filesInTask() {
    //     let newComponent
    //     props.task.files.map((file) => {
    //         newComponent = addFileComponent(file)
    //         if (!fileComponentArr.length)
    //             setFileComponentArr([newComponent])
    //         else
    //             setFileComponentArr([...fileComponentArr, newComponent])
    //     })
    // }
    $('.files-details').hover(function () {
        $(this).find('.files-task').hide();
        $(this).find('.files-task-hover').show();
    }, function () {
        $(this).find('.files-task-hover').hide();
        $(this).find('.files-task').show();
    });

    $('.delete-details').hover(function () {
        $(this).find('.delete-task').hide();
        $(this).find('.delete-task-hover').show();

    }, function () {
        $(this).find('.delete-task-hover').hide();
        $(this).find('.delete-task').show();

    });


    function closeViewDetailsInTask() {
        props.setTaskFromTasksNotBelong(taskBeforeChanges)
        props.closeViewDetails()
    }

    const newFileComponentArr = props.arrFilesOfTask ? props.arrFilesOfTask.map((file) => {
        return <File file={file}
            setDownloadFile={(e) => props.setDownloadFile(e)}
        />
    }) : null
    return (
        <>
            <div className="details task-details ml-4"
                onClick={(e) => stopP(e)}
            >
                <div className='propertiesViewDitails'>
                    <div className='mr-4 '>
                        <div className='row mt-4 justify-content-between headerDitails'>
                            <h5 className=" title-view-details   pl-3">Task details</h5>
                            <div class="close pr-3" onClick={() => closeViewDetailsInTask()}>x</div>

                        </div>

                        <div className="row justify-content-between mx-1" >
                            <label>Create {props.task.startDate}</label>
                            <label className="">Last Update {props.task.dueDate}</label>
                        </div>
                        <div class="form-group" id='nameRequired'>
                            <label for="name">Name</label>
                            <input name="name"
                                required ref={nameRequired}
                                type="text" class="form-control"
                                id="name"
                                onChange={(e) => changeFiledInTask(e)}
                                value={props.task.name} />
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
                                value={props.task.description}
                                onChange={(e) => changeFiledInTask(e)} contentEditable
                            ></textarea>
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
                        </div>
                    </div>
                    <div className='row  d-flex justify-content-between mr-3 ml-3'>
                        {newFileComponentArr}
                    </div>
                    <hr></hr>

                </div>

                <div className="row justify-content-around mx-1 ">

                    <div className="delete-details">
                        <img className="delete-task" src={require('../../../../img/delete-icon.png')} onClick={(e) => deleteTask(e)} ></img>
                        <img className="delete-task-hover" src={require('../../../../img/delete-hover.png')} onClick={(e) => deleteTask(e)} ></img>
                    </div>

                    <div className="files-details ">
                        <UploadFile />
                        <img className="files-task" src={require('../../../../img/files-icon.png')} ></img>
                        <img className="files-task-hover" src={require('../../../../img/files-hover.png')} ></img>
                    </div>

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
        createStatus: (status) => dispatch(actions.createStatus(status)),
        setFilesFromTask: (task) => dispatch(actions.setFilesFromTask(task)),
        setTaskByFiledFromTasksNotBelong: (taskDetails) => dispatch(actions.setTaskByFiledFromTasksNotBelong(taskDetails)),
        setTaskFromTasksNotBelong: (task) => dispatch(actions.setTaskFromTasksNotBelong(task)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskNotBelongDetails)