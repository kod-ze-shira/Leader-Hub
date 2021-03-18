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
    const workspace = props.workspace1


    const routeToProject = () => {
        props.setWorkspace(workspace)
        props.setProjects(workspace.projectList)
        props.history.push("/" + props.user + "/workspace/" + workspace.workspace._id)
    }
    function outOver(id) {
        $(`#${id} .iconsAction`).css({ 'display': 'none' })
        $(`#${id} .stripeToSavePlace`).css({ 'color': '#ffffff00' })


    }
    function editWorkspace() {
        props.setWorkspace(workspace)//to select workspace to edit and send him to server
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
        $(`#${id} .stripeToSavePlace`).css({ 'color': 'rgb(220 220 226)' })
    }
  
    function delete_workspace() {
        $(`#${workspace.workspace._id}`).css("display","none")
        props.setShowToastDeleteWhenClickDelete({ 'type': 'Workspace', 'object': workspace.workspace })
        props.setWorkspace(workspace);
    }
    return (
        <>
            <div className="ViewWorkspace" id={workspace.workspace._id}
                onMouseOver={() => over_workspace(workspace.workspace._id)}
                onMouseOut={() => outOver(workspace.workspace._id)}>
                <div className="row iconsActions" >
                    <div
                        className=" edit iconsAction" onClick={editWorkspace}>
                        <img class='imageIcon' src={pencil}></img>
                    </div>
                    <div className="stripe stripeToSavePlace">|</div>
                    <div className=" delete iconsAction"
                        onClick={delete_workspace}>
                        <img class='imageIcon' src={bin}></img>
                    </div>
                    <div className="stripe stripeToSavePlace" >|</div>
                    <div className="add iconsAction" onClick={duplicateWorkspace}>
                        <img class='imageIcon' src={duplicate}></img>

                    </div>
                </div>
                <div className="Workspacegrid"
                    onClick={routeToProject} >
                    <div>
                        <div className="logoWorkspace1 " >
                            <div className="logo"
                                style={{ backgroundColor: workspace.workspace.color ? workspace.workspace.color ? workspace.workspace.color : "#F7B500" : "#F7B500" }}
                            >
                                {workspace.workspace.name ? workspace.workspace.name[0].toUpperCase() : null}
                            </div>
                        </div>
                        <div className="name "><p>{workspace.workspace.name}</p> </div>
                        <div className=" description-and-productionDate">
                            <p className="productionDateW">{workspace.workspace.productionDate}</p>
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
