import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import Select from 'react-select';
import './taskDetails.css'
import task_reducer from '../../../../redux/Reducers/task_reducer';
import { createStatus } from '../../../../redux/middleware/statusCrud';
import ViewAllStatuses from '../../status/viewAllStatuses'
import AddStatus from '../../status/addStatus'

function TaskDetails(props) {
    const nameRequired = useRef()

    useEffect(() => {
        props.getAllStatusesTaskForUser();
    }, [props.task])

    useEffect(() => {
        let status = [];
        // console.log(props.task.milestones)

        props.statuses.length && props.statuses.forEach(st => {
            let stTemp = {
                "name": st.statusName,
                "value": st.statusName,
                "label": st.statusName
            }
            status.push(stTemp);
        });

        setStatusTemp(status)
    }, [props.statuses])

    const [editTaskName, setEditTaskName] = useState(props.task.name)
    const [editDescription, setEditDescription] = useState(props.task.description)
    const task = props.task
    const status = props.status
    const [milstone, setMilstone] = useState(props.task.milestones)
    const [milestonesValue, setMilestonesValue] = useState(milstone)
    const [openPopUp, setOpenPopUp] = useState(false)
    const [openPopUpToAdd, setOpenPopUpToAdd] = useState(false)
    const [editTask, setEditTask] = useState(task)
    const [statusId, setStatusId] = useState()

    const [statusTemp, setStatusTemp] = useState({})
    const [newStatus, setNewStatus] = useState({
        statusName: "",
        color: "",
    })
    const handleChangeStatus = (event) => {
        const { name, value } = event.target
        setNewStatus(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const changeMilstone = (event) => {
        setMilestonesValue(!milestonesValue)
        let temp = editTask
        temp.milestones = !milestonesValue
        setEditTask(temp)
    }
    const handleChange = (event) => {
        let name, value
        if (event.name == "status") {
            name = event.name
            value = event.value
        }
        else {
            name = event.target.name
            value = event.target.value
            if (name == "name") {
                setEditTaskName(value)
                props.setTaskName(value)
            }
            if (name == "dueDate" || name == "startDate") {
                value = value.split("-")[2] + '/' + value.split("-")[1] + '/' + value.split("-")[0];
            }
            // if (name == "milestones") {
            //     setMilestonesValue(!milestonesValue)
            //     value = milestonesValue
            // }
        }
        setEditTask(prevState => ({
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
            props.EditTask(editTask)
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
    const changeStatusById = (statusId) => {
        console.log(statusId)
        // setStatusId(statusId)
        // var temp = editTask
        // temp.status = statusId
        // console.log(temp);
        // setEditTask(temp)
    }

    return (
        <>
            <div className="details task-details mr-5 ml-4">
                <h5 className="mt-5 title-view-details pb-2">Task details</h5>
                <div className="row justify-content-between  mx-1" >
                    <label>Create {task.startDate}</label>   <label>Last Update {task.dueDate}</label>
                    <br></br>
                </div>
                <div class="form-group" id='nameRequired'>
                    <label for="name">Name</label>
                    <input name="name" onChange={(e) => handleChange(e)}
                        required ref={nameRequired}
                        type="text" class="form-control"
                        id="name"
                        value={editTaskName} />
                    <div class="invalid-feedback">
                        Please enter task name.
                     </div>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" name="description"
                        id="descriptionProject" rows="2"
                        // placeholder="this is a very important task.. don’t forget!"
                        onChange={handleChange}
                        value={editDescription}>
                    </textarea>
                </div>
                <div className="row justify-content-between">
                    <div class="form-group col-5">
                        <label for="startDate">Due Date</label>
                        <input
                            className="form-control"
                            name="startDate"
                            type="date"
                            id="startDate"
                            value={task.startDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div class="form-group col-5">
                        <label for="dueDateProject">Due Date</label>
                        <input
                            className="form-control "
                            name="dueDate"
                            type="date"
                            id="dueDate"
                            value={task.dueDate}
                            onChange={handleChange}
                        />
                    </div>

                </div>
                <div className="row justify-content-between">
                    {/* <Select
                        onChange={(e) => handleChange(e)}
                        name="status"
                        options={statusTemp}
                        placeholder={task.status}
                        className="col-5"
                    /> */}
                    <div class="dropdown col-5">

                        <button onClick={openPopUpStatus} class=" form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {props.statuses.length ? props.statuses.map((status, index) => (
                                <>
                                    <div className={index == 0 ? "color-status-first" : ""}> </div>{index == 0 ? status.statusName : null}
                                </>

                            )) : null}
                        </button>
                        <div className={openPopUp || openPopUpToAdd ? "menu__" : ""}>
                            <div className="status-list">
                                {openPopUp && props.statuses.length ? props.statuses.map((status) => (
                                    <ViewAllStatuses changeStatus={changeStatusById} status={status} />
                                )) : null}
                                {openPopUp ?
                                    <button onClick={openAddStatus} className="ml-3 create-label">Create New Label</button>
                                    : null}
                                {openPopUpToAdd ? <AddStatus task={task} /> : null}
                            </div>

                        </div>
                    </div>
                </div>

                <label className="check-task py-2 mt-2 " for="milestones">
                    <input
                        type="checkbox"
                        checked={milestonesValue ? "checked" : ''}
                        value={milestonesValue}
                    ></input>
                    <span className="checkmark  ml-0"
                        onclick={(e) => changeMilstone(e)}></span>
                    <p className="pl-4 mils">Milestones</p>
                </label>

                <label for="milestones" className="check-task py-2">
                    <input
                        checked={milestonesValue ? "checked" : ''}
                        type="checkbox" id="milestones" name="milestones"
                        onClick={(e) => changeMilstone(e)}
                        value={milestonesValue}></input>
                    {/* Is Milestones */}
                </label>

                <div className="row justify-content-between  mx-1 btns-in-view-details-task">
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
        task: state.task_reducer.task,
        tasks: state.public_reducer.tasks,
        user: state.public_reducer.userName,
        statuses: state.status_reducer.statuses
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        EditTask: (task) => dispatch(actions.editTask(task)),
        setTaskName: (name) => dispatch(actions.setTaskNameInTaskReducer(name)),
        getAllStatusesTaskForUser: () => dispatch(actions.getAllStatusesTaskForUser()),
        createStatus: (status) => dispatch(actions.createStatus(status))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)