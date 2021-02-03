
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

    return (

        <div className="Workspacegrid"
            onClick={() => routeToWorkspace()}
        >

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