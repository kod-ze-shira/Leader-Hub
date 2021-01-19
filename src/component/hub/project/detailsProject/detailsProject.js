
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
function DetailsProject(props) {

<<<<<<< HEAD

    const [isHasProject, setIsHasProject] = useState(false);
    useEffect(() => {
        if (!isHasProject) {
            setIsHasProject(true)
            props.getProjectByIdInServer(props.ProjectId)
        }
    })
    return (
        <div className="detailsTask">

            <div>{props.Project._id}</div>
            <button onClick={props.getProjectByIdInServer}>ok</button>
=======
     const [isHasProject, setIsHasProject] = useState(false);
     useEffect(() => {
         if (!isHasProject) {
             setIsHasProject(true)
             props.getProjectByIdInServer(props.projectId)
         }
     })
    return(
        <div className="detailsproject">
         
            <div>subject: {props.project.subject}</div>
            <div>{props.project.description}</div>

            {/* <button onClick={props.getProjectByIdInServer}>project</button> */}
>>>>>>> master
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        project: state.project_reducer.project
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        
        getProjectByIdInServer: (projectId) => dispatch(actions.getProjectByIdInServer(projectId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsProject)