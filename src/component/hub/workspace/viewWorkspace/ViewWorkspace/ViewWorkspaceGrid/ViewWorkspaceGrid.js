import React, { useEffect, useState } from 'react'
import './ViewWorkspaceGrid.css';
import { connect } from 'react-redux'
import { actions } from '../../../../../../redux/actions/action'
function ViewWorkspaceGrid({ workspace }) {
    const [viewProjects, setViewProjects] = useState(false)
    const [showShare, setShowShare] = useState(false)
    const [openEditWorkspace, setOpenEditWorkspace] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const viewProjectsByWorkspace = () => {
        // return  <projectsByWorkspace/>
        setViewProjects(!viewProjects);
    }

    const toOpenEditWorkspace = () => {
        setOpenEditWorkspace(!openEditWorkspace)
    }
    return (
        <>

            <div className="row">
                <div className="col-4 Workspace" >
                    < div className="logoWorkspaceGrid"
                        style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
                        {workspace.name[0].toUpperCase()}
                        {/* {
                            workspace.name && workspace.name.indexOf(" ") && workspace.name.indexOf(" ") + 1 ?
                                workspace.name[workspace.name.indexOf(" ") + 1].toUpperCase() : null
                        } */}
                    </div>
                </div>
                <div className="col-3">{workspace.name}</div>




            </div>
        </>

    )
}
const mapStateToProps = (state) => {

    return {
        workspaces: state.public_reducer.worksapces,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {

        getWorkspaceByIdFromServer: () => dispatch(actions.getWorkspaceByIdFromServer()),

    }


}
export default connect(mapStateToProps, mapDispatchToProps)(ViewWorkspaceGrid)