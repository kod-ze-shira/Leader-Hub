import React, { useEffect, useState } from 'react'
import './viewWorkspaceGrid.css';
import { connect } from 'react-redux'
import ViewDetails from '../../../viewDetails/viewDetails'
import { actions } from '../../../../../redux/actions/action'
import { withRouter } from 'react-router-dom';
import bin from '../../../../../assets/img/bin.png'
import duplicate from '../../../../../assets/img/duplicate-outline.png'
import pencil from '../../../../../assets/img/pencil-write.png'
import $ from "jquery";
import ReactTooltip from 'react-tooltip';
import title from '../../../../../Data/title.json'
import ShureDelete from '../../../shureDelete/shureDelete';
import styled, { css } from 'styled-components'

function ViewWorkspaceGrid(props) {
    // console.log("ViewWorkspaceGrid")
    const workspace = props.workspace
    // const myStyle=&:hover{
    //     'border': '1.5px solid workspace.colr'
    // }
    // export default function ProjectStyle(props) {
    const MyStyle = styled.div` 
        &:hover {
            border: 1.5px solid ${workspace.color} !important
        }`;
    useEffect(() => {

    }, [props.workspaces])

    const routeToProject = (e) => {
        props.setIndexWorkspace(props.indexWorkspace)
        // props.setCurrentIndexProject(0)
        props.history.push("/" + props.user + "/hub/workspace/" + workspace._id)
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
        // console.log(workspace)
        props.duplicateWorkspace(workspace._id);
    }

    function over_workspace(id) {
        $(`#${id} .iconsAction`).css({ 'display': 'inline' })
        $(`#${id} .stripeToSavePlace`).css({ 'color': 'rgb(220 220 226)' })
    }

    function delete_workspace() {
        // $(`#${workspace._id}`).css("display", "none")
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
                        <img class='imageIcon' src={pencil} data-tip data-for="edit"
                        ></img>
                        <ReactTooltip className="tooltip-style" data-tip id="edit" place="top" effect="solid">
                            {title.title_edit}
                        </ReactTooltip>
                    </div>
                    <div className="stripe stripeToSavePlace">|</div>
                    <div className=" delete iconsAction"
                        onClick={delete_workspace}
                        data-tip data-for="delete"
                    >
                        <img class='imageIcon' src={bin} ></img>
                        <ReactTooltip className="tooltip-style" data-tip id="delete" place="top" effect="solid">
                            {title.title_delete}
                        </ReactTooltip>
                    </div>
                    <div className="stripe stripeToSavePlace" >|</div>
                    <div className="add iconsAction" onClick={duplicateWorkspace} data-tip data-for="duplicate" >
                        <img class='imageIcon' src={duplicate} ></img>
                        <ReactTooltip className="tooltip-style" data-tip id="duplicate" place="top" effect="solid">
                            {title.title_duplicate}
                        </ReactTooltip>

                    </div>
                </div>

                <MyStyle className="Workspacegrid pt-2 pb-2 px-2 mt-1 " id={props.workspace._id ? "" : "disable-workspace"}
                    onClick={(e) => routeToProject(e)}
                >
                    <div>
                        <div className="logoWorkspace1 " >
                            <div className="logo-w"
                                // style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}
                                style={{ backgroundColor: workspace.color ? workspace.color : "transparent" }}
                            >
                                {workspace.name ? workspace.name[0].toUpperCase() : null}
                            </div>
                        </div>
                        <div className="name mt-1"><p className='nameWorkspaceInGrid' title={workspace.name}>{workspace.name}</p> </div>
                        <p className="productionDateW" data-tip data-for="date_p">Create {workspace.productionDate}</p>                    </div>

                    {/* <ReactTooltip data-tip id="date_p" place="bottom" effect="solid">
                        {title.title_production_date}
                    </ReactTooltip> */}
                </MyStyle>

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
        setCurrentIndexProject: (index) => dispatch(actions.setCurrentIndexProject(index)),
        setIndexWorkspace: (index) => dispatch(actions.saveIndexOfWorkspaceInRedux(index)),
        setWorkspace: (workspace) => dispatch(actions.setWorkspace(workspace)),
        setProjects: (projects) => dispatch(actions.setProjects(projects)),
        duplicateWorkspace: (workspaceId) => dispatch(actions.duplicateWorkspace(workspaceId)),
        saveIndexOfWorkspaceInRedux: (index) => dispatch(actions.saveIndexOfWorkspaceInRedux(index))
    }


}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewWorkspaceGrid))
