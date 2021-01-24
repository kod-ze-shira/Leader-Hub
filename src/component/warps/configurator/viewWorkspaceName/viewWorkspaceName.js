import React, { useEffect, useState } from 'react'
import Configurator from '../configurator';
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import { Button } from 'react-bootstrap';
import ProjectsByWorkspace from '../../../hub/project/projectsByWorkspace/projectsByWorkspace'
import './viewWorkspaceName.css'
import BtnLiveChat from '../../../hub/project/btnLiveChat/btnLiveChat';

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
                    <Configurator /> :
                    <>
                        <ul className="p-0 col-12">
                            <li className="p-0 ">
                                <button className="workspace-btn" onClick={func} >{workspace.name}</button>
                                {flag ?
                                    <ProjectsByWorkspace idWorkspace={workspace._id} />
                                    : null}
                            </li>
                        </ul>
                        {/* <BtnLiveChat idWorkspace={workspace._id} />  */}
                    </>
                }
            </>

        )
    }
)