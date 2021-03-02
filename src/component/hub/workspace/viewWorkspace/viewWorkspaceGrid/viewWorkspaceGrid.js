import React, { useEffect, useState } from 'react'
import './viewWorkspaceGrid.css';
import { connect } from 'react-redux'
import ViewDetails from '../../../viewDetails/viewDetails'
import { actions } from '../../../../../redux/actions/action'
import { withRouter } from 'react-router-dom';
import $ from "jquery";

function ViewWorkspaceGrid(props) {
    const { workspace } = props
     const routeToProject = () => {
        props.setWorkspace(workspace)
        props.setProjects(workspace.projects)
        props.history.push("/" + props.user + "/workspace/" + workspace._id)
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
    function delete_workspace() {
        props.setShowToastDeleteWhenClickDelete()
        props.setWorkspace(workspace);
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
                        onClick={delete_workspace}
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
        deleteWorkspaceFromServer: () => dispatch(actions.deleteWorkspaceFromServer()),
        getWorkspaceByIdFromServer: (workspaceId) => dispatch(actions.getWorkspaceByIdFromServer(workspaceId)),
        setclose: () => dispatch(actions.setclose()),
        setProjects: (projects) => dispatch(actions.setProjects(projects))
    }


}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewWorkspaceGrid))
