import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'

function EditWorkspace(props) {

    const changeFiledInWorkspace = (input) => {
        props.setWorkspaceOnChangeFiled(input.target.name, input.target.value)
    }
    return (
        <>
            <input
                className="edit_workspace_name"
                name="name"
                placeholder={props.workspaceToEdit.name}
                onChange={(input) => changeFiledInWorkspace(input)}
            >
            </input>
            {/* <button onClick={props.saveWorkspaceInServerUfterEdit}>save</button> */}
            <button onClick={props.saveWorkspaceInServerUfterEdit}>save</button>
        </>
    )
}
export default connect(
    (state) => {
        return {
            workspaceToEdit: state.workspace_reducer.workspace
        }
    },
    (dispatch) => {
        return {
            // getWorkspaceByIdFromServer: (workspaceId) => dispatch(actions.getWorkspaceByIdFromServer(workspaceId)),
            setWorkspaceOnChangeFiled: (nameFiled, value) => dispatch(actions.setWorkspaceOnChangeFiled(nameFiled, value)),
            saveWorkspaceInServerUfterEdit: () => dispatch(actions.editWorkspaceInServer()),

        }
    }
)(EditWorkspace)