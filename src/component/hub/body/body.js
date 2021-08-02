import React from 'react'
import './body.css'
import AllWorkspaces from '../workspace/allWorkspaces/allWorkspaces';

export default function Body(props) {
  return (
    <div className={props.openConfigurator?"body-workspace":"body-workspace-without-configurator"}>
      <AllWorkspaces
        showToast={(obj) => props.showToastDelete(obj)}
      />

    </div>
  );
}

