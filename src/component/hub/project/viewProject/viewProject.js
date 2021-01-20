import React, { useState } from 'react'
import TasksByProject from '../../task/tasksByProject/tasksByProject'
import DetailsProject from '../detailsProject/detailsProject'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
function ViewProject(props) {

    function detailsProject() {
        set_getProjectById(false);
    }
    
    const [getProjectById, set_getProjectById] = useState(true);
    const [viewTasks, setViewTasks] = useState(false)
    return(
        <>
      <div className="container">
                {getProjectById ?
                        <div className="col-2"><button onClick={detailsProject}>projectDEtels</button></div>
                    : <DetailsProject projectId={props.project._id} />
                        

                    }
            <div className="row" onClick={()=>setViewTasks(!viewTasks)}>
                <div className="col">
                    <div>name:{props.project.name}</div>
                    <div>description:{props.project.description}</div>
                </div>
            </div>
            <div>
          {viewTasks ? <TasksByProject projectId={props.project._id} /> : null}

                    <button onClick={() => { props.deleteProjectInServer()}}>deleteproject</button>
     
                    </div>
                    </div>
    
    
        </>
    )
}
const mapStateToProps = (state) => {
   
    return {
        project: state.project_reducer.project
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteProjectInServer: () => dispatch(actions.deleteProjectInServer()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewProject)
