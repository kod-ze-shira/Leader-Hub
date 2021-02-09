import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'

function EditWorkspace(props) {
    const [ifHasWorkspace, setIfHasWorkspace] = useState(false);
    useEffect(() => {
        if (!ifHasWorkspace) {
            props.getWorkspaceByIdFromServer(props.idWorkspace)
            setIfHasWorkspace(true)
        }
    })
    const changeFiledInWorkspace = (input) => {
        props.setWorkspaceOnChangeFiled(input.target.name, input.target.value)
    }
    return (
        <>
            <input name="name" placeholder={props.workspace.name} onChange={(input) => changeFiledInWorkspace(input)}></input>
            <button onClick={props.saveWorkspaceInServerUfterEdit}>save</button>
        </>
    )
}
export default connect(
    (state) => {
        return {
            workspace: state.workspace_reducer.workspace
        }
    },
    (dispatch) => {
        return {
            getWorkspaceByIdFromServer: (workspaceId) => dispatch(actions.getWorkspaceByIdFromServer(workspaceId)),
            setWorkspaceOnChangeFiled: (nameFiled, value) => dispatch(actions.setWorkspaceOnChangeFiled(nameFiled, value)),
            saveWorkspaceInServerUfterEdit: (workspace) => dispatch(actions.editWorkspaceInServer(workspace))
        }
    }
)(EditWorkspace)