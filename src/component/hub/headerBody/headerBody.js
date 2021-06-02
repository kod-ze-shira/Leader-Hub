
import React, { useState } from 'react';
import './headerBody.css';

export default function HeaderBody(props) {
    const [workspaceId, setWorkspaceId] = useState(0)
    // const [viewProjectByWorkspace, setViewProjectByWorkspace] = useState(false)


    const changeProjectId = (value) => {

        setWorkspaceId(value)
        // setViewProjectByWorkspace(true)
    }
    return (
        <div className='headerBody'>
            {/* <Logo nameWorkspace={props.nameWorkspace} /> */}
            {/* {viewProjectByWorkspace ? <CardsByProject workspaceId={workspaceId} /> : null} */}

        </div>
    )

}