import ReactDOM from 'react-dom'
import React, { useState } from 'react';
import DetailsTask from '../detailsTask/detailsTask'
import { connect } from 'react-redux';
import './viewTask.css'
import { actions } from '../../../../redux/actions/action'

export default function ViewTask(props) {
    const [details, setdetails] = useState(false);
    function ViewDetails() {
        setdetails(!details);

    }
    return (

        <div className="continer">
            <div className="row">
                <div className="col-2">subject:{props.task.subject}</div>
                <div className="col"><button onClick={ViewDetails}>view details</button></div>
            </div>
            {details ?
                <DetailsTask taskId={props.task._id} /> : null}
        </div>




    )
}
// const mapStateToProps = (state) => {
//     return {
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {


//         // setisConfiguratorOpen: (isConfiguratorOpen) => dispatch(actions.setisConfiguratorOpen(isConfiguratorOpen)),
//         getTaskByIdInServer: () => dispatch({ type: "GET_TASK_BY_ID_FROM_SERVER" })

//     }


// }
// export default connect(mapStateToProps, mapDispatchToProps)(ViewTask)






