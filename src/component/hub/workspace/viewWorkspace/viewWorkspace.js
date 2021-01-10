import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action';
import Share from '../../team/share'


export function ViewWorkspace({ props, workspace }) {
  // const [showShare, setShowShare] = useState(false)

  // setShowShare({ showShare: !this.state.showShare });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <div>{workspace.name}</div>
          </div>
          <div className="col">
            <div>
              {/* <button onClick={setShowShare(!showShare)}>share</button></div> */}
              {/* {
              showShare && <Share nameWorkspace={workspace.name}></Share>
            } */}
              {/* <Share nameWorkspace={workspace.name}></Share> */}
              <div><button>share</button></div>
            </div>
          </div>

        </div>
      </div>
    </>

  )
}