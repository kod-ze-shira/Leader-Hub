import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'


export function ViewWorkspace({props,workspace}) {
    return (
        <li>
          <div >{workspace.name}</div>
        </li>
      )
}