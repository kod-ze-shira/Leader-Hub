import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import './addTask.css'

function AddTask(props) {
    useEffect(() => {

    }, [])
    const today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
        date2 = date.split("-")[2] + '/' + date.split("-")[1] + '/' + date.split("-")[0];

    ;

    console.log("card", props.cardId)
    console.log("status", props.statuses._id)

    const [addTask, setAddTask] = useState({ name: "", description: "", status: props.statuses._id, startDate: props.startDate, dueDate: "", card: props.cardId })
    const handleChange = (event) => {

        const { name, value } = event.target;
        let cons1 = event.target.name
        let cons2 = event.target.value

        if (cons1 === "dueDate") {
            cons2 = cons2.split("-")[2] + '/' + cons2.split("-")[1] + '/' + cons2.split("-")[0];

        }

        setAddTask(prevState => ({
            ...prevState,
            [name]: cons2
        }));
    }
    const newTask = () => {
        props.newTask(addTask)
        console.log(addTask);

    };

    return (
        <div className="edit-task">
            <h5 className="mt-2">Add Task</h5>
            <label htmlFor="task-name">name:</label>
            <input type="text" name="name" className="form-control" id="task-name" placeholder="name"
                onChange={handleChange} />
            <label htmlFor="description" > description:</label >
            <input type="text" name="description" className="form-control" id="description" placeholder="description"
                onChange={handleChange} />
            {/* <label htmlFor="status">status:</label>
            <select type="text" name="status" className="form-control" id="status" placeholder="status"
                onChange={handleChange} >
                <option>to do</option>
                <option>in progress</option>
                <option>done</option>
            </select> */}
            <label htmlFor="startDate" > startDate:</label >
            <input type="date" name="startDate" className="form-control" id="startDate" placeholder={date2}
                min={date2} required
                onChange={handleChange} />
            <label htmlFor="dueDate" > dueDate:</label >
            <input name="dueDate" type="date" className="form-control" id="dueDate" placeholder="dueDate"
                onChange={handleChange} />
            <br></br>
            <button onClick={newTask} className="add-task">add task</button>
        </div >
    )
}
const mapStateToProps = (state) => {
    return {
        tasks: state.public_reducer.tasks,
        statuses: state.status_reducer.statuses
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        newTask: (task) => dispatch(actions.newTask(task)),
        getTasksByCardId: (id) => dispatch(actions.getTasksByCardId(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTask)