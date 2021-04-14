import React, { useEffect, useState } from 'react'
import './editWorkspace.css'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import Toast from 'react-bootstrap/Toast'
function EditWorkspace(props) {
    useEffect(() => {

    }, [props.workspaces])

    let [nameWorkspace, setNameWorkspace] = useState(props.workspace.workspace.name)
    let [colorWorkspace, setColorWorkspace] = useState(props.workspace.workspace.color)
    let [descriptionWorkspace, setDescriptionWorkspace] = useState(props.workspace.workspace.description)
    let myWorkspace = props.workspaceToEdit.workspace;

    const changeNameWorkspace = (input) => {
        setNameWorkspace(input.target.value)
    }
    const changeDescriptionWorkspace = (input) => {
        setDescriptionWorkspace(input.target.value)
    }
    const changeColorWorkspace = (input) => {
        setColorWorkspace(input.target.value)
    }
    // const changeFiledInWorkspace = (input) => {
    //     props.setWorkspaceOnChangeFiled(input.target.name, input.target.value)
    // }
    function saveEdit() {
        // myWorkspace.name = nameWorkspace
        // myWorkspace.description = descriptionWorkspace
        // myWorkspace.color = colorWorkspace
        props.saveWorkspaceInServerUfterEdit(props.workspace.workspace)
        props.closeViewDetails();
    }

    const changeFiledInWorkspace = (input) => {
        let editWorkspaceInRedux = { "nameFiled": input.target.name, "value": input.target.value, "workspace": props.workspace }
        props.setWorkspaceByFiled(editWorkspaceInRedux)
        props.workspace.workspace[input.target.name] = input.target.value
    }

    return (
        <>
            <div className="details d-workspace mr-5 ml-4">
                <h5 className="my-5 title-view-details pb-2">Workspace details</h5>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input name="name"
                        onChange={(input) => changeFiledInWorkspace(input)}
                        type="text" class="form-control" id="name"
                        value={props.workspace.workspace.name} />
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control"
                        id="description" rows="5"
                        placeholder="Write a description about your project"
                        value={props.workspace.workspace.description}
                        onChange={(input) => changeFiledInWorkspace(input)}></textarea>
                </div>
                <div class="form-group">
                    <label for="color">Workspace Color</label>
                    <input name="color"
                        className="ml-2 w-25 "
                        styles="height: 50px"
                        type="color"
                        id='colorProject'
                        value={props.workspace.workspace.color}
                        onChange={(e) => changeFiledInWorkspace(e)} />
                </div>
                <div className="row justify-content-between mt-5  mx-1 btns-in-view-details-workspace ">
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
            workspaceToEdit: state.workspace_reducer.workspace,

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