import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action'
import 'bootstrap/dist/css/bootstrap.min.css';
import TasksNotBelongCardByMap from '../task/taskNotBelongCardForUser/tasksNotBelongCardByMap'

function Milestones(props) {

    useEffect(() => {
        console.log("hi");
        props.getAllMilestonesTasks()
        console.log("milestones")

    }, [])
    const renderTasks = props.milestones.length ? props.milestones.map((milestone) => {
        return <h1>{milestone.name}</h1>
        // return <TasksNotBelongCardByMap key={task._id} task={task} />
    }) : null
    return (
        <div className="body-workspace mt-4">
            <div className="mt-5">
                {props.milestones.length ?
                    renderTasks
                    : null}
            </div>
        </div>
    );

}
const mapStateToProps = (state) => {

    return {
        milestones: state.public_reducer.milestones,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllMilestonesTasks: () => dispatch(actions.getAllMilestonesTasks()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Milestones)
