import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewProject from '../viewProjectNew/viewProjectNew'
// import DetailsProject from '../detailsProject/detailsProject'

function ProjectsByWorkspace(props, idWorkspace) {
    const [isFullProjects, setIsFullProjects] = useState(true);

    const [flag, setFlag] = useState(false);

    useEffect(() => {
        // if (!isFullProjects) {
        // setIsFullProjects(true)
        console.log("idWorkspace", props.idWorkspace)
        props.getProjectsByWorkspaceId(props.idWorkspace)
        // }
        // 
    }, [])



    const viewProjectsByWorkspace = props.projects.map((project) => {
        return <ViewProject key={project._id} project={project} />

    })
    return (
        <>
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