import React, { useEffect, useState } from 'react'
import './viewWorkspaceGrid.css';
import { connect } from 'react-redux'
import ViewDetails from '../../../viewDetails/viewDetails'
import { actions } from '../../../../../redux/actions/action'
import { withRouter } from 'react-router-dom';
import bin from '../../../../img/bin.png'
import duplicate from '../../../../img/duplicate-outline.png'
import pencil from '../../../../img/pencil-write.png'
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
    function editWorkspace() {
        // setEdit(true);
        props.setWorkspace(workspace)
        props.editWorkspace()

    }
    function duplicateWorkspace() {
        props.setWorkspace(workspace);
        props.duplicateWorkspace();
    }

    // $(`.ViewWorkspace`).mouseover(function () {
    //     console.log(this.id)
    //     $(`#${this.id} .iconsAction`).css({ 'display': 'inline' })


    // })
    function over_workspace(id) {
        $(`#${id} .iconsAction`).css({ 'display': 'inline' })

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
                    <div
                        className="col-1 edit iconsAction" onClick={editWorkspace}>
                        <img src={pencil}></img>
                    </div>
                    <div className="ml-1 stripe ">|</div>
                    <div className="col-1 delete iconsAction"
                        onClick={delete_workspace}>
                        <img src={bin}></img>
                    </div>
                    <div className="ml-1 stripe">|</div>
                    <div className="col-1 add iconsAction" onClick={duplicateWorkspace}>
                        <img src={duplicate}></img>
                    </div>
                </div>
                <div className="Workspacegrid"
                    onClick={routeToProject} >
                    <div>
                        <div className="logoWorkspace1 " >
                            <div className="mt-1 logo"
                                style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
                                {workspace.name ? workspace.name[0].toUpperCase() : null}                            </div>
                        </div>
                        <div className="name "><p>{workspace.name}</p> </div>
                        <div className=" description-and-productionDate">
                            <p>{workspace.productionDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state) => {

    return {
        user: state.public_reducer.userName,
        workspaces: state.workspace_reducer.workspaces,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setWorkspace: (workspace) => dispatch(actions.setWorkspace(workspace)),
        setProjects: (projects) => dispatch(actions.setProjects(projects)),
        duplicateWorkspace: () => dispatch(actions.duplicateWorkspace())
    }


}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewWorkspaceGrid))
