import React, { useEffect, useState } from 'react'
import './viewWorkspaceGrid.css';
import { connect } from 'react-redux'
import ViewDetails from '../../../viewDetails/viewDetails'
import { actions } from '../../../../../redux/actions/action'
import { withRouter } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast'
import $ from "jquery";

function ViewWorkspaceGrid(props) {
    const { workspace } = props
    const [viewProjects, setViewProjects] = useState(false)
    const [showShare, setShowShare] = useState(false)
    const [openEditWorkspace, setOpenEditWorkspace] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const viewProjectsByWorkspace = () => {
        setViewProjects(!viewProjects);
    }

    const routeToWorkspace = () => {
        props.setWorkspace(workspace)
        props.setProjects(workspace.projects)
        props.history.push("/" + props.user + "/workspace/" + workspace._id)
    }
    const changeFiledInWorkspace = (input) => {
        props.setWorkspaceOnChangeFiled(input.target.name, input.target.value)
    }
    function DeleteWorkspace() {
        props.setWorkspace(workspace);
        props.deleteWorkspaceInServer();
        props.getAllWorkspaces()
    }
    function Undo() {
        setremove(false);


    }


    const [over, setOver] = useState(false);
    const [remove, setremove] = useState(false);
    const [edit, setEdit] = useState(false);
    const toOpenEditWorkspace = () => {
        setOpenEditWorkspace(!openEditWorkspace)
    }

    function outOver(id) {

        $(`#${id} .iconsAction`).css({ 'display': 'none' })

    }
    function EditWorkspace() {
        setEdit(true);
        props.setWorkspace(workspace)
        props.setclose()
    }
    function out_remove() {
        setremove(false);
    }


    function outEdit() {
        setEdit(false);
    }

    // $(`.ViewWorkspace`).mouseover(function () {
    //     console.log(this.id)
    //     $(`#${this.id} .iconsAction`).css({ 'display': 'inline' })


    // })
    function over_workspace(id) {
        $(`#${id} .iconsAction`).css({ 'display': 'inline' })
        // $(`#${id} .stripe`).css({ 'color': 'red' })

    }
    function func_remove() {
        setremove(true);
    }

    return (
        <>
<<<<<<< HEAD

            <div className="ViewWorkspace" id={workspace._id}
                onMouseOver={() => over_workspace(workspace._id)}

                onMouseOut={() => outOver(workspace._id)}>

                <div className="row " >
                    <div className="col-1 edit iconsAction" onClick={EditWorkspace}>
                        <img src={require('../../../../img/pencil-write.png')}></img>
                    </div>
                    <div className="ml-1 stripe ">|</div>
                    <div className="col-1 delete iconsAction"
                        onClick={func_remove}>
                        <img src={require('../../../../img/bin.png')}></img>
                    </div>
                    <div className="ml-1 stripe ">|</div>
                    <div className="col-1 add iconsAction" onClick={add}>
                        <img src={require('../../../../img/duplicate-outline.png')}></img>
                    </div>
                </div>
                <div className="Workspacegrid"
                    onClick={() => routeToWorkspace()} >
                    <div>
                        <div className="logoWorkspace1  ml-5 " >
                            <div className="mt-2 logo"

                                style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
                                {workspace.name[0].toUpperCase()}

=======
<<<<<<< HEAD

            <div className="ViewWorkspace" id={workspace._id}
                onMouseOver={() => over_workspace(workspace._id)}
=======
            {
                over ?
                    <>
                        <div className="ViewWorkspace"  >
                            <div className="row"
                            //  onMouseOut={outOver}
                            >
                                <div className="col-1 edit" onClick={EditWorkspace}>
                                    <img src={require('../../../../img/pencil-write.png')}></img>
                                </div>
                                <div className="ml-3 stripe"> <img src={require('../../../../img/Line.png')}></img></div>
                                <div className="col-1 delete"
                                    onClick={func_remove}>
                                    <img src={require('../../../../img/bin.png')}></img>
                                </div>
                                <div className="ml-3 "> <img src={require('../../../../img/Line.png')}></img></div>
                                <div className="col-1 add" onClick={add}>
                                    <img src={require('../../../../img/duplicate-outline.png')}></img>
                                </div>
                            </div>
                            <div className="Workspacegrid"
                                onClick={() => routeToWorkspace()}
                                onMouseOut={outOver}
>>>>>>> dev1

                onMouseOut={() => outOver(workspace._id)}>

                <div className="row " >
                    <div className="col-1 edit iconsAction" onClick={EditWorkspace}>
                        <img src={require('../../../../img/pencil-write.png')}></img>
                    </div>
                    <div className="ml-1 stripe ">|</div>
                    <div className="col-1 delete iconsAction"
                        onClick={func_remove}>
                        <img src={require('../../../../img/bin.png')}></img>
                    </div>
                    <div className="ml-1 stripe ">|</div>
                    <div className="col-1 add iconsAction" onClick={add}>
                        <img src={require('../../../../img/duplicate-outline.png')}></img>
                    </div>
                </div>
                <div className="Workspacegrid"
                    onClick={() => routeToWorkspace()} >
                    <div>
                        <div className="logoWorkspace1  ml-5 " >
                            <div className="mt-2 logo"

                                style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
                                {workspace.name[0].toUpperCase()}

>>>>>>> dev1
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="name"><b>{workspace.name}</b> </div>
                        </div>
                    </div>
                </div>
            </div>



            {
                edit ?
                    <ViewDetails from="editWorkspace" >

                    </ViewDetails>

                    : null
            }


            {


                remove ?


                    <>
                        <div className="mt-5"></div>

                        <Toast className="toast_delete"
                            onClose={DeleteWorkspace}
                            delay={5000} autohide>

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> dev1
                            <span
                                className="close_remove"
                                onClick={out_remove_workspace}>×</span>
=======
                            <Toast.Header className="tost" >
>>>>>>> dev1

                                {/* <div className="close" onClick={out_remove}> x</div> */}

                                <div className="row">
                                    <div className="col-4">
                                        <div className="pr-2"></div>
                                    </div>
                                    <div className="col-10">
                                        workspace leader was deleted
                                    </div>
                                    <div className="col-4 div_btn_undo pr-2">
                                        <div className="Undo" onClick={Undo}>Undo</div>
                                    </div>
                                </div>




<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
                            </Toast.Header>
                            {/* <Toast.Body>was deleted</Toast.Body> */}
>>>>>>> dev1
>>>>>>> dev1
                        </Toast>

                    </>

                    : null
            }
}
        </>







    )
}
const mapStateToProps = (state) => {

    return {

        user: state.public_reducer.userName,
        close: state.public_reducer.close,
        workspaces: state.workspace_reducer.workspaces,



    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // getWorkspaceByIdFromServer: () => dispatch(actions.getWorkspaceByIdFromServer()),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        setWorkspace: (workspace) => dispatch(actions.setWorkspace(workspace)),
        deleteWorkspaceInServer: () => dispatch(actions.deleteWorkspaceInServer()),
        getWorkspaceByIdFromServer: (workspaceId) => dispatch(actions.getWorkspaceByIdFromServer(workspaceId)),
        setclose: () => dispatch(actions.setclose()),
        setProjects: (projects) => dispatch(actions.setProjects(projects))
    }


}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewWorkspaceGrid))



