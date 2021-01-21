import React, { useEffect, useState } from 'react'
import './viewWorkspace.css';
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ProjectsByWorkspace from '../../project/projectsByWorkspace/projectsByWorkspace'
import TeamExample from '../../team/teamExample'
import { Button, Card, Form } from 'react-bootstrap';
import EditWorkspace from '../editWorkspace/editWorkspace'

export function ViewWorkspace({ props, workspace }) {
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
      <Card className="cardWorkspace"
        onMouseOver={() => setShowInput(true)}
        onMouseOut={() => setShowInput(false)}
      >
        {showInput ?
          <input type="checkbox"
            onMouseOver={() => setShowInput(true)}
            onClick={() => setShowInput(true)}
            className='checkWorkspace' />
          : null}
        <div className="logoWorkspace"
          onMouseOver={() => setShowInput(true)}

          style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
          {workspace.name[0].toUpperCase()}

        </div>

        <div className='nameWorkspace'
          onMouseOver={() => setShowInput(true)}
        >{workspace.name}</div>
        <div>{workspace.startDate}</div>
        {/* <button onClick={() => setOpenEditWorkspace(!openEditWorkspace)}>edit</button> */}
        {/* <button onClick={viewProjectsByWorkspace}>view projects of workspace</button> */}

        {/* <Button onClick={() => setShowShare(!showShare)} variant="primary">
          Share
         </Button>
        {
          showShare ? <TeamExample nameWorkspace={workspace.name}></TeamExample> : null
        } */}

        <div>
          {viewProjects ? <ProjectsByWorkspace idWorkspace={workspace._id} /> : null}
        </div>
        <div>
          {openEditWorkspace ? <EditWorkspace idWorkspace={workspace._id}></EditWorkspace> : null}
        </div>
      </Card>
    </>

  )
}