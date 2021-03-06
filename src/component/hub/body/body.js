import React from 'react'
import './body.css'
import AllWorkspaces from '../workspace/allWorkspaces/allWorkspaces';

export default function Body(props) {
  return (
    <div className="body-workspace">
      <AllWorkspaces
        showToast={(obj) => props.showToastDelete(obj)}
      />

    </div>
  );
}

