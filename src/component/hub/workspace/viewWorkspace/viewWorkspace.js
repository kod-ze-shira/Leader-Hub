import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ProjectsByWorkspace from '../../project/projectsByWorkspace/projectsByWorkspace'
import TeamExample from '../../team/teamExample'
import { Button, Modal, Form } from 'react-bootstrap';

export function ViewWorkspace({ props, workspace }) {
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
          <div className="col-2">
            <div>{workspace.name}</div>
            <div>{workspace._id}</div>
          </div>
          <div className="col">
            <div>
              <Button onClick={() => setShowShare(!showShare)} variant="primary">
                Share
        </Button>
              {/* <button onClick={() => setShowShare(!showShare)}>share</button> */}
            </div>
            {
              showShare ? <TeamExample nameWorkspace={workspace.name}></TeamExample> : null
            }


          </div>
        </div>
        <div>
          {viewProjects ? <ProjectsByWorkspace idWorkspace={workspace._id} /> : null}
        </div>
      </div>
    </>

  )
}