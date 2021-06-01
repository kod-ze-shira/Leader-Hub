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

        if (cons1 == "dueDate") {
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
            <label for="task-name">name:</label>
            <input  type="text" name="name" class="form-control" id="task-name" placeholder="name"
                onChange={handleChange} />
            <label for="description">description:</label>
            <input type="text" name="description" class="form-control" id="description" placeholder="description"
                onChange={handleChange} />
            {/* <label for="status">status:</label>
            <select type="text" name="status" class="form-control" id="status" placeholder="status"
                onChange={handleChange} >
                <option>to do</option>
                <option>in progress</option>
                <option>done</option>
            </select> */}
            <label for="startDate">startDate:</label>
            <input type="date" name="startDate" class="form-control" id="startDate" placeholder={date2}
                min={date2} required
                onChange={handleChange} />
            <label for="dueDate">dueDate:</label>
            <input name="dueDate" type="date" class="form-control" id="dueDate" placeholder="dueDate"
                onChange={handleChange} />
            <br></br>
            <button onClick={newTask} className="add-task">add task</button>
        </div >
    )
}
const mapStateToProps = (state) => {
    return {
        project: state.project_reducer.project,
        card: state.card_reducer.card,
        task: state.task_reducer.task,
        tasks: state.public_reducer.tasks,
        statuses: state.status_reducer.statuses
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCard: (card) => dispatch(actions.setCard(card)),
        newTask: (task) => dispatch(actions.newTask(task)),
        getTasksByCardId: (id) => dispatch(actions.getTasksByCardId(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTask)