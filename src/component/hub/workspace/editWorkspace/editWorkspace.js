import React, { useEffect, useState } from 'react'
import './editWorkspace.css'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import Toast from 'react-bootstrap/Toast'
function EditWorkspace(props) {
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
    const changeFiledInWorkspace = (input) => {
        props.setWorkspaceOnChangeFiled(input.target.name, input.target.value)
    }
    function save_edit() {
        myWorkspace.name = nameWorkspace
        myWorkspace.description = descriptionWorkspace
        myWorkspace.color = colorWorkspace

        props.saveWorkspaceInServerUfterEdit()
        props.closeViewDetails();
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
                        placeholder='Name Workspace'
                        value={nameWorkspace}
                        onChange={(input) => changeNameWorkspace(input)}
                    >
                    </input>
                </div>
                <div className="row mt-5">
                    <div className="nameworkspace col-5"><b>Description Workspace:</b></div>
                    <div className="col-6">
                        <input
                            className="edit_workspace_name"
                            name="name"
                            placeholder='Description Workspace'
                            value={descriptionWorkspace}
                            onChange={(input) => changeDescriptionWorkspace(input)}
                        >
                        </input>
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <div className=" col-5"><b>Color:</b></div>
                <div className="col-6">
                    <input
                        className="inputProject"
                        name="color"
                        type="color"
                        id='colorProject'
                        value={colorWorkspace}
                        onChange={(e) => changeColorWorkspace(e)}
                    >
                    </input>
                </div>
                {/* {props.workspaceId}*/}
            </div>



            <div className="row mt-5">
                <div className="col-3"></div>
                <div className="col-3">  <button onClick={save_edit} >save</button></div>

            </div>
        </>
    )
}
export default connect(
    (state) => {
        return {
            workspace: state.workspace_reducer.workspace,
            workspaceToEdit: state.workspace_reducer.workspace,

        }
    },

    (dispatch) => {
        return {
            setWorkspaceOnChangeFiled: (nameFiled, value) => dispatch(actions.setWorkspaceOnChangeFiled(nameFiled, value)),
            saveWorkspaceInServerUfterEdit: () => dispatch(actions.editWorkspaceInServer()),
        }
    }
)(EditWorkspace)