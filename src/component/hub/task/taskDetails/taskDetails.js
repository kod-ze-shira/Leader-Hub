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
            <h5 className="mt-3">Task details</h5>
            <div class="form-group">
                <label for="name">name:</label>
                <input onChange={handleChange} type="text" class="form-control" id="name" placeholder={task.name} />
            </div>
            {/* <input onChange={handleChange}
                    type="text" name="name" class="form-control" id="task-name" placeholder={task.name} /> */}
            <div class="form-group">
                <label for="description">description:</label>
                <textarea class="form-control" id="description" rows="2" placeholder="Write a description" onChange={handleChange}>{task.description}</textarea>
            </div>
            <label>status:</label>
            <Select
                onChange={(e) => handleChange(e)}
                name="status"
                options={statusList}
                placeholder={task.status}

            />
            <div class="form-group">
                <label for="startDate">start-date:</label>
                <input onChange={handleChange} type="text" class="form-control" name="startDate" id="startDate" placeholder={task.startDate} />
            </div>
            <div class="form-group">
                <label for="startDate">dueDate:</label>
                <input onChange={handleChange} type="text" class="form-control" name="dueDate" id="dueDate" placeholder={task.dueDate} />
            </div>

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