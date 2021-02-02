import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import ProjectsList from './projectsList/projectsList'
import CardsByProject from '../Cards/cardsByProject/cardsByProject';
import TasksByCard from '../task/tasksByCard/tasksByCard'
import Logo from '../logo/logo'
import './projectPlatform.css'
import HeaderBody from '../headerBody/headerBody'
function ProjectPlatform(props) {
    const [projectId, setProjectId] = useState(0)
    const [viewCardsByProject, setViewCardsByProject] = useState(false)


    useEffect(() => {
        { props.getAllWorkspaces() };

    }, []);
    const changeProjectId = (value) => {
        setProjectId(value)
        setViewCardsByProject(true)
    }
    return (
        <>
            {/* <Link to={`${props.user}/projectPlatform`} > */}
            <div className="body container-fluid">

                <Logo nameWorkspace='Leader hub' />

                <ProjectsList changeProject={changeProjectId} />
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
        user: state.public_reducer.userName,
        workspaces: state.public_reducer.worksapces,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace)),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),

    }


}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectPlatform)