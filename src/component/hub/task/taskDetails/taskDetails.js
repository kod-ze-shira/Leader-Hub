import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import './taskDetails.css'

function TaskDetails(props) {

    useEffect(() => {

    }, [])
    const task = props.task
    const [editTask, setEditTask] = useState(task)

    const handleChange = (event) => {

        const { name, value } = event.target;
        let cons1 = event.target.name
        let cons2 = event.target.value

        if (cons1 == "dueDate" || cons1 == "startDate") {
            cons2 = cons2.split("-")[2] + '/' + cons2.split("-")[1] + '/' + cons2.split("-")[0];

        }
        setEditTask(prevState => ({
            ...prevState,
            [name]: cons2
        }));

    }
    const saveNewTask=()=>{
        props.EditTask(editTask)
    }
    return (
        <div className="details-task">
            <h1 className="mt-5 pt-5">Task details</h1>
            <p>name:</p>
            <input onChange={handleChange}
                type="text" name="name" class="form-control" id="task-name" placeholder={task.name} />
            <p>description:</p>
            <input onChange={handleChange}
                type="text" name="description" class="form-control" id="task-name" placeholder={task.description} />
            <p>status:</p>
            <input onChange={handleChange}
                type="text" name="status" class="form-control" id="task-name" placeholder={task.status} />
            <p>startDate:</p>
            <input onChange={handleChange}
                name="startDate" type="date" class="form-control" id="task-name" placeholder={task.startDate} />
            <p>dueDate:</p>
            <input
                name="dueDate" type="date" class="form-control" id="dueDate" placeholder={task.updateDates}
                onChange={handleChange} />
            <button onClick={(e) => saveNewTask(e)} className="add-task">Save Changes</button>
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




