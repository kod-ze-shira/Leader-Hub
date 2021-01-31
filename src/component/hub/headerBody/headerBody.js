
import React, { useState } from 'react'
import Logo from '../logo/logo';
import './headerBody.css'
import DropDownWorkspace from './dropDownWorkspace/dropDownWorkspace'
export default function HeaderBody(props) {
    const [projectId, setProjectId] = useState(0)


    const changeProjectId = (value) => {
        setProjectId(value)
        // setViewCardsByProject(true)
    }
    return (
        <div className='headerBody'>
            <Logo nameWorkspace={props.nameWorkspace} />
            <DropDownWorkspace changeProject={changeProjectId} />

        </div>
    )

}