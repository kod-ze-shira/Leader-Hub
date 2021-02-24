import React, { useEffect, useState } from 'react'
import './editProject.css'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import Toast from 'react-bootstrap/Toast'
import viewDetails from '../../viewDetails/viewDetails';
import $ from "jquery";

function EditProject(props) {

    let project = props.project;

    const detailProject = (input) => {
        $(`#nameProject`).css({ 'border-bottom': 'rgb(129, 129, 165) solid 1px' })
        project[input.target.name] = input.target.value;
    }
    function saveProject() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        project.updateDates[project.updateDates.length] = date + '-' + month + '-' + year;
        // project.workspace = props.workspaceId;

        if (!project.name)
            $(`#nameProject`).css({ 'border-bottom': 'red solid 1px' })
        else
            props.setProjectCrud(project)
        // props.saveWorkspaceInServerUfterEdit()
        // props.getAllWorkspaces()
    }
    return (



        <>
            <div className="row">
                <div className="col-11"></div>
                {/* <div className="col-1" className="close_edit"  onClick={props.setcloseEditWorkspace()}>x</div> */}
            </div>


            <div className="row mt-1">
                <div className="nameworkspace col-5"><b>Name:</b></div>
                <div className="col-6">
                    <input
                        id='nameProject'
                        className="edit_workspace_name"
                        name="name"
                        placeholder='name project'
                        value={project.name}
                        onChange={(e) => detailProject(e)}
                    >
                    </input>
                </div>
                {/* {props.workspaceId}*/}
            </div>
            <div className="row mt-1">
                <div className="nameworkspace col-5"><b>Description:</b></div>
                <div className="col-6">
                    <input
                        className="edit_workspace_name"
                        name="description"
                        placeholder='description'
                        value={project.name}

                        onChange={(e) => detailProject(e)}
                    >
                    </input>
                </div>
                {/* {props.workspaceId}*/}
            </div>
            <div className="row mt-1">
                <div className="nameworkspace col-5"><b>Due date:</b></div>
                <div className="col-6">
                    <input
                        className="edit_workspace_name"
                        name="dueDate"
                        type="date"
                        value={project.dueDate}
                        onChange={(e) => detailProject(e)}
                    >
                    </input>
                </div>
                {/* {props.workspaceId}*/}
            </div>

            <div className="row mt-1">
                <div className="nameworkspace col-5"><b>Color:</b></div>
                <div className="col-6">
                    <input
                        className="edit_workspace_name"
                        name="color"
                        type="color"
                        value={project.color}
                        onChange={(e) => detailProject(e)}
                    >
                    </input>
                </div>
                {/* {props.workspaceId}*/}
            </div>

            <div className="row mt-1">
                <div classNae="col-3"></div>
                <div className="col-3">
                    <button onClick={() => saveProject()}>save</button></div>
            </div>


        </>





    )
}
export default connect(
    (state) => {
        return {
            // workspaceToEdit: state.workspace_reducer.workspace,
            // workspaces: state.workspace_reducer.workspaces,


        }
    },
    (dispatch) => {
        return {
            setProjectCrud: (props) => dispatch(actions.setProjectCrud(props)),

            // getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
            // setWorkspaceOnChangeFiled: (nameFiled, value) => dispatch(actions.setWorkspaceOnChangeFiled(nameFiled, value)),
            // saveWorkspaceInServerUfterEdit: () => dispatch(actions.editWorkspaceInServer()),
            // setcloseEditWorkspace: () => dispatch(actions.setcloseEditWorkspace()),


        }
    }
)(EditProject)