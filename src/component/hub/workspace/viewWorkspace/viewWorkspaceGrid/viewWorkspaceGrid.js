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


    const workspace = props.workspace
    useEffect(() => {
    }, [props.workspaces])

    const routeToProject = () => {
        props.setIndexWorkspace(props.indexWorkspace)
        props.history.push("/" + props.user + "/workspace/" + workspace._id)
    }
    function outOver(id) {
        $(`#${id} .iconsAction`).css({ 'display': 'none' })
        $(`#${id} .stripeToSavePlace`).css({ 'color': '#ffffff00' })
    }
    function editWorkspace(event) {
        // props.setWorkspace(workspace)//to select workspace to edit and send him to server
        props.saveIndexOfWorkspaceInRedux(props.indexWorkspace)
        props.editWorkspace(workspace)
        event.stopPropagation();
    }
    function duplicateWorkspace() {
        props.setWorkspace(workspace);
        console.log(workspace)
        props.duplicateWorkspace(workspace._id);
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
        $(`#${workspace._id}`).css("display", "none")
        props.setShowToastDeleteWhenClickDelete({ 'type': 'Workspace', 'object': workspace })
        props.setWorkspace(workspace);
    }
    return (
        <>
            <div className="ViewWorkspace" id={workspace._id}
                onMouseOver={() => over_workspace(workspace._id)}
                onMouseOut={() => outOver(workspace._id)}>
                <div className="row iconsActions" >
                    <div
                        className=" edit iconsAction" onClick={editWorkspace}>
                        <img class='imageIcon' src={pencil} title="Edit"></img>
                    </div>
                    <div className="stripe stripeToSavePlace">|</div>
                    <div className=" delete iconsAction"
                        onClick={delete_workspace}>
                        <img class='imageIcon' src={bin} title="Delete"></img>
                    </div>
                    <div className="stripe stripeToSavePlace" >|</div>
                    <div className="add iconsAction" onClick={duplicateWorkspace}>
                        <img class='imageIcon' src={duplicate} title="Duplicate"></img>

                    </div>
                </div>
                <div className="Workspacegrid"
                    onClick={routeToProject} >
                    <div>
                        <div className="logoWorkspace1 " >
                            <div className="logo-w"
                                style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}
                            >
                                {workspace.name ? workspace.name[0].toUpperCase() : null}
                            </div>
                        </div>
                        <div className="name "><p className='nameWorkspaceInGrid' title={workspace.name}>{workspace.name}</p> </div>
                        <div className=" description-and-productionDate">
                            <p className="productionDateW" title="Production Date">{workspace.productionDate}</p>
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
        setIndexWorkspace: (index) => dispatch(actions.saveIndexOfWorkspaceInRedux(index)),
        setWorkspace: (workspace) => dispatch(actions.setWorkspace(workspace)),
        setProjects: (projects) => dispatch(actions.setProjects(projects)),
        duplicateWorkspace: (workspaceId) => dispatch(actions.duplicateWorkspace(workspaceId)),
        saveIndexOfWorkspaceInRedux: (index) => dispatch(actions.saveIndexOfWorkspaceInRedux(index))
    }


}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewWorkspaceGrid))
