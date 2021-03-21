import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import Select from 'react-select';
import './taskDetails.css'
import task_reducer from '../../../../redux/Reducers/task_reducer';
import { createStatus } from '../../../../redux/middleware/statusCrud';

function TaskDetails(props) {

    useEffect(() => {
        props.getAllStatusesTaskForUser();
        console.log(props.statuses);
    }, [props.task])
    const task = props.task
    const status = props.status

    const [editTask, setEditTask] = useState(task)
    const [statusTemp, setStatusTemp] = useState({})
    const [newStatus, setNewStatus] = useState({
        statusName: "",
        user: props.user,
        tasks: [],
        active: true
    })
    const handleChangeStatus = (event) => {
        const { name, value } = event.target
        setNewStatus(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const [editTaskName, setEditTaskName] = useState(props.task.name)

    const handleChange = (event) => {
        let cons1, cons2
        console.log(event.name)
        if (event.name == "status") {
            cons1 = event.name
            cons2 = event.value
            console.log(cons1, cons2)
        }
        else {
            // const { name, value } = event.target;
            cons1 = event.target.name
            cons2 = event.target.value
            // if (event.name == "name") {
            //     setEditTaskName(cons2)
            //     props.setTaskName(cons2)
            // }
            if (cons1 == "dueDate" || cons1 == "startDate") {
                cons2 = cons2.split("-")[2] + '/' + cons2.split("-")[1] + '/' + cons2.split("-")[0];

            }
        }
        setEditTask(prevState => ({
            ...prevState,
            [cons1]: cons2
        }));


    }

    useEffect(() => {
        let status = [];

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


    const addStatus = () => {
        alert("hi")
        console.log(newStatus);
        props.createStatus(newStatus)
    }
    const saveNewTask = () => {
        console.log(editTask)
        props.EditTask(editTask)
    }
    function deleteTask() {
        props.showToast(true)
    }
    // const viewAllStatuses = props.statuses ? props.statuses.map((status) => {
    //     return status.tasks.map((task) => {
    //         return task.statusName
    //     })
    // }) : null

    // const statusList = [{ value: "done", name: "status", label: "done" },
    // { value: "to do", name: "status", label: "todo" },
    // { value: "in progress", name: "status", label: "in progress" }]
    return (
        <>


            <div className="details mr-5 ml-4">
                <h5 className="mt-5 title-view-details pb-2">Task details</h5>
                <div className="row justify-content-between  mx-1" >
                    <label>Create {task.startDate}</label>   <label>Last Update {task.dueDate}</label>
                    <br></br>
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input name="name" onChange={(e) => handleChange(e)}
                        type="text" class="form-control"
                        id="name"
                        // placeholder="instructions for using this project"
                        value={editTaskName} />
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" name="description"
                        id="descriptionProject" rows="2"
                        placeholder="this is a very important task.. don’t forget!"
                        onChange={handleChange}
                        value={task.description}>
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
                <div className="row justify-content-start">
                    <Select
                        onChange={(e) => handleChange(e)}
                        name="status"
                        options={statusTemp}
                        placeholder={task.status}
                        className="col-5"
                    />
                </div>
                <div class="form-group">
                    <label for="name">NameStatus</label>
                    <input name="statusName" onChange={(e) => handleChangeStatus(e)}
                        type="text" class="form-control"
                        id="statusName"
                        placeholder="enter status name"
                    // value={status.statusName} 
                    />
                </div>
                <div class="form-group">
                    <label for="color">colorStatus</label>
                    <input name="name" onChange={(e) => handleChangeStatus(e)}
                        type="color" class="form-control"
                        id="color"
                    // placeholder="enter status name"
                    // value={status.color} 
                    />
                </div>
                <div className="row justify-content-between  mx-1 btns-in-view-details-task">
                    <button onClick={(e) => addStatus(e)}>new status</button>
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
        createStatus: () => dispatch(actions.createStatus())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)