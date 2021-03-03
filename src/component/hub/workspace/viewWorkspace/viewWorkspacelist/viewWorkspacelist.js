import React, { useEffect, useState } from 'react'
import './viewWorkspacelist.css';
import { connect } from 'react-redux'
import { actions } from '../../../../../redux/actions/action'
import history from '../../../../history'
import { withRouter } from 'react-router-dom';
import EditWorkspace from '../../editWorkspace/editWorkspace'
import ViewDetails from '../../../viewDetails/viewDetails'
import Toast from 'react-bootstrap/Toast'
import $ from "jquery";


function ViewWorkspaceList(props) {
    const { workspace } = props
    const [viewProjects, setViewProjects] = useState(false)
    const [openEditWorkspace, setOpenEditWorkspace] = useState(false)
    const [showToast, setShowToast] = useState(false);//to show toast delete
    const [deleted, setDeleted] = useState(true)//to undo delete// if user want undo delete

    const routeToProject = () => {
        // console.log("waaaaaaaaaa  " + workspace)
        props.setWorkspace(workspace)
        props.setProjects(workspace.projects)
        props.history.push("/" + props.user + "/workspace/" + workspace._id)
    }


    function EditWorkspace() {
        props.setWorkspace(workspace)//to select workspace to edit and send him to server
        props.setclose()
        props.editWorkspace()
    }
 
    function func_remove() {
        setDeleted(true)
        setShowToast(true)
    }


    const toOpenEditWorkspace = () => {
        setOpenEditWorkspace(!openEditWorkspace)
    }
    const [over, setover] = useState(false);
    function DeleteWorkspace() {
        setShowToast(false)
        if (deleted) {
            props.setWorkspace(workspace);
            props.deleteWorkspaceInServer();
        }

    }



    function func_over(id) {
        $(`#${id} .iconsAction`).css({ 'display': 'inline' })

    }
    // function func_out_over() {
    //     setover(false);
    // }
    function outOver(id) {
        $(`#${id} .iconsAction`).css({ 'display': 'none' })
    }



    return (
        <>
            <div className="row WorkspaceList mt-3 "
                id={workspace._id}
                onMouseOver={() => func_over(workspace._id)}
                onMouseOut={() => outOver(workspace._id)}  >
                <div className="col-10" onClick={() => routeToProject(workspace._id)}
                >
                    
                    <div className="row "  >
                        <div className="Workspace"  >
                            <div className="logoWorkspacelist"
                                style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
                                {workspace.name[0].toUpperCase()}
                                {/* {
                            workspace.name && workspace.name.indexOf(" ") && workspace.name.indexOf(" ") + 1 ?
                                workspace.name[workspace.name.indexOf(" ") + 1].toUpperCase() : null
                        } */}
                            </div>
                        </div>
                        <b className="mt-4 ml-2">{workspace.name} </b>

                    </div>

                </div>
                {/* { */}
                {/* // over ? */}
                <div className="row  mt-4" >

                    <div data-toggle="tooltip" data-placement="top" title="Edit"
                        className="col-1  edit iconsAction" onClick={EditWorkspace}>
                        <img src={require('../../../../img/pencil-write.png')}></img>
                    </div>
                    <div className="ml-2 stripe ">|</div>
                    <div data-toggle="tooltip" data-placement="top" title="Garbage"
                        className="col-1 ml-1 delete iconsAction" onClick={func_remove} >
                        <img src={require('../../../../img/bin.png')}></img>
                    </div>
                </div>
            </div>
         


            <>
                <div className="mt-5"></div>

                <Toast className="toast_delete"
                    onClose={DeleteWorkspace}
                    show={showToast}
                    delay={5000} autohide>
                    {/* <span
                                className="close_remove"
                                onClick={out_remove_workspace}>×</span> */}

                    <Toast.Header className="tost" closeButton={false}>

                        {/* <div className="close" onClick={out_remove}> x</div> */}

                        <div className="row">
                            <div className="col-4">
                                <div className="pr-2"></div>
                            </div>
                            <div className="col-10">
                                {workspace.name} was deleted
                                    </div>
                            <div className="col-4 div_btn_undo pr-2">
                                {/* <div className="Undo" onClick={Undo}>Undo</div> */}
                                <button className="btn_undo" onClick={() => { setShowToast(false); setDeleted(false) }}>Undo</button>
                            </div>
                        </div>




                    </Toast.Header>
                    {/* <Toast.Body>was deleted</Toast.Body> */}
                </Toast>

            </>



        </>

    )
}
const mapStateToProps = (state) => {
    return {
        user: state.public_reducer.userName,
        add_workspaces: state.public_reducer.worksapces,
        workspaces: state.workspace_reducer.workspaces,
        close: state.public_reducer.close,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        getWorkspaceByIdFromServer: (workspaceId) => dispatch(actions.getWorkspaceByIdFromServer(workspaceId)),
        setWorkspace: (workspace) => dispatch(actions.setWorkspace(workspace)),
        deleteWorkspaceInServer: () => dispatch(actions.deleteWorkspaceInServer()),
        setcloseEditWorkspace: () => dispatch(actions.setcloseEditWorkspace()),
        setclose: () => dispatch(actions.setclose()),
        setProjects: (projects) => dispatch(actions.setProjects(projects))


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewWorkspaceList))

