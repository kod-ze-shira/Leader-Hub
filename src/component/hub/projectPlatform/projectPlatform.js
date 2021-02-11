import React, { useState, useEffect, useParams } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import ProjectsList from './projectsList/projectsList'
import CardsByProject from '../Cards/cardsByProject/cardsByProject';
import TasksByCard from '../task/tasksByCard/tasksByCard'
import Logo from '../logo/logo'
import './projectPlatform.css'
import HeaderBody from '../headerBody/headerBody'
// import { Link } from 'react-bootstrap';
import Select from 'react-select';
import $ from 'jquery';
import DropDownWorkspace from '../../hub/dropDownWorkspace/dropDownWorkspace'


function ProjectPlatform(props) {
    // const { idProject } = useParams();
    const [projectId, setProjectId] = useState()
    const [viewCardsByProject, setViewCardsByProject] = useState(false)
    const [workspaceId, setWorkspaceId] = useState()



    useEffect(() => {
        {
            props.getAllWorkspacesFromServer()
        };
    }, []);

    const changeProjectId = () => {
        // setProjectId(value)
        setViewCardsByProject(true)
    }


    $(function () {
        $('.add-new-btn').hover(function () {
            $('.add-new-pop-up').css('display', 'block')
        }, function () {
            // on mouseout, reset the background colour
            $('.add-new-pop-up').css('display', 'none');
        });
    });

    // });
    // let myWorkspace;

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
    // const defaultOption = workspaceId;

    return (
        <>

            <div className="body container-fluid">
                <div className="row drop-dwon-header">
                    {/* <DropDownWorkspace ></DropDownWorkspace> */}
                </div>
                {props.project.name!="No Projects" ?
                <CardsByProject projectId={props.project._id} />
                : null} 
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
        workspaces: state.public_reducer.worksapces,
        workspace: state.workspace_reducer.worksapce,
        project: state.project_reducer.project,

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