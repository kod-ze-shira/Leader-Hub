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
    const [showToast, setShowToast] = useState(false);//to show toast delete
    const [deleted, setDeleted] = useState(true)//to undo delete// if user want undo delete
    const viewProjectsByWorkspace = () => {
        setViewProjects(!viewProjects);
    }

    const routeToProject = () => {
        props.setWorkspace(workspace)
        props.setProjects(workspace.projects)
        props.history.push("/" + props.user + "/workspace/" + workspace._id)
    }

    function DeleteWorkspace() {
        setShowToast(false)
        if (deleted) {
            props.setWorkspace(workspace);
            props.deleteWorkspaceInServer();
        }
    }
    const [edit, setEdit] = useState(false);

    function outOver(id) {

        $(`#${id} .iconsAction`).css({ 'display': 'none' })

    }
    function EditWorkspace() {
        setEdit(true);
        props.setWorkspace(workspace)
        props.setclose()
    }

    function add() {
        props.setWorkspace(workspace);
        props.duplicateWorkspaceInServer();
        props.getAllWorkspaces()
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
        setDeleted(true)
        setShowToast(true)
    }

    return (
        <>

            <div className="ViewWorkspace" id={workspace._id}
                onMouseOver={() => over_workspace(workspace._id)}

                onMouseOut={() => outOver(workspace._id)}>

                <div className="row " >
                    <div data-toggle="tooltip" data-placement="top" title="Edit"
                        className="col-1 edit iconsAction" onClick={EditWorkspace}>
                        <img src={require('../../../../img/pencil-write.png')}></img>
                    </div>
                    <div className="ml-1 stripe ">|</div>
                    <div className="col-1 delete iconsAction"
                        onClick={func_remove}
                        data-toggle="tooltip" data-placement="top" title="Garbage">
                        <img src={require('../../../../img/bin.png')}></img>
                    </div>
                    <div className="ml-1 stripe ">|</div>
                    <div className="col-1 add iconsAction" onClick={add}>
                        <img src={require('../../../../img/duplicate-outline.png')}></img>
                    </div>
                </div>
                <div className="Workspacegrid"
                    onClick={routeToProject} >
                    <div>
                        <div className="logoWorkspace1 " >
                            <div className="mt-1 logo"

                                style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
                                {workspace.name[0].toUpperCase()}

                            </div>
                        </div>
                        <div className="name "><p>{workspace.name}</p> </div>
                        <div className=" description-and-productionDate">
                            <p>{workspace.productionDate}</p>
                            <p>{"description"}</p>
                        </div>
                    </div>
                </div>
            </div>


            {
                edit ?
                    <ViewDetails closeViewDetails={() => setEdit(false)} from="editWorkspace" ></ViewDetails>
                    : null
            }


            <>
                <div className="mt-5"></div>

                {/* <Toast className="toast_delete"
                    onClose={DeleteWorkspace}
                    show={showToast}
                    delay={5000} autohide>
                    <Toast.Header className="tost" closeButton={false}>
                        <div className="row">
                            <div className="col-4">
                                <div className="pr-2"></div>
                            </div>
                            <div className="col-10">
                                {workspace.name} was deleted
                                    </div>
                            <div className="col-4 div_btn_undo pr-2">
                                <button className="btn_undo" onClick={() => { setShowToast(false); setDeleted(false) }}>Undo</button>
                            </div>
                        </div>
                         </Toast.Header>
                </Toast> */}

            </>
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
