import React, { useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
// import { Button } from 'react-bootstrap';
import ProjectsByWorkspace from '../../../hub/project/projectsByWorkspace/projectsByWorkspace'
import './viewWorkspaceName.css'

const mapStateToProps = (state) => {
    return {
        projects: state.public_reducer.projects,
        isConfiguratorOpenWorkspace: state.workspace_reducer.isConfiguratorOpenWorkspace
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setisConfiguratorOpenWorkspace: () => dispatch(actions.setisConfiguratorOpenWorkspace()),
        // getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspace(idWorkspace))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(

    function ViewWorkspaceName({ isConfiguratorOpenWorkspace, setisConfiguratorOpenWorkspace, props, workspace }) {


        const [viewProjects, setViewProjects] = useState(false)
        const [showShare, setShowShare] = useState(false)
        const [flag, setFlag] = useState(false)
        function func() {
            setFlag(!flag)
        }
        return (
            <>
                {isConfiguratorOpenWorkspace ?

                    <>

                        <ul className="p-0 col-12">
                            <li className="p-0 ">
                                <button className="workspace-btn" onClick={func} >{workspace.name}</button>
                                {flag ?
                                    <ProjectsByWorkspace idWorkspace={workspace._id}
                                        viewToastComplete={props.viewToastComplete}
                                        workspaceName={workspace.name} />
                                    : null}
                            </li>
                        </ul>
                    </> : null
                }
            </>

        )
    }
)