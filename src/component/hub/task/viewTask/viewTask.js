import ReactDOM from 'react-dom'
import React, { useState } from 'react';
import DetailsTask from '../detailsTask/detailsTask'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'


function ViewTask(props) {
    const [details, setdetails]=useState(true);
    function ViewDetails()
    {
         setdetails(false);

    }
    return (
        details?
    
            <div className="continer">
                <div className="row">
                
                  
                    <div className="col-2">subject:{props.task.subject}</div>
                    <div className="col"><button onClick={ViewDetails}>view details</button></div>
                </div>
            </div>
            :
            <>
        
                <DetailsTask/>

            </>
        
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
        getTaskByIdInServer: () => dispatch({ type:"GET_TASK_BY_ID_IN_SERVER"})

    }
   

}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTask)






