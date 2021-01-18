import React, { useEffect, useState } from 'react'
import './viewWorkspace.css';
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ProjectsByWorkspace from '../../project/projectsByWorkspace/projectsByWorkspace'
import TeamExample from '../../team/teamExample'
import { Button } from 'react-bootstrap';
import EditWorkspace from '../editWorkspace/editWorkspace'
export function ViewWorkspace({ props, workspace }) {
  const [viewProjects, setViewProjects] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [openEditWorkspace, setOpenEditWorkspace] = useState(false)

  const viewProjectsByWorkspace = () => {
    // return  <projectsByWorkspace/>
    setViewProjects(!viewProjects);
  }
  const toOpenEditWorkspace = () => {
    setOpenEditWorkspace(!openEditWorkspace)
  }
  
  return (
    
    <>
      <div className="container" >
        <div className="row">
          <div className="col-6">
          
             
            <div className="workspace" style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
             ‏

               {workspace.name[0]} </div>
            <div>{workspace.name}</div>
            <div>{workspace._id}</div>
            <button onClick={() => setOpenEditWorkspace(!openEditWorkspace)}>edit</button>
            <button onClick={viewProjectsByWorkspace}>view projects of workspace</button>
          </div>
          <div className="col-8">
            <div>
             
            </div>
            <Button onClick={() => setShowShare(!showShare)} variant="primary">
              Share
        </Button>


            {
              showShare ? <TeamExample nameWorkspace={workspace.name}></TeamExample> : null
            }


          </div>
        </div>
        <div>
          {viewProjects ? <ProjectsByWorkspace idWorkspace={workspace._id} /> : null}
        </div>
        <div>
          {openEditWorkspace ? <EditWorkspace idWorkspace={workspace._id}></EditWorkspace> : null}
        </div>
      </div>
    </>

  )
}