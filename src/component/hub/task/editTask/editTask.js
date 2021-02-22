import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import './editTask.css'

function EditTask(props) {
    useEffect(() => {
        props.getTasksByCardId(props.card._id)

    }, [])

    const [newTask, setNewTask] = useState({ name: "", description: "", status: "", startDate: "", updateDates: "", card: props.card._id })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const addTaskToServer = () => {
        props.newTask(newTask)
        console.log(newTask);
        console.log("add task:" + props.card.tasks)

    };

    return (
        <div className="edit-task">
            <h1 className="mt-2">Edit details</h1>
            <form className="container">
                <div class="form-group row">
                    <label for="task-name">name</label>
                    <input type="text" name="name" class="form-control" id="task-name" placeholder="name"
                        onChange={handleChange} />
                </div>
                <div class="form-group row">
                    <label for="description">description</label>
                    <input type="text" name="description" class="form-control" id="description" placeholder="description"
                        onChange={handleChange}
                    />
                </div>
                <div class="form-group row">
                    <label for="status">status</label>
                    <input type="text" name="status" class="form-control" id="status" placeholder="status" />
                </div>
                <div class="form-group row">
                    <label for="startDate">startDate</label>
                    <input type="date" name="startDate" class="form-control" id="startDate" placeholder="startDate"
                        onChange={handleChange} />
                </div>
                <div class="form-group row">
                    <label for="updateDates">updateDates</label>
                    <input type="date" class="form-control" id="updateDates" placeholder="updateDates"
                        onChange={handleChange} />
                </div>
                <button type="submit" class="btn btn-primary"
                >Submit</button>
                <button onClick={addTaskToServer} >asdfghjkl</button>
            </form>
        </div>
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