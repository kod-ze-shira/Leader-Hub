import React, { useEffect, useState } from 'react'
import './viewWorkspaceGrid.css';
import { connect } from 'react-redux'
import ViewDetails from '../../../viewDetails/viewDetails'
import { actions } from '../../../../../redux/actions/action'
import { withRouter } from 'react-router-dom';

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
        props.history.push("/" + props.user + "/workspace/" + workspace._id)
    }
    const changeFiledInWorkspace = (input) => {
        props.setWorkspaceOnChangeFiled(input.target.name, input.target.value)
    }


    const [over, setOver] = useState(false);
    const [edit, setEdit] = useState(false);

    function outOver() {
        setOver(false);
    }
    function EditWorkspace() {
        setEdit(true);
    }
    function outEdit() {
        setEdit(false);
    }

    return (
        <>
            {
                over ?
                    <>
                        <div>
                            <div className="row"
                                onMouseOut={outOver}
                            >
                                <div className="col-1 edit" onClick={EditWorkspace}><img src={require('../../../../img/pencil-write.png')}></img></div>
                                <div className="ml-1 stripe">|</div>
                                <div className="col-1 delet" onClick={() => { props.deleteWorkspaceInServer(); }}><img src={require('../../../../img/bin.png')}></img></div>
                                <div className="ml-1 stripe">|</div>
                                <div className="col-1 add"> <img src={require('../../../../img/duplicate-outline.png')}></img></div>
                            </div>
                            <div className="Workspacegrid" onMouseOut={outOver} >
                                <div>
                                    < div className="logoWorkspace1  ml-5 ">
                                        <div className="mt-2 logo"

                                            style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
                                            {workspace.name[0].toUpperCase()}

                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className=" name "> {workspace.name}</div>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </>



                    :
                    <div className=" Workspacegrid mt-4"
                        onClick={() => routeToWorkspace()}

                        onMouseOver={over_workspace}
                    >

                        < div className="logoWorkspace1 ml-5 mt-3"
                            style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
                            {workspace.name[0].toUpperCase()}


                        </div>
                        <div className="mt-3"><b>{workspace.name}</b></div>
                    </div>

            }
            {
                edit ?
                    <ViewDetails >

                    </ViewDetails>


                    // <div className="editWorkspace ">
                    //     <div className="row mt-5">
                    //         <div className="col-3"></div>

                    //         <div className="nameworkspace row"><b>Name Workspace:</b>
                    //         </div>
                    //     </div>

                    //     <div className="row mt-5">
                    //         <div className="col-3"></div>
                    //         <div>{workspace.name}</div>
                    //         {/* <input value={workspace.name} onChange={(input) => changeFiledInWorkspace(input)}></input>
                    //         <button onClick={props.saveWorkspaceInServerUfterEdit}>save</button> */}

                    //     </div>
                    //     <div className="row mt-5">


                    //     </div>
                    //     <div className="row mt-5">
                    //         <div className="col-5"></div>
                    //         <button onClick={outEdit} className="okEditWorkspace">exit</button>
                    //     </div>





                    // </div>

                    : null
            }
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
        // getWorkspaceByIdFromServer: () => dispatch(actions.getWorkspaceByIdFromServer()),
        setWorkspace: () => dispatch(actions.setWorkspace()),
        deleteWorkspaceInServer: () => dispatch(actions.deleteWorkspaceInServer()),
        getWorkspaceByIdFromServer: (workspaceId) => dispatch(actions.getWorkspaceByIdFromServer(workspaceId)),
        setWorkspaceOnChangeFiled: (nameFiled, value) => dispatch(actions.setWorkspaceOnChangeFiled(nameFiled, value)),
        saveWorkspaceInServerUfterEdit: (workspace) => dispatch(actions.editWorkspaceInServer(workspace))
    }


}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewWorkspaceGrid))