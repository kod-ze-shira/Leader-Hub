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
// import { Link } from 'react-bootstrap';
import Select from 'react-select';
import $ from 'jquery';


function ProjectPlatform(props) {
    const [projectId, setProjectId] = useState(0)
    const [viewCardsByProject, setViewCardsByProject] = useState(false)
    const [workspaceId, setWorkspaceId] = useState()
    const [selectedOption, setSelectedOption] = useState()


    useEffect(() => {

        props.getAllWorkspacesFromServer();


    }, []);
    const changeProjectId = (value) => {
        setProjectId(value)
        setViewCardsByProject(true)
    }
    const sendWorspaceId = (value) => {
        setWorkspaceId(value)
    }

     $(function() {
        $('.add-new-btn').hover(function() {
          $('.add-new-pop-up').css('display', 'block')
        }, function() {
          // on mouseout, reset the background colour
          $('.add-new-pop-up').css('display', 'none');
        });
      });
      
// });
    let myWorkspace;

    // const options =
    //     props.worksapces.map(item => ({
    //         value: item.name,
    //         label: item.name

    //     }

    //     ))
    //     ;



    // const mtWorkspace = props.worksapces.map((item) => {
    //     if (item._id == workspaceId)

    //         return item.name

    // });
    // console.log("ytytu" + mtWorkspace)

    // if (props.workspaces.length())
    //     myWorkspace = props.workspaces.find(w => w._id == workspaceId)
    const defaultOption = workspaceId;

    return (
        <>

            <div className="body container-fluid">
                <div className="row drop-dwon-header">
                    {/* <Logo className="logo-workspace Dropdown-control" nameWorkspace={workspaceName} /> */}

                    {/* <Dropdown className="m-4" options={options} value={defaultOption} placeholder="Select an option" /> */}
                    {/* <Dropdown  className="m-4" options={options} value="card" placeholder="Select an option" /> */}
                    {/* <Dropdown className="m-4" options={options} value={defaultOption} placeholder="Select an option" /> */}
                </div>
                < ProjectsList changeProject={changeProjectId} sendWorspaceId={sendWorspaceId} />
                {viewCardsByProject ? <CardsByProject projectId={projectId} /> : null}
                {/* <TasksByCard cardId={"6006061269370dacf7af0609"} /> */}
                <div className="add-new-pop-up ">
                   <a >New Workspace</a><br></br>
                   <a>New Project</a><br></br>
                   <a>New Card</a><br></br>
                   <a>New Task</a><br></br>
                </div>
                <div className="add-new-btn">+</div>
            </div>
        </>
    )

}
const mapStateToProps = (state) => {
    return {
        projects: state.project_reducer.project,
        user: state.public_reducer.userName,
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