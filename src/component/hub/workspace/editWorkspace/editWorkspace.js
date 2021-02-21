import React, { useEffect, useState } from 'react'
import './editWorkspace.css'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import Toast from 'react-bootstrap/Toast'
function EditWorkspace(props) {

    const changeFiledInWorkspace = (input) => {
        props.setWorkspaceOnChangeFiled(input.target.name, input.target.value)
    }
    const [close, setclose] = useState(true)
    function func_close_edit_workspace() {
        setclose(false);
    }
    function edit_seve() {
        props.saveWorkspaceInServerUfterEdit()
        props.setclose()
        props.getAllWorkspaces()
    }
    return (
        <>
            <div className="row">
                <div className="col-11"></div>
                {/* <div className="col-1" className="close_edit"  onClick={props.setcloseEditWorkspace()}>x</div> */}
            </div>


            <div className="row mt-5">
                <div className="nameworkspace col-5"><b>Name Workspace:</b></div>
                <div className="col-6">
                    <input
                        className="edit_workspace_name"
                        name="name"
                        placeholder={props.workspaceToEdit.name}
                        onChange={(input) => changeFiledInWorkspace(input)}
                    >
                    </input>
                </div>

            </div>
            <div className="row mt-5">
                <div className="nameworkspace col-5"><b>Color Workspace:</b></div>
                <div className="col-6">
                    <input
                        type="color"
                        className="edit_workspace_color"
                        name="color"
                        value={props.workspaceToEdit.color}
                        onChange={(input) => changeFiledInWorkspace(input)}
                    >
                    </input>
                </div>

            </div>
            <div className="row mt-5">
                <div classNae="col-3"></div>
                <div className="col-3">  <button onClick={edit_seve} >save</button></div>


            </div>


        </>





    )
}
export default connect(
    (state) => {
        return {
            workspaceToEdit: state.workspace_reducer.workspace,
            workspaces: state.workspace_reducer.workspaces,

            close: state.public_reducer.close,
        }
    },
    (dispatch) => {
        return {
            getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
            setWorkspaceOnChangeFiled: (nameFiled, value) => dispatch(actions.setWorkspaceOnChangeFiled(nameFiled, value)),
            saveWorkspaceInServerUfterEdit: () => dispatch(actions.editWorkspaceInServer()),
            setcloseEditWorkspace: () => dispatch(actions.setcloseEditWorkspace()),
            setclose: () => dispatch(actions.setclose()),

        }
    }
)(EditWorkspace)