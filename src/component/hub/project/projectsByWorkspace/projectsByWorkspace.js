import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import {ViewProject} from '../viewProject/viewProject'
function ProjectsByWorkspace(props,idWorkspace) {
    useEffect(()=>{
        console.log("idWorkspace",props.idWorkspace);
props.getProjectsByWorkspaceId(props.idWorkspace);
    },[props])

    const viewProjectsByWorkspace=props.projects.map((project)=>{
return <ViewProject key={project._id} project={project}/>
    })
    return(
        <>
        <div>hello</div>
        <div>{viewProjectsByWorkspace}</div>
        </>
    )
}


export default connect(
    (state) => {
        return {
            projects: state.public_reducer.projects
        }
    },
    (dispatch) => {
        return {
            getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspace(idWorkspace))
        }
    }
)(ProjectsByWorkspace)