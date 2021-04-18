import React, { useEffect, useState, useRef } from 'react'
import './editWorkspace.css'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import Toast from 'react-bootstrap/Toast'
function EditWorkspace(props) {


    const [workspaceBeforeChanges] = useState({ ...props.workspace.workspace })

    const nameRequired = useRef()
    useEffect(() => {
        props.objectBeforeChanges({ 'type': 'workspace', 'workspace': workspaceBeforeChanges })
    }, [props.workspaces])



    function saveEdit() {

        if (nameRequired.current.value) {
            props.saveWorkspaceInServerUfterEdit({ 'workspace': props.workspace.workspace, 'workspaceBeforeChanges': workspaceBeforeChanges })
            props.objectBeforeChanges(null)
            props.closeViewDetails();
        }
        else {
            nameRequired.current.focus()
            var form = document.getElementById('nameRequired')
            form.classList.add('was-validated')
        }
    }

    const changeFiledInWorkspace = (input) => {
        let editWorkspaceInRedux = { "nameFiled": input.target.name, "value": input.target.value }
        props.setWorkspaceByFiled(editWorkspaceInRedux)
        // props.workspace.workspace[input.target.name] = input.target.value
    }

    return (
        <>
            <div className="details d-workspace mr-5 ml-4">
                <h5 className="my-5 title-view-details pb-2">Workspace details</h5>
                <div class="form-group" id='nameRequired'>
                    <label for="name">Name</label>
                    <input name="name" ref={nameRequired} required
                        onChange={(input) => changeFiledInWorkspace(input)}
                        type="text" class="form-control" id="name"
                        // value={props.workspace.workspace.name} 
                        value={props.workspaces[props.indexOfWorkspace].workspace.name}
                    />


                    <div class="invalid-feedback">
                        Please enter workspace name.
                     </div>
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control"
                        id="description" rows="2"
                        placeholder="Write a description about your workspace"
                        // value={props.workspace.workspace.description}
                        name="description"
                        value={props.workspaces[props.indexOfWorkspace].workspace.description}
                        onChange={(input) => changeFiledInWorkspace(input)}></textarea>
                </div>
                <div class="form-group">
                    <label for="color">Color</label>
                    <input name="color"
                        className="ml-2 w-25 "
                        styles="height: 50px"
                        type="color"
                        id='colorProject'
                        value={props.workspaces[props.indexOfWorkspace].workspace.color}
                        // value={props.workspace.workspace.color}
                        onChange={(e) => changeFiledInWorkspace(e)} />
                </div>
                <div className="row justify-content-between  mx-1 btns-in-view-details-workspace ">
                    <button data-toggle="tooltip" data-placement="top" title="Garbage" className="delete-btn col-4 " >
                        <img src={require('../../../img/bin.png')}></img> Delete
                </button>
                    <button onClick={saveEdit} className="save_canges_btn col-3">Save</button>
                </div>
            </div>
        </>
    )
}
export default connect(
    (state) => {
        return {
            // workspace: state.workspace_reducer.workspace,
            workspaces: state.public_reducer.workspaces,
            // workspaceToEdit: state.workspace_reducer.workspace,
            indexOfWorkspace: state.public_reducer.indexOfWorkspace
        }
    },

    (dispatch) => {
        return {
            setWorkspaceByFiled: (workspace) => dispatch(actions.setWorkspaceByFiled(workspace)),
            setWorkspaceOnChangeFiled: (nameFiled, value) => dispatch(actions.setWorkspaceOnChangeFiled(nameFiled, value)),
            saveWorkspaceInServerUfterEdit: (workspace) => dispatch(actions.editWorkspaceInServer(workspace)),
        }
    }
)(EditWorkspace)