import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ProjectsByWorkspace from '../../project/projectsByWorkspace/projectsByWorkspace'

export function ViewWorkspace({ props, workspace }) {
  const [viewProjects, setViewProjects] = useState(false)


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
            <div><button>share</button></div>
          </div>
        </div>
        <div>
         {viewProjects?<ProjectsByWorkspace idWorkspace={workspace._id}/>:null}
        </div>
      </div>
    </>

  )
}