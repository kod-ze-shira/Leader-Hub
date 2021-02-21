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
    const [showShare, setShowShare] = useState(false)
    const [remove, setremove] = useState(false);
    const [openEditWorkspace, setOpenEditWorkspace] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const [edit, setEdit] = useState(false);

    const viewProjectsByWorkspace = () => {
        // return  <projectsByWorkspace/>
        setViewProjects(!viewProjects);
    }

    const routeToProject = () => {
        // console.log("waaaaaaaaaa  " + workspace)
        props.setWorkspace(workspace)
        props.history.push("/" + props.user + "/workspace/" + workspace._id)
    }


    function EditWorkspace() {
        props.setWorkspace(workspace)//to select workspace to edit and send him to server
        // props.setclose()
        setEdit(true);
    }
    function outEdit() {
        setEdit(false);
    }
    function func_remove() {
        setremove(true);
    }
    function out_remove_workspace() {
        props.setWorkspace(workspace);
        props.deleteWorkspaceInServer();
        props.getAllWorkspaces()
        setremove(false);
    }
    function Undo() {
        setremove(false);
    }

    const toOpenEditWorkspace = () => {
        setOpenEditWorkspace(!openEditWorkspace)
    }
    const [over, setover] = useState(false);
    function DeleteWorkspace() {
        props.setWorkspace(workspace);
        props.deleteWorkspaceInServer();
        props.getAllWorkspaces()
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

                    <div className="col-1  edit iconsAction" onClick={EditWorkspace}>
                        <img src={require('../../../../img/pencil-write.png')}></img>
                    </div>
                    <div className="ml-2 stripe ">|</div>
                    <div className="col-1 ml-1 delete iconsAction" onClick={func_remove} >
                        <img src={require('../../../../img/bin.png')}></img>
                    </div>

                </div>

                {/* : null */}
                {/* } */}

            </div>
            {
                edit ?
                    <>


                        <ViewDetails from="editWorkspace" >

                        </ViewDetails>

                    </>

                    : null
            }
            {
                remove ?
                    <>
                        <div className="mt-5"></div>

                        <Toast className="toast_delete"
                            onClose={DeleteWorkspace}
                            // show={showToast} 
                            delay={5000} autohide>
                            <span
                                className="close_remove"
                                onClick={out_remove_workspace}>×</span>

                            <Toast.Header className="tost" >



                                <div className="row">
                                    <div className="col-4">
                                        <div className="pr-2"></div>
                                    </div>
                                    <div className="col-10">
                                        {workspace.name} leader was deleted
                                    </div>
                                    <div className="col-4 div_btn_undo pr-2">
                                        <div className="Undo" onClick={Undo}>Undo</div>
                                    </div>
                                </div>
                            </Toast.Header>
                            {/* <Toast.Body>was deleted</Toast.Body> */}
                        </Toast>
                    </>
                    : null
            }
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
        // setclose: () => dispatch(actions.setclose()),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewWorkspaceList))




