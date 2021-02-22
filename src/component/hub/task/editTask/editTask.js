import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import './editTask.css'

function EditTask(props) {
    useEffect(() => {

    }, [])
    console.log("card", props.cardId)
    const [addTask, setAddTask] = useState({ name: "", description: "", status: "", startDate: "", dueDate: "", card: props.cardId })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAddTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const newTask = () => {
        props.newTask(addTask)
        console.log(addTask);

    };

    return (
        <div className="edit-task">
            <h5 className="mt-2">Add Task</h5>
            <label for="task-name">name</label>
            <input type="text" name="name" class="form-control" id="task-name" placeholder="name"
                onChange={handleChange} />
            <label for="description">description</label>
            <input type="text" name="description" class="form-control" id="description" placeholder="description"
                onChange={handleChange} />
            <label for="status">status</label>
            <input type="text" name="status" class="form-control" id="status" placeholder="status"
                onChange={handleChange} />
            <label for="startDate">startDate</label>
            <input type="date" name="startDate" class="form-control" id="startDate" placeholder="startDate"
                onChange={handleChange} />
            <label for="dueDate">dueDate</label>
            <input type="date" class="form-control" id="dueDate" placeholder="dueDate"
                onChange={handleChange} />

            <button onClick={newTask} >save</button>
        </div >
    )
}
const mapStateToProps = (state) => {
    return {
        project: state.project_reducer.project,
        card: state.card_reducer.card,
        task: state.task_reducer.task,
        tasks: state.public_reducer.tasks,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCard: (card) => dispatch(actions.setCard(card)),
        newTask: (task) => dispatch(actions.newTask(task)),
        getTasksByCardId: (id) => dispatch(actions.getTasksByCardId(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditTask)