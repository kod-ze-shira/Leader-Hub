import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import 'bootstrap/dist/css/bootstrap.min.css';
import TasksNotBelongCardByMap from './tasksNotBelongCardByMap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './taskNotBelongCardForUser.css'

function TaskNotBelongCardForUser(props) {
    const [searchTask, setSearchTask] = useState('')
    useEffect(() => {
        props.getAllTasksNotBelongsCardForUser()

    }, [])

    console.log(props.tasks)

    const renderTasks = props.tasks.map((task) => {
        console.log(task);
        return task.name.toUpperCase().includes(searchTask.toUpperCase()) ?
            <TasksNotBelongCardByMap key={task._id} task={task} /> : null
    })
    return (
        <div className="body-workspace mt-3">
            <div class="input-group">
                <FontAwesomeIcon class='cleanSearchTask' onClick={() => setSearchTask('')} icon={["fas", "times"]} />

                <input id="searchTask" type="text" class="form-control searchTask"
                    onChange={(e) => setSearchTask(e.target.value)}
                    value={searchTask} placeholder="Write a task name" />
            </div>
            {/* <i class="fas fa-times"></i> */}
            {/* <button onClick={() => sestSearchTask('')}>X</button> */}
            <div class="show-task row mx-4 mt-3 headerTableTask" >
                <label class="ml-3 pl-6 col-7 labelAllTask"> All task </label>
                <label class="col propertiesAllTask">Workspace</label>
                <label class="col propertiesAllTask">Project</label>
                <label class=" col propertiesAllTask">Card</label>
                <label class=" col propertiesAllTask"></label>
            </div>

            <div className="mt-1">
                {props.tasks.length ?
                    renderTasks
                    : null}
            </div>
        </div>
    );

}
const mapStateToProps = (state) => {

    return {
        // user: state.public_reducer.userName,
        tasks: state.public_reducer.tasks,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllTasksNotBelongsCardForUser: () => dispatch(actions.getAllTasksNotBelongsCardForUser()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskNotBelongCardForUser)
