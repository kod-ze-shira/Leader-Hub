import React from 'react'
import './body.css'
import AllWorkspaces from '../workspace/allWorkspaces/allWorkspaces';

export default function Body(props) {
  debugger
  return (
    <div className="body-workspace mt-4 ">
      <AllWorkspaces bin={props.disableBin} showToast={(obj) => props.showToastDelete(obj)} />

    </div>
  );
}

