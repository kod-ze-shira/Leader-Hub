import React, { useEffect, useRef, useState } from 'react'

import './allWorkspace.css'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewWorkspaceList from '../viewWorkspace/viewWorkspacelist/viewWorkspacelist'
import ViewWorkspaceGrid from '../viewWorkspace/viewWorkspaceGrid/viewWorkspaceGrid'
import ViewDetails from '../../viewDetails/viewDetails'
import ToastDelete from '../../toastDelete/toastDelete1'


function ViewAllStatuses(props) {

    useEffect(() => {
        // props.getAllWorkspaces()
    }, []);

   
    

    // const renderedListStatuses = props.status.map(todo => {

    //     return <ViewWorkspaceList
    //     setShowToastDeleteWhenClickDelete={(obj)=>props.showToast(obj)} 
    //      key={todo.workspace._id} workspace={todo} editWorkspace={openEditWorkspace}/>
    // })
    
return (

        <>

        </>

    )

                    }
const mapStateToProps = (state) => {

    return {
        status:state.status_reducer.status
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }


}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllStatuses)
