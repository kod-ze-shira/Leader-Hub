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
    // const getTasksForUser = () => {
    // props.getAllTasksNotBelongsCardForUser()
    console.log(props.tasks)
    // }
    const renderTasks = props.tasks.map((task) => {
        console.log(task);
        return <ViewTaskByCrad key={task._id} task={task} />
    })
    return (
        <div className="body ">
            {props.tasks.length ?
                renderTasks
                : null}
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
