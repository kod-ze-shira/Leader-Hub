
import React, { useEffect, useState } from 'react'
import './viewWorkspaceGrid.css';
import { connect } from 'react-redux'
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

    const toOpenEditWorkspace = () => {
        setOpenEditWorkspace(!openEditWorkspace)
    }
    function over_workspace() {
        setOver(true);
    }
    const [over, setOver] = useState(false);

    function outOver() {
        setOver(false);
    }

    return (
        <>
            {
                over ?

                    <div>
                        <div className="row"

                        >
                            <div className="col-1 edit"><img src={require('../../../../img/pencil-write.png')}></img></div>

                            <div className="col-1 delet"><img src={require('../../../../img/bin.png')}></img></div>

                            <div className="col-1 add"> <img src={require('../../../../img/duplicate-outline.png')}></img></div>
                        </div>
                        <div className="Workspacegrid" onMouseOut={outOver} >
                            <div className="mt-2">
                                < div className="logoWorkspace1 ml-5"

                                    style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
                                    {workspace.name[0].toUpperCase()}
                                    {/* {
                                        workspace.name && workspace.name.indexOf(" ") && workspace.name.indexOf(" ") + 1 ?
                                            workspace.name[workspace.name.indexOf(" ") + 1].toUpperCase() : null
                                    } */}



                                </div>
                                <div className="mt-3"><b>{workspace.name}</b></div>
                            </div>
                        </div>


                    </div>


                    :
                    <div className=" Workspacegrid mt-4" onMouseOver={over_workspace} onClick={() => routeToWorkspace()}>

                        < div className="logoWorkspace1 ml-5 mt-3"
                            style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
                            {workspace.name[0].toUpperCase()}
                            {/* {
                            workspace.name && workspace.name.indexOf(" ") && workspace.name.indexOf(" ") + 1 ?
                                workspace.name[workspace.name.indexOf(" ") + 1].toUpperCase() : null
                        } */}

                        </div>
                        <div className="mt-3"><b>{workspace.name}</b></div>
                    </div>
            }

        </>
    )
}
const mapStateToProps = (state) => {

    return {
        user: state.public_reducer.userName
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getWorkspaceByIdFromServer: () => dispatch(actions.getWorkspaceByIdFromServer()),
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewWorkspaceGrid))