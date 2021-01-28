import React, { useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import ProjectsList from './projectsList/projectsList'
import CardsByProject from '../Cards/cardsByProject/cardsByProject';
import TasksByCard from '../task/tasksByCard/tasksByCard'
import Logo from '../logo/logo'
import './projectPlatform.css'

function ProjectPlatform(props) {
    const [projectId, setProjectId] = useState(0)
    const [viewCardsByProject, setViewCardsByProject] = useState(false)

    const changeProjectId = (value) => {
        setProjectId(value)
        setViewCardsByProject(true)
    }
    return (
        <>
            {/* <Link to={`${props.user}/projectPlatform`} > */}
            <div className="body container-fluid">
                <Logo className="logo-workspace" nameWorkspace='Leader hub' />
                < ProjectsList changeProject={changeProjectId} />
                {/* <CardsByProject projectId={props.project._id}></CardsByProject> */}

                {viewCardsByProject ? <CardsByProject projectId={projectId} /> : null}
                {/* <TasksByCard cardId={"6006061269370dacf7af0609"} /> */}
                {/* <div className="add-new-btn ">+</div> */}

            </div>
        </>
    )

}
const mapStateToProps = (state) => {
    return {
        projects: state.project_reducer.project,
        user: state.public_reducer.userName

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspace(idWorkspace))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectPlatform)