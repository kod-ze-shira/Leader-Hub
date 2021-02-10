import React, { useState, useEffect,useParams } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import ProjectsList from './projectsList/projectsList'
import CardsByProject from '../Cards/cardsByProject/cardsByProject';
import TasksByCard from '../task/tasksByCard/tasksByCard'
import Logo from '../logo/logo'
import './projectPlatform.css'
import HeaderBody from '../headerBody/headerBody'
function ProjectPlatform(props) {
    const { idProject } = useParams();
    const [projectId, setProjectId] = useState(idProject)
    const [viewCardsByProject, setViewCardsByProject] = useState(false)
    const [workspaceId, setWorkspaceId] = useState()

    

    useEffect(() => {
        {

            console.log(props.project);
            // props.getAllWorkspaces()
            console.log("wor" + props.worksapces)
        };
    }, []);

    const changeProjectId = (value) => {
        setProjectId(value)
        setViewCardsByProject(true)
    }
    const sendWorspaceId = (value) => {
        setWorkspaceId(value)
    }
    let myWorkspace;
    if (props.workspaces.length)
        myWorkspace = props.workspaces.find(w => w._id == workspaceId)

    console.log("my" + myWorkspace)
    return (
        <>
            <div className="body container-fluid">
                <Logo className="logo-workspace" nameWorkspace={"myWorkspace.name"} />
                < ProjectsList changeProject={changeProjectId} sendWorspaceId={sendWorspaceId} />
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