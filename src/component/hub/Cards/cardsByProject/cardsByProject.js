import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewCards from '../viewCards/viewCards'
import './cardsByProject.css'

function CardsByProject(props, idWorkspace) {
    // const [isFullProjects, setIsFullProjects] = useState(false);

    useEffect(() => {
        // if (!isFullProjects) {
        //     setIsFullProjects(true)
        console.log("projectId", props.projectId)
        props.getCardsByprojectId(props.projectId)
        // }

    }, [])

    const viewCardsByProject = props.projects.map((project) => {
        return <ViewCards key={project._id} project={project} />
    })
    return (
        <>
            <div to="/cardsByProject">
                {viewCardsByProject}
            </div>
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
            getCardsByprojectId: (projectId) => dispatch(actions.getCardsByprojectId(projectId))
        }
    }
)(CardsByProject)