import React, { useEffect, useState } from 'react'
import './viewWorkspacelist.css';
import { connect } from 'react-redux'
import { actions } from '../../../../../redux/actions/action'
import { withRouter } from 'react-router-dom';
import ViewDetails from '../../../viewDetails/viewDetails'
import bin from '../../../../img/bin.png'
import duplicate from '../../../../img/duplicate-outline.png'
import pencil from '../../../../img/pencil-write.png'
import $ from "jquery";


function ViewWorkspaceList(props) {
    const { workspace } = props
    const [openEditWorkspace, setOpenEditWorkspace] = useState(false)
    const [edit, setEdit] = useState(false);

    const [indexWorkspace, setIndexWorkspace] = useState()

    
    useEffect(() => {
        setIndexWorkspace(props.index)
    }, [props.workspaces])

    const routeToProject = () => {
        // props.setWorkspace(workspace)
        // props.setProjects(workspace.projectList)
        props.history.push("/" + props.user + "/workspace/" + workspace.workspace._id)
    }

    function editWorkspace() {
        props.saveIndexOfWorkspaceInRedux(indexWorkspace)
        props.editWorkspace()
    }
    function delete_workspace() {
        $(`#${workspace.workspace._id}`).css("display", "none")

        props.setShowToastDeleteWhenClickDelete({ 'type': 'Workspace', 'object': workspace.workspace })
        props.setWorkspace(workspace);
    }
    function duplicateWorkspace() {
        props.setWorkspace(workspace.workspace);
        props.duplicateWorkspace(workspace.workspace._id);
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
            <div id={workspace.workspace._id}>
                <div className="row WorkspaceList mt-3"

                    onMouseOver={() => func_over(workspace.workspace._id)}
                    onMouseOut={() => outOver(workspace.workspace._id)}  >
                    <div className="col-10" onClick={() => routeToProject(workspace.workspace._id)}
                    >

                        <div className="row "  >
                            <div className="Workspace "  >
                                <div className="logoWorkspacelist logo-w "
                                    style={{ backgroundColor: workspace.workspace.color ? workspace.workspace.color ? workspace.workspace.color : "#F7B500" : "#F7B500" }}>
                                    {workspace.workspace.name ? workspace.workspace.name[0].toUpperCase() : null}                            </div>


                            </div>
                            <div className="col-3">
                                <p className="workspace-name-list">{workspace.workspace.name} </p>
                                <div className="description-and-date">
                                    <p className=""> {workspace.workspace.description}</p>
                                    <p className="">Update {workspace.workspace.productionDate}</p>
                                </div>
                            </div>

                        </div>

                    </div>
                    {/* { */}
                    {/* // over ? */}
                    <div className="col-2">
                        <div className="row  mt-4 icons-in-list-w" >
                            <div
                                className="col-1  edit iconsAction" onClick={editWorkspace}>
                                <img src={pencil}></img>
                            </div>
                            <div className="ml-1 stripe">|</div>
                            <div
                                className="col-1 ml-1 delete iconsAction" onClick={duplicateWorkspace} >
                                <img src={duplicate}></img>
                            </div>
                            <div className="ml-1 stripe">|</div>
                            <div
                                className="col-1 ml-1 delete iconsAction" onClick={delete_workspace} >
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
        setWorkspace: (workspace) => dispatch(actions.setWorkspace(workspace)),
        setProjects: (projects) => dispatch(actions.setProjects(projects)),
        duplicateWorkspace: (workspaceId) => dispatch(actions.duplicateWorkspace(workspaceId)),
        saveIndexOfWorkspaceInRedux: (index) => dispatch(actions.saveIndexOfWorkspaceInRedux(index))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewWorkspaceList))

