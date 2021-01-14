import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import  ViewTask  from '../viewTask/viewTask'

function TasksByProject(props) {
    const [isFullTasks, setIsFullTasks] = useState(false);
    useEffect(() => {
        if (!isFullTasks) {
            setIsFullTasks(true);
            console.log(props.projectId);
            props.getTasksByProject(props.projectId)
        }
    })
    const renderTasksByProject = props.tasks.map((task) => {
        return <ViewTask key={task._id} task={task}></ViewTask>
    })
    return (
        <>
            <div>{renderTasksByProject}</div>
        </>
    )
}
export default connect(
    (state) => {
        return {
            tasks: state.public_reducer.tasks
        }
    },
    (dispatch) => {
        return {
            getTasksByProject: (projectId) => dispatch(actions.getTasksByProject(projectId))
        }
    }
)(TasksByProject)