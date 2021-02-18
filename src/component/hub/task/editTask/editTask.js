import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import './editTask.css'

function EditTask(props) {
    useEffect(() => {

    }, [])

    const [inputValue, setInputValue] = useState({name:"",description:"",status:"",startDate:"",updateDates:""})
    const updateInputValue = (evt) => {
        setInputValue(evt.target.value)
    }

    return (
        <div className="edit-task">
            <h1 className="mt-2">Edit details</h1>
            <form className="container">
                <div class="form-group row">
                    <label for="task-name">name</label>
                    <input type="text" class="form-control" id="task-name" placeholder="name" 
                     onChange={updateInputValue} />
                </div>
                <div class="form-group row">
                    <label for="description">description</label>
                    <input type="text" class="form-control" id="description" placeholder="description" />
                </div>
                <div class="form-group row">
                    <label for="status">status</label>
                    <input type="text" class="form-control" id="status" placeholder="status" />
                </div>
                <div class="form-group row">
                    <label for="startDate">startDate</label>
                    <input type="date" class="form-control" id="startDate" placeholder="startDate" />
                </div>
                <div class="form-group row">
                    <label for="updateDates">updateDates</label>
                    <input type="date" class="form-control" id="updateDates" placeholder="updateDates" />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            {/* <p>name :{task.name}</p>
            <p>description :{task.description}</p>
            <p>status :{task.status}</p>
            <p>startDate :{task.startDate}</p>
            <p>updateDates :{task.updateDates}</p> */}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditTask)