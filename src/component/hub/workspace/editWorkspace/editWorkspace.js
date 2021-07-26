import React, { useEffect, useState, useRef } from 'react'
import './editWorkspace.css'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import $ from 'jquery'
import ReactTooltip from 'react-tooltip';
import title from '../../../../Data/title.json'
import ColorWorkspace from '../../color/colorWorkspace';


function EditWorkspace(props) {

    const [workspaceBeforeChanges] = useState({ ...props.workspace })

    const nameRequired = useRef()
    useEffect(() => {
        props.objectBeforeChanges({ 'type': 'workspace', 'workspace': workspaceBeforeChanges })
    }, [props.workspaces])


    function closeViewDetailsInWorkspace() {
        props.setWorkspaceBeforeChanges(workspaceBeforeChanges)
        props.closeViewDetails()
    }
    function saveEdit() {

        if (nameRequired.current.value) {
            props.saveWorkspaceInServerUfterEdit({ 'workspace': props.workspace, 'workspaceBeforeChanges': workspaceBeforeChanges })
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
    }

    const changeColorFiledInWorkspace = (color) => {
        let editWorkspaceInRedux = { "nameFiled": "color", "value": color }
        props.setWorkspaceByFiled(editWorkspaceInRedux)
    }

    const deleteWorkspace = (e) => {
        $(`#${props.workspaces[props.indexOfWorkspace]._id}`).css("display", "none")
        props.showToast({ 'type': 'Workspace', 'object': props.workspaces[props.indexOfWorkspace] })
        props.closeViewDetails();

    }
    return (
        <>
            <div className="details d-workspace mr-5 ml-4">
                <div className='propertiesViewDitails'>
                    <div className='row mt-4 mb-1 justify-content-between headerDitails'>
                        <h5 className=" title-view-details pl-3">Workspace details</h5>

                        <div className="close pr-3" onClick={() => closeViewDetailsInWorkspace()}>x</div>

                        {/* <h5 className="my-5 title-view-details pb-2 col-10">Workspace details</h5> */}
                    </div>
                    <div className="form-group" id='nameRequired'>
                        <label htmlFor="name">Name</label>
                        <input name="name" ref={nameRequired} required
                            onChange={(input) => changeFiledInWorkspace(input)}
                            type="text" className="" className="form-control input-name" id="name"
                            // value={props.workspace.name} 

                            value={props.workspaces[props.indexOfWorkspace].name}
                        />


                        <div className="invalid-feedback">
                            Please enter workspace name.
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="description">Description</label>
                        <div className="form-control descriptionWorkspace"
                            id="description" rows="5"
                            placeholder="Write a description about your workspace"
                            name="description"
                            value={props.workspaces[props.indexOfWorkspace].description}
                            onChange={(input) => changeFiledInWorkspace(input)} contenteditable
                        ></div>
                    </div>
                    <label className="row ml-2" htmlFor="color">Logo Color</label>
                    <ColorWorkspace setColorWorkspace={(color) => changeColorFiledInWorkspace(color)} />

                </div>
                <div className="row justify-content-between">
                    <button data-toggle="tooltip" data-placement="top"
                        className="delete-btn col-4 "
                        onClick={(e) => deleteWorkspace(e)}>
                        <img src={require('../../../../assets/img/bin.svg')}></img> Delete
                    </button>
                    <button data-tip data-for="save" onClick={saveEdit} className="save_canges_btn col-3">Save</button>
                    <ReactTooltip className="tooltip-style" data-tip id="save" place="top" effect="solid">
                        {title.title_save}
                    </ReactTooltip>
                </div>
            </div>
        </>
    )
}
export default connect(
    (state) => {
        return {
            workspaces: state.public_reducer.workspaces,
            indexOfWorkspace: state.public_reducer.indexOfWorkspace
        }
    },

    (dispatch) => {
        return {
            setWorkspaceByFiled: (workspace) => dispatch(actions.setWorkspaceByFiled(workspace)),
            setWorkspaceOnChangeFiled: (nameFiled, value) => dispatch(actions.setWorkspaceOnChangeFiled(nameFiled, value)),
            saveWorkspaceInServerUfterEdit: (workspace) => dispatch(actions.editWorkspaceInServer(workspace)),
            setWorkspaceBeforeChanges: (workspace) => dispatch(actions.setWorkspaceBeforeChanges(workspace)),

        }
    }
)(EditWorkspace)