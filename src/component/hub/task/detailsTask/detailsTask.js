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
<<<<<<< HEAD
              <div>{props.task._id}</div>
=======

            {/* subject:{props.getTaskByIdInServer.subject}
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
>>>>>>> 93e3591db8c1f1b30c7f596f602ce735c0ea3fe2
            <button onClick={props.getTaskByIdFromServer}>ok</button>
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