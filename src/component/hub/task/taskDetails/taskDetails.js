import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'

import { actions } from '../../../../redux/actions/action'
import Select from 'react-select';
import './taskDetails.css'
import task_reducer from '../../../../redux/Reducers/task_reducer';
import { createStatus } from '../../../../redux/middleware/statusCrud';
// import ViewAllStatuses from '../../status/viewAllStatuses'
import AddStatus from '../../status/addStatus'
import UploadFile from '../../uploadFile/uploadFile'
import editStatus from '../../status/editStatus';
import File from '../../uploadFile/file/file'
import ViewAllStatuses from '../../status/viewAllStatuses';
function TaskDetails(props) {

    const nameRequired = useRef()
    const [taskBeforeChanges] = useState({ ...props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask] })
    const [flugFiles, setFlugFiles] = useState(false)
    useEffect(() => {
        props.objectBeforeChanges({ 'type': 'task', 'task': taskBeforeChanges })
    }, [props.cards])

    const [milstone, setMilstone] = useState(props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].milestones)
    const [milestonesValue, setMilestonesValue] = useState(milstone)
    const [openPopUp, setOpenPopUp] = useState(false)
    const [fileComponentArr, setFileComponentArr] = useState([])


    const openPopUpStatus = (e) => {
        setOpenPopUp(!openPopUp)

    }

    const saveTask = () => {

        if (nameRequired.current.value) {
            props.objectBeforeChanges(null)
            props.EditTask(props.task)
            props.closeViewDetails(false)
        }
        else {
            nameRequired.current.focus()
            var form = document.getElementById('nameRequired')
            form.classList.add('was-validated')
        }
    }



    const deleteTask = () => {
        props.showToast(true)
    }


    const changeFiledInTask = (input) => {
        let editTaskInRedux
        if (input.target.name == "milestones") {
            setMilstone(!props.task.milestones)
            editTaskInRedux = { "nameFiled": input.target.name, "value": !milstone }
        }
        else
            editTaskInRedux = { "nameFiled": input.target.name, "value": input.target.value }
        props.setTaskByFiledFromTasks(editTaskInRedux)
    }
    // function filesInTask() {


    const newFileComponentArr = props.arrFilesOfTask.map((file) => {
        return <File url={file.url} name={file.name} />
    })



    return (
        <>
            <div className="details task-details mr-5 ml-4">
                <h5 className="mt-5 title-view-details pb-2">Task details</h5>
                <div className="row justify-content-between mx-1" >
                    <label>Create {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].startDate}</label> <label className="ml-5" >Last Update {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].dueDate}</label>
                    {/* <label>Create {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].startDate}</label> */}
                    {/* <label>Last Update {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].dueDate}</label> */}
                    {/* <label>{props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]._id}</label>/\ */}
                    {/* <label>card: {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].card}</label> */}
                    <br></br>
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
                    <textarea class="form-control" name="description"
                        id="descriptionProject" rows="1"
                        // placeholder="this is a very important task.. don’t forget!"
                        onChange={(e) => changeFiledInTask(e)}
                        value={props.task.description}>
                    </textarea>
                </div>
                <div className="row justify-content-between">
                    <div class="form-group col-5">
                        <label for="startDate">Start Date</label>
                        <input
                            className="form-control"
                            name="startDate"
                            type="date"
                            id="startDate"
                            value={props.task.startDate}
                            onChange={(e) => changeFiledInTask(e)}
                        />
                    </div>
                    <div class="form-group col-5">
                        <label for="dueDateProject">Due Date</label>
                        <input
                            className="form-control "
                            name="dueDate"
                            type="date"
                            id="dueDate"
                            value={props.task.dueDate}
                            onChange={(e) => changeFiledInTask(e)}
                        />
                    </div>

                </div>
                <div className="row ">
                    <div class="dropdown col-5">
                        <button onClick={(e) => openPopUpStatus(e)} class="form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {props.statuses.length > 0 ? <>
                                <div className="color-status-first col-3 mt-1 mx-1" style={{ "backgroundColor": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status.color }} > </div>
                                <span className="">{props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status.statusName}</span>
                            </> : null}
                        </button>
                        {openPopUp ?
                            <ViewAllStatuses
                                task={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]}
                                status={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status}
                                openPopUp={openPopUp} />
                            : null}
                    </div>
                    {/* <div className="row mb-3"> */}
                    <div className="col-7">
                        <span>Mark as milestone</span>
                        <label class="switch ml-2 mt-3">
                            <input type="checkbox"
                                name="milestones"
                                checked={milstone}
                                value={props.task.milestones}
                                onChange={(e) => changeFiledInTask(e)}
                            />
                            <span class="slider round"
                            ></span>

                        </label>
                    </div>
                </div>


                {/* <label className="check-task py-2 mt-2 " for="milestones">
                    <input
                        type="checkbox"
                        checked={milestonesValue ? "checked" : ''}
                        value={milestonesValue}
                    ></input>
                    <span className="checkmark ml-0"
                        onclick={(e) => changeMilstone(e)}></span>
                    <p className="pl-4 mils">Milestones</p>
                </label> */}
                {/* 
                <label for="milestones" className="check-task py-2">
                    <input
                        checked={milestonesValue ? "checked" : ''}
                        type="checkbox" id="milestones" name="milestones"
                        onClick={(e) => changeMilstone(e)}
                        value={milestonesValue}></input>
                    Is Milestones
                </label> */}

                {newFileComponentArr}

                <UploadFile />
                <div className="row justify-content-between mx-1 btns-in-view-details-task">
                    <button data-toggle="tooltip" data-placement="top" title="Garbage" className="delete-btn col-4 " onClick={() => deleteTask()} >
                        <img src={require('../../../img/bin.png')}></img> Delete
 </button>
                    <button onClick={(e) => saveTask(e)} className="save_canges_btn col-3">Save</button>
                </div>
            </div>

        </>

    )
}
const mapStateToProps = (state) => {
    return {
        // task: state.task_reducer.task,
        tasks: state.public_reducer.tasks,
        user: state.public_reducer.userName,
        statuses: state.status_reducer.statuses,
        cards: state.public_reducer.cards,
        indexCurrentCard: state.public_reducer.indexCurrentCard,
        indexCurrentTask: state.public_reducer.indexCurrentTask,
        arrFilesOfTask: state.public_reducer.arrFilesOfTask
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        uploadFiles: (uploadFile) => dispatch(actions.uploadFiles(uploadFile)),
        EditTask: (task) => dispatch(actions.editTask(task)),
        setFilesFromTask: (task) => dispatch(actions.setFilesFromTask(task)),
        setTaskName: (name) => dispatch(actions.setTaskNameInTaskReducer(name)),
        getAllStatusesTaskForWorkspace: () => dispatch(actions.getAllStatusesTaskForWorkspace()),
        createStatus: (status) => dispatch(actions.createStatus(status)),
        setTaskByFiledFromTasks: (taskDetails) => dispatch(actions.setTaskByFiledFromTasks(taskDetails)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)