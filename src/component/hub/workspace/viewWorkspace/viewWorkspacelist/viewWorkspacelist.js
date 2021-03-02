import React, { useEffect, useState } from 'react'
import './viewWorkspacelist.css';
import { connect } from 'react-redux'
import { actions } from '../../../../../redux/actions/action'
import { withRouter } from 'react-router-dom';
import ViewDetails from '../../../viewDetails/viewDetails'
import $ from "jquery";


function ViewWorkspaceList(props) {
    const { workspace } = props
    const [openEditWorkspace, setOpenEditWorkspace] = useState(false)
    const [edit, setEdit] = useState(false);

    const routeToProject = () => {
        props.setWorkspace(workspace)
        props.setProjects(workspace.projects)
        props.history.push("/" + props.user + "/workspace/" + workspace._id)
    }
    function EditWorkspace() {
        props.setWorkspace(workspace)//to select workspace to edit and send him to server
        props.setclose()
        setEdit(true);
    }
    function outEdit() {
        setEdit(false);
    }
    function func_remove() {
        props.setShowToastDeleteWhenClickDelete()
        props.setWorkspace(workspace);
    }
    const toOpenEditWorkspace = () => {
        setOpenEditWorkspace(!openEditWorkspace)
    }
    const [over, setover] = useState(false);

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
                            </div>
                        </div>
                        <b className="mt-4 ml-2">{workspace.name} </b>

                    </div>

                </div>
                {/* { */}
                {/* // over ? */}
                <div className="row  mt-4" >

                    <div data-toggle="tooltip" data-placement="top" title="Edit"
                        className="col-1  edit iconsAction" onClick={EditWorkspace}>
                        <img src={require('../../../../img/pencil-write.png')}></img>
                    </div>
                    <div className="ml-2 stripe ">|</div>
                    <div data-toggle="tooltip" data-placement="top" title="Garbage"
                        className="col-1 ml-1 delete iconsAction" onClick={func_remove} >
                        <img src={require('../../../../img/bin.png')}></img>
                    </div>

                </div>

                {/* : null */}
                {/* } */}

            </div>
            {
                edit ?
                    <>
                        <ViewDetails closeViewDetails={() => setEdit(false)} from="editWorkspace" > </ViewDetails>
                    </>
                    : null
            }
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.public_reducer.userName,
        close: state.public_reducer.close,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        getWorkspaceByIdFromServer: (workspaceId) => dispatch(actions.getWorkspaceByIdFromServer(workspaceId)),
        setWorkspace: (workspace) => dispatch(actions.setWorkspace(workspace)),
        setcloseEditWorkspace: () => dispatch(actions.setcloseEditWorkspace()),
        setclose: () => dispatch(actions.setclose()),
        setProjects: (projects) => dispatch(actions.setProjects(projects)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewWorkspaceList))

