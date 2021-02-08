import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import ProjectsList from './projectsList/projectsList'
import CardsByProject from '../Cards/cardsByProject/cardsByProject';
import TasksByCard from '../task/tasksByCard/tasksByCard'
import Logo from '../logo/logo'
import './projectPlatform.css'
import HeaderBody from '../headerBody/headerBody'
import ViewDetails from '../viewDetails/viewDetails'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Form } from 'react-bootstrap';


function ProjectPlatform(props) {
    const [projectId, setProjectId] = useState(0)
    const [viewCardsByProject, setViewCardsByProject] = useState(false)
    const [workspaceName, setWorkspaceName] = useState()


    useEffect(() => {

        props.getAllWorkspacesFromServer();


    }, []);
    const changeProjectId = (value) => {
        setProjectId(value)
        setViewCardsByProject(true)
    }
    const sendWorspaceName = (value) => {
        setWorkspaceName(value)
    }
    // const workspace=props.worksapces;
    const options =
        props.worksapces.map(item => (
            // <option className='textLogo' value={item._id} >
            item.name
            // < Logo className = "logo-workspace" nameWorkspace = { item.name } />

            // </option> : null
        ))
        ;
    console.log(workspaceName)
    const defaultOption = workspaceName;

    return (
        <>
            <div className="body container-fluid">
                <div className="row drop-dwon-header">
                    <Dropdown className="m-4" options={options} value={defaultOption} />
                    {/* <Logo className="logo-workspace Dropdown-control" nameWorkspace={workspaceName} /> */}

                    {/* <Dropdown className="m-4" options={options} value={defaultOption} placeholder="Select an option" /> */}
                    {/* <Dropdown  className="m-4" options={options} value="card" placeholder="Select an option" /> */}
                    {/* <Dropdown className="m-4" options={options} value={defaultOption} placeholder="Select an option" /> */}
                </div>
                {/* <Logo className="logo-workspace" nameWorkspace={workspaceName} /> */}
                < ProjectsList changeProject={changeProjectId} sendWorspaceName={sendWorspaceName} />
                {viewCardsByProject ? <CardsByProject projectId={projectId} /> : null}
                {/* <TasksByCard cardId={"6006061269370dacf7af0609"} /> */}
                <div className="add-new-btn  ">+</div>
                {/* <div className="add-new-link">
                    <a></a>
                    <a></a>
                </div> */}
            </div>
        </>
    )

}
const mapStateToProps = (state) => {
    return {
        projects: state.project_reducer.project,
        user: state.public_reducer.userName,
        // workspaces: state.public_reducer.worksapces,
        worksapces: state.public_reducer.worksapces,


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace)),
        getAllWorkspacesFromServer: () => dispatch(actions.getAllWorkspacesFromServer()),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspaces()),


    }


}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectPlatform)