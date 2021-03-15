import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import 'bootstrap/dist/css/bootstrap.min.css';
import TasksNotBelongCardByMap from './tasksNotBelongCardByMap'
import ViewTaskByCrad from '../viewTaskByCard/viewTaskByCrad'
function TaskNotBelongCardForUser(props) {

    useEffect(() => {
        props.getAllTasksNotBelongsCardForUser()

    }, [])

    console.log(props.tasks)

    const renderTasks = props.tasks.map((task) => {
        console.log(task);
        // return <h1>{task.name}</h1>
        return <TasksNotBelongCardByMap key={task._id} task={task} />
    })
    return (
        <div className="body-workspace ">
            <div className="mt-5">
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
