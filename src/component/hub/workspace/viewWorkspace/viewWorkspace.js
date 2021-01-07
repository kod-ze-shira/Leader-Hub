import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'


export function ViewWorkspace({ props, workspace }) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <div>{workspace.name}</div>
          </div>
          <div className="col">
            <div><button>share</button></div>
          </div>
        </div>

      </div>
    </>

  )
}