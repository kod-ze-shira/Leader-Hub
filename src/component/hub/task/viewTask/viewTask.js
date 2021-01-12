import ReactDOM from 'react-dom'
import React, { useState } from 'react';
import DetailsTask from '../detailsTask/detailsTask'
import { connect } from 'react-redux';
import { actions } from '..//..//..//..//redux/actions/action'


export function ViewTask(props) {
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
                <button onClick={() => { props.getTaskByIdInServer() }}>ok</button>
                <DetailsTask/>

            </>
        
    )
}
const mapStateToProps = (state) => {
    return {

        task: state.task_reducer.task,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
     
        // setisConfiguratorOpen: (isConfiguratorOpen) => dispatch(actions.setisConfiguratorOpen(isConfiguratorOpen)),
        getTaskByIdInServer: () => dispatch(actions.getTaskByIdInServer())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTask)






