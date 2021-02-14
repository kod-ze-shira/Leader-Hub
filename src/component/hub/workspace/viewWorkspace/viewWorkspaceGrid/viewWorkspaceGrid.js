import React, { useEffect, useState } from 'react'
import './viewWorkspaceGrid.css';
import { connect } from 'react-redux'
import ViewDetails from '../../../viewDetails/viewDetails'
import { actions } from '../../../../../redux/actions/action'
import { withRouter } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast'

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
        props.history.push("/" + props.user + "/workspace/" + workspace._id)
    }
    const changeFiledInWorkspace = (input) => {
        props.setWorkspaceOnChangeFiled(input.target.name, input.target.value)
    }


    const [over, setOver] = useState(false);
    const [remove, setremove] = useState(false);
    const [edit, setEdit] = useState(false);
    const toOpenEditWorkspace = () => {
        setOpenEditWorkspace(!openEditWorkspace)
    }

    function outOver() {
        setOver(false);
    }
    function EditWorkspace() {
        setEdit(true);
        props.setWorkspace(workspace)
    }
    function out_remove() {
        setremove(false);
    }


    function outEdit() {
        setEdit(false);
    }
    function over_workspace() {
        setOver(true);
    }
    function func_remove() {
        setremove(true);

    }

    return (
        <>
            {
                over ?
                    <>
                        <div

                        >
                            <div className="row"
                                onMouseOut={outOver}
                            >
                                <div className="col-1 edit" onClick={EditWorkspace}>
                                    <img src={require('../../../../img/pencil-write.png')}></img>
                                </div>
                                <div className="ml-1 stripe">|</div>
                                <div className="col-1 delete"
                                    onClick={func_remove}>
                                    <img src={require('../../../../img/bin.png')}></img>
                                </div>
                                <div className="ml-1 stripe">|</div>
                                <div className="col-1 add">
                                    <img src={require('../../../../img/duplicate-outline.png')}></img>
                                </div>
                            </div>
                            <div className="Workspacegrid"
                                onClick={() => routeToWorkspace()}
                            //  onMouseOut={outOver}
                            >
                                <div>
                                    < div className="logoWorkspace1  ml-5 ">
                                        <div className="mt-2 logo"

                                            style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
                                            {workspace.name[0].toUpperCase()}

                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="name"><b>{workspace.name}</b> </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </>


                    :
                    <div className=" Workspacegrid mt-4"


                        onMouseOver={over_workspace}
                    >

                        < div className="logoWorkspace1 ml-5 mt-3"
                            style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
                            {workspace.name[0].toUpperCase()}


                        </div>
                        <div className="mt-3 name"><b>{workspace.name}</b></div>
                    </div>

            }

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
                        <div
                            aria-live="polite"
                            aria-atomic="true"

                            className="remove"
                            onClick={out_remove}

                        >
                            <Toast className="tost"

                            >
                                <Toast.Header >


                                </Toast.Header>


                                <Toast.Body>
                                    <div className="row ">
                                        <div className="col-8"> workspace leader was deleted  </div>
                                        <div className="col-2 Undo" onClick={() => { props.setWorkspace(workspace); props.deleteWorkspaceInServer(); }}>Undo</div>


                                    </div></Toast.Body>
                            </Toast>
                        </div>

                    </>

                    : null
            }
        </>







    )
}
const mapStateToProps = (state) => {

    return {
        workspaces: state.workspace_reducer.workspaces,
        user: state.public_reducer.userName,



    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // getWorkspaceByIdFromServer: () => dispatch(actions.getWorkspaceByIdFromServer()),
        setWorkspace: (workspace) => dispatch(actions.setWorkspace(workspace)),
        deleteWorkspaceInServer: () => dispatch(actions.deleteWorkspaceInServer()),
        getWorkspaceByIdFromServer: (workspaceId) => dispatch(actions.getWorkspaceByIdFromServer(workspaceId)),

    }


}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewWorkspaceGrid))
