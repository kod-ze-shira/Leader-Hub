import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ProjectsByWorkspace from '../../../hub/project/projectsByWorkspace/projectsByWorkspace'
import { Button } from 'react-bootstrap';

export function ViewWorkspaceName({ props, workspace }) {
    const [viewProjects, setViewProjects] = useState(false)
    const [showShare, setShowShare] = useState(false)


    const viewProjectsByWorkspace = () => {
        // return  <projectsByWorkspace/>
        setViewProjects(!viewProjects);
    }
    return (
        <>
            <div className="container" >
                <div className="row" onClick={viewProjectsByWorkspace}>
                    <div className="col-10">
                        <div>{workspace.name}</div>
                    </div>
                </div>
            </div>
        </>

    )
}