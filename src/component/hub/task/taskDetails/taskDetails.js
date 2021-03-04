import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import Select from 'react-select';
import './taskDetails.css'

function TaskDetails(props) {

    useEffect(() => {

    }, [])
    const task = props.task
    const [editTask, setEditTask] = useState(task)

    const handleChange = (event) => {
        let cons1, cons2
        if (event.name == "status") {
            cons1 = event.name
            cons2 = event.value
        }
        else {
            // const { name, value } = event.target;
            cons1 = event.target.name
            cons2 = event.target.value

            if (cons1 == "dueDate" || cons1 == "startDate") {
                cons2 = cons2.split("-")[2] + '/' + cons2.split("-")[1] + '/' + cons2.split("-")[0];

            }
        }
        setEditTask(prevState => ({
            ...prevState,
            [cons1]: cons2
        }));

    }
    const saveNewTask = () => {
        props.EditTask(editTask)
    }
    function deleteTask() {
        props.showToast(true)
    }
    const statusList = [{ value: "done", name: "status", label: "done" },
    { value: "to do", name: "status", label: "todo" },
    { value: "in progress", name: "status", label: "in progress" }]

    return (
        <div className="details-task">
            {/* <h1 className="mt-5 pt-5">Task details</h1> */}
            <textarea name="name" id="name"
                placeholder="Write a task name"
                onChange={handleChange} class="mt-4 simpleTextarea--dynamic simpleTextarea AutogrowTextarea-input">
                {task.name}
            </textarea>
            <p>description:</p>
            <input onChange={handleChange}
                type="text" name="description" class="form-control" id="task-name" placeholder={task.description} />
            <p>status:</p>
            <Select
                onChange={(e) => handleChange(e)}
                name="status"
                options={statusList}
                placeholder={task.status}

            />
            <p>startDate:</p>
            <input onChange={handleChange}
                name="startDate" type="text" class="form-control" id="task-name" placeholder={task.startDate} />
            <p>dueDate:</p>
            <input
                name="dueDate" type="date" class="form-control" id="dueDate" value={task.startDate}
                onChange={handleChange} />
            <button data-toggle="tooltip" data-placement="top" title="Garbage" onClick={(e) => deleteTask()}>
                <img src={require('../../../img/bin.png')}></img>
            </button>
            <button onClick={(e) => saveNewTask(e)} className="save_canges_btn">Save Changes</button>
        </div>

    )
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        EditTask: (task) => dispatch(actions.editTask(task))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)