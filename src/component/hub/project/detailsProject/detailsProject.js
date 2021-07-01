
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action';
function DetailsProject(props) {

<<<<<<< HEAD
    const [isHasProject, setIsHasProject] = useState(false);
    useEffect(() => {
        if (!isHasProject) {
            setIsHasProject(true)
            props.getProjectByIdInServer(props.projectId)
        }
    })
    return (
        <div className="detailsproject">

            <div >subject: {props.project.subject}</div>
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
>>>>>>> 8e2e555221b36eafb39be20d64cf2ba4ea56c1da
            <div>{props.project.description}</div>

            {/* <button onClick={props.getProjectByIdInServer}>project</button> */}
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