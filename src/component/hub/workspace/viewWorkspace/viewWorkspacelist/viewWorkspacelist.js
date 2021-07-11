import React, { useEffect, useState } from 'react'
import './viewWorkspacelist.css';
import { connect } from 'react-redux'
import { actions } from '../../../../../redux/actions/action'
import { withRouter } from 'react-router-dom';
import ViewDetails from '../../../viewDetails/viewDetails'
import bin from '../../../../../assets/img/bin.png'
import duplicate from '../../../../../assets/img/duplicate-outline.png'
import pencil from '../../../../../assets/img/pencil-write.png'
import $ from "jquery";
import ReactTooltip from 'react-tooltip';
import title from '../../../../../Data/title.json'
import styled, { css } from 'styled-components'


function ViewWorkspaceList(props) {
    const { workspace } = props
    const [openEditWorkspace, setOpenEditWorkspace] = useState(false)
    const [edit, setEdit] = useState(false);

    const [indexWorkspace, setIndexWorkspace] = useState()

    const MyStyle = styled.div` 
    &:hover {
        border: 1.5px solid ${workspace.color} !important
    }`;
    useEffect(() => {
        setIndexWorkspace(props.index)
    }, [props.workspaces])

    const routeToProject = () => {
        props.setIndexWorkspace(props.indexWorkspace)
        // props.setCurrentIndexProject(0)
        props.history.push("/" + props.user + "/hub/workspace/" + workspace._id)
    }

    function editWorkspace(event) {
        props.saveIndexOfWorkspaceInRedux(indexWorkspace)
        props.editWorkspace()
        event.stopPropagation();

    }
    function delete_workspace() {
        $(`#${workspace._id}`).css("display", "none")

        props.setShowToastDeleteWhenClickDelete({ 'type': 'Workspace', 'object': workspace })
        props.setWorkspace(workspace);
    }
    function duplicateWorkspace() {
        props.setWorkspace(workspace);
        props.duplicateWorkspace(workspace._id);
    }
    const [over, setover] = useState(false);

    function func_over(id) {
        $(`#${id} .iconsAction`).css({ 'display': 'inline' })

    }

    function outOver(id) {
        $(`#${id} .iconsAction`).css({ 'display': 'none' })
    }

    return (
        <>
            <div id={workspace._id}>
                <div className="row WorkspaceList mt-3"

                    onMouseOver={() => func_over(workspace._id)}
                    onMouseOut={() => outOver(workspace._id)}  >
                    <div className="col-10" onClick={() => routeToProject(workspace._id)}
                    >


                        <div className="row "  >
                            <MyStyle className="Workspace"
                                onClick={routeToProject}
                            >
                                {/* <div className="Workspace "  > */}

                                <div className="logoWorkspacelist logo-w-list "
                                    style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
                                    {workspace.name ? workspace.name[0].toUpperCase() : null}                            </div>


                                {/* </div> */}
                            </MyStyle>
                            <div className="col-9 col-sm-7">
                                <p className="workspace-name-list">{workspace.name} </p>
                                <div className="description-and-date">
                                    <p className=""> {workspace.description}</p>
                                    <p className="">Update {workspace.productionDate}</p>
                                </div>
                            </div>

                        </div>

                    </div>
                    {/* { */}
                    {/* // over ? */}
                    <div className="col-2">
                        <div className="row  mt-4 icons-in-list-w" >
                            <div
                                data-tip data-for="edit"
                                className="col-1  edit iconsAction" onClick={editWorkspace}>
                                <img src={pencil}></img>
                                <ReactTooltip className="tooltip-style" data-tip id="edit" place="bottom" effect="solid">
                                    {title.title_edit}
                                </ReactTooltip>
                            </div>
                            <div className="ml-1 stripe">|</div>
                            <div
                                data-tip data-for="duplicate"
                                className="col-1 ml-1 delete iconsAction" onClick={duplicateWorkspace} >
                                <img src={duplicate}></img>
                                <ReactTooltip className="tooltip-style" data-tip id="duplicate" place="bottom" effect="solid">
                                    {title.title_duplicate}
                                </ReactTooltip>
                            </div>
                            <div className="ml-1 stripe">|</div>
                            <div
                                className="col-1 ml-1 delete iconsAction" data-tip data-for="delete" onClick={delete_workspace} >
                                <ReactTooltip className="tooltip-style" data-tip id="delete" place="bottom" effect="solid">
                                    {title.title_delete}
                                </ReactTooltip>
                                <img src={bin}></img>
                            </div>
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
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setIndexWorkspace: (index) => dispatch(actions.saveIndexOfWorkspaceInRedux(index)),

        setWorkspace: (workspace) => dispatch(actions.setWorkspace(workspace)),
        setProjects: (projects) => dispatch(actions.setProjects(projects)),
        duplicateWorkspace: (workspaceId) => dispatch(actions.duplicateWorkspace(workspaceId)),
        saveIndexOfWorkspaceInRedux: (index) => dispatch(actions.saveIndexOfWorkspaceInRedux(index)),
        setCurrentIndexProject: (index) => dispatch(actions.setCurrentIndexProject(index)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewWorkspaceList))

