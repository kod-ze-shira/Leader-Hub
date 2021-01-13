import React, { useEffect, useState } from 'react'
import './detailsTask.css'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
function DetailsTask(props) {
    const [isHasTask, setIsHasTask] = useState(false);
    useEffect(() => {
        if (!isHasTask) {
            setIsHasTask(true)
            props.getTaskByIdFromServer(props.taskId)
        }
    })
    return (
        <div className="detailsTask">

            {/* subject:{props.getTaskByIdInServer.subject}
<<<<<<< HEAD
            description:{props.getTaskByIdInServer.description}
            status:{props.getTaskByIdInServer.status}
            startDate:{props.getTaskByIdInServer.startDate}
            dueDate:{props.getTaskByIdInServer.dueDate}
            endDate:{props.getTaskByIdInServer.endDate}
            updateDates:{props.getTaskByIdInServer.updateDates}
            files:{props.getTaskByIdInServer.files}
            project:{props.getTaskByIdInServer.project}
            team: {props.getTaskByIdInServer.team}  */}
            <button onClick={props.getTaskByIdInServer}>ok</button> 
=======
            description:
            status:
            startDate:
            dueDate:
            endDate:
            updateDates:
            files:
            project:
            team:    */}
            <div>{props.task._id}</div>
            <button onClick={props.getTaskByIdFromServer}>ok</button>
>>>>>>> 2953c666f161313b755f8c5adf1872a379315405
        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        task: state.task_reducer.task
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTaskByIdFromServer: (taskId) => dispatch(actions.getTaskByIdFromServer(taskId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsTask)