import React from 'react'
import './detailsTask.css'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
 function DetailsTask(props)
{
    return(
        <div className="detailsTask">
         
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
            <button onClick={props.getTaskByIdInServer}>ok</button> 
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


        // setisConfiguratorOpen: (isConfiguratorOpen) => dispatch(actions.setisConfiguratorOpen(isConfiguratorOpen)),
        getTaskByIdInServer: () => dispatch({ type: "GET_TASK_BY_ID_IN_SERVER" })

    }


}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsTask)