import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ProjectsByWorkspace from '../../project/projectsByWorkspace/projectsByWorkspace'
import Share from '../../team/share'

export function ViewWorkspace({ props, workspace }) {
  const [viewProjects, setViewProjects] = useState(false)
  const [showShare, setShowShare] = useState(false)


  const viewProjectsByWorkspace = () => {
    // return  <projectsByWorkspace/>
    setViewProjects(!viewProjects);
  }
  return (
    <>
      <div className="container" onClick={viewProjectsByWorkspace}>
        <div className="row">
          <div className="col-2">
            <div>{workspace.name}</div>
            <div>{workspace._id}</div>
          </div>
          <div className="col">
            <div>
              {/* <button onClick={setShowShare(!showShare)}>share</button></div>
            {
              showShare ? <Share nameWorkspace={workspace.name}></Share> : null
            }
            <Share nameWorkspace={workspace.name}></Share> */}
              <div><button>share</button></div>
            </div>

          </div>
        </div>
        <div>
          {viewProjects ? <ProjectsByWorkspace idWorkspace={workspace._id} /> : null}
        </div>
      </div>
    </>

  )
}