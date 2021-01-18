import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ProjectsByWorkspace from '../../../hub/project/projectsByWorkspace/projectsByWorkspace'
import { Button } from 'react-bootstrap';


import './viewWorkspaceName.css'

export function ViewWorkspaceName({ props, workspace }) {
    const [viewProjects, setViewProjects] = useState(false)
    const [showShare, setShowShare] = useState(false)


    const viewProjectsByWorkspace = () => {
        // return  <projectsByWorkspace/>
        setViewProjects(!viewProjects);
    }
    return (
        <>
            <ul className="pl-0">
                <li className="">
                    {workspace.name}
                </li>
            </ul>
        </>

    )
}