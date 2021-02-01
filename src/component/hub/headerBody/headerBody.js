
import React, { useState } from 'react'
import Logo from '../logo/logo';
import './headerBody.css'
import DropDownWorkspace from './dropDownWorkspace/dropDownWorkspace'

export default function HeaderBody(props) {
    const [workspaceId, setWorkspaceId] = useState(0)
    // const [viewProjectByWorkspace, setViewProjectByWorkspace] = useState(false)


    const changeProjectId = (value) => {

        setWorkspaceId(value)
        // setViewProjectByWorkspace(true)
    }
    return (
        <div className='headerBody'>
            <Logo nameWorkspace={props.nameWorkspace} />
            {/* {viewProjectByWorkspace ? <CardsByProject workspaceId={workspaceId} /> : null} */}
            <DropDownWorkspace />

        </div>
    )

}