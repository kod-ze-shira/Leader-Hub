import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'

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
function TaskDetails(props) {
    const nameRequired = useRef()
    const [taskBeforeChanges] = useState({ ...props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask] })
    const [flugFiles, setFlugFiles] = useState(false)

    useEffect(() => {
        // if (props.statuses.length == 0)
        props.getAllStatusesTaskForUser();
        props.objectBeforeChanges({ 'type': 'task', 'task': taskBeforeChanges })
    }, [props.cards])

    const [milstone, setMilstone] = useState(props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].milestones)
    const [milestonesValue, setMilestonesValue] = useState(milstone)
    const [openPopUp, setOpenPopUp] = useState(false)
    const [openPopUpToAdd, setOpenPopUpToAdd] = useState(false)
    // const [editTask, setEditTask] = useState(task)
    const [statusIndex, setStatusIndex] = useState()
    const [status, setStatus] = useState()
    const [statusId, setStatusId] = useState()

    const [statusTemp, setStatusTemp] = useState({})
    const [newStatus, setNewStatus] = useState({
        statusName: "",
        color: "",
    })
    const [fileComponentArr, setFileComponentArr] = useState([])

    const handleChangeStatus = (event) => {
        const { name, value } = event.target
        setNewStatus(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    const openPopUpStatus = (e) => {
        setOpenPopUp(!openPopUp)
        if (openPopUpToAdd == true)
            setOpenPopUpToAdd(!openPopUpToAdd)
    }
    const openAddStatus = (e) => {

        setOpenPopUpToAdd(!openPopUpToAdd)
        setOpenPopUp(!openPopUp)
    }
    const addStatus = () => {
        console.log(newStatus);
        props.createStatus(newStatus)
    }
    const saveNewTask = () => {

        if (nameRequired.current.value) {
            props.objectBeforeChanges(null)
            props.EditTask(props.task)
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
    const changeStatusByIndex = (indexOfStatus) => {
        setStatusIndex(indexOfStatus)
        let s = props.statuses[indexOfStatus]
        setStatus(s)
        // console.log(status.statusName);
        let a = props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status.statusName
        console.log(a)
        console.log("props.statuses[statusIndex]" + props.statuses[indexOfStatus].statusName);
    }
    const saveStatus = (value) => {
        let editStatusInRedux = { "nameFiled": "status", "value": value }
        props.setTaskByFiledFromTasks(editStatusInRedux)
    }


    const changeFiledInTask = (input) => {
        let editTaskInRedux
        let value = input.target.value
        if (input.target.name == "startDate") {
            value = input.target.value.split("-")[2] + '/' + input.target.value.split("-")[1] + '/' + input.target.value.split("-")[0];
        }
        else
            if (input.target.name == "dueDate") {
                value = input.target.value.split("-")[2] + '/' + input.target.value.split("-")[1] + '/' + input.target.value.split("-")[0];
            }
            else
                if (input.target.name == "milestones") {
                    setMilstone(!props.task.milestones)
                    value = !milstone
                }
        editTaskInRedux = { "nameFiled": input.target.name, "value": value }
        props.setTaskByFiledFromTasks(editTaskInRedux)
    }

    // if (!flugFiles) {
    //     filesInTask()
    //     setFlugFiles(true)
    // }
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
    const closePopUpOfViewStatus = () => {
        openPopUp(false)
    }

    return (
        <>
            <div className="details task-details mr-5 ml-4">
                <h5 className="mt-5 title-view-details pb-2">Task details</h5>
                <div className="row justify-content-between mx-1" >
                    <label>Create {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].startDate}</label> <label>Last Update {props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].dueDate}</label>
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
                        id="descriptionProject" rows="3"
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
                        <button onClick={openPopUpStatus} class="form-control dropdown-toggle " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {props.statuses.length > 0 ? <>
                                <div className="color-status-first col-3 mt-1 mx-1" style={{ "backgroundColor": props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status.color }} > </div>
                                <span className="">{props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status.statusName}</span>
                            </> : null}
                        </button>
                        <div className={openPopUp || openPopUpToAdd ? "menu__" : ""}>
                            <div className="status-list">
                                {openPopUp && props.statuses.length ? props.statuses.map((status, index) => (
                                    <ViewStatus saveStatus={(e) => saveStatus(e)}
                                        changeStatus={changeStatusByIndex}
                                        status={status} index={index}
                                        openPopUp={closePopUpOfViewStatus} />
                                )) : null}
                                {openPopUp ?
                                    <button onClick={openAddStatus} className="ml-3 create-label">Create New Status</button>
                                    : null}
                                {openPopUpToAdd ? <AddStatus task={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status} /> : null}
                            </div>

                        </div>
                    </div>
                    {/* <div className="row mb-3"> */}
                    <div className="col-7">
                        <span>Mark as milestone</span>
                        <label class="switch ml-2 ">
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

                {/* </div> */}


                {fileComponentArr}

                <UploadFile />
                <div className="row justify-content-between mx-1 btns-in-view-details-task">
                    <button data-toggle="tooltip" data-placement="top" title="Garbage" className="delete-btn col-4 " onClick={(e) => deleteTask()} >
                        <img src={require('../../../img/bin.png')}></img> Delete
 </button>
                    <button onClick={(e) => saveNewTask(e)} className="save_canges_btn col-3">Save</button>
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
        indexCurrentTask: state.public_reducer.indexCurrentTask
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        EditTask: (task) => dispatch(actions.editTask(task)),
        setTaskName: (name) => dispatch(actions.setTaskNameInTaskReducer(name)),
        getAllStatusesTaskForUser: () => dispatch(actions.getAllStatusesTaskForUser()),
        createStatus: (status) => dispatch(actions.createStatus(status)),
        setTaskByFiledFromTasks: (taskDetails) => dispatch(actions.setTaskByFiledFromTasks(taskDetails))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)