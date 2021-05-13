import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import 'bootstrap/dist/css/bootstrap.min.css';
import TasksNotBelongCardByMap from './tasksNotBelongCardByMap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './taskNotBelongCardForUser.css'

function TaskNotBelongCardForUser(props) {
    const [searchTask, setSearchTask] = useState('')
    const [nameTask, setNameTask] = useState('')
    useEffect(() => {
        props.getAllTasksNotBelongsCardForUser()

    }, [props.tasks])

    console.log(props.tasks)

    const renderTasks = props.tasks.map((task) => {
        console.log(task);
        return searchTask ? task.name.toUpperCase().includes(searchTask.toUpperCase()) ?
            <TasksNotBelongCardByMap key={task._id} task={task} /> : null
            : <TasksNotBelongCardByMap key={task._id} task={task} />
    })
    return (
        <div className="body-workspace mt-3">

            <div class="input-group input-group-task-not-belongs">
                {/* <FontAwesomeIcon class='cleanSearchTask' onClick={() => setNameTask('')} icon={["fas", "times"]} /> */}

                <input type="text" class="col-9 addTaskNotBelong"
                    value={nameTask}
                    placeholder="Write a task name"
                    onChange={(e) => setNameTask(e.target.value)}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            props.newTaskNotBelong(nameTask)
                            setNameTask('')
                        }
                    }} />
                {/* <input type='text' id="searchTask" placeholder='search task' onChange={(e) => setSearchTask(e.target.value)} /> */}
                {/* <span id="searchProject"> */}
                <input type="text" class="inputSearchTask " placeholder="Search task" onChange={(e) => setSearchTask(e.target.value)} />
                {/* </span> */}

            </div>
            {/* <i class="fas fa-times"></i> */}
            {/* <button onClick={() => sestSearchTask('')}>X</button> */}
            <div class="show-task row mx-4 mt-3 headerTableTask" >
                <label class="ml-3 pl-6 col-3 labelAllTask"> All task </label>
                <label class="col propertiesAllTask ml-4">Workspace</label>
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
        newTaskNotBelong: (nameTask) => dispatch(actions.newTaskNotBelong(nameTask)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskNotBelongCardForUser)
