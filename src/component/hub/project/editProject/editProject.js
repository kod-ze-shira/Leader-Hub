import $ from "jquery"
import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import '../newProject/newProject.css'

function EditProject(props) {
    let project = props.projectToEdit
    const changeFiledInWorkspace = (input) => {
        $(`#nameProject`).css({ 'border-bottom': 'rgb(129, 129, 165) solid 1px' })
        project[input.target.name] = input.target.value
    }

    function saveProject() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        console.log(date + '/' + month + '/' + year)
        project.updateDates[0] = date + '/' + month + '/' + year
        project.workspace = props.workspaceId
        if (!project.name)
            $(`#nameProject`).css({ 'border-bottom': 'red solid 1px' })
        else {
            // props.saveProject(project)
            alert('save project')

        }
    }

    return (


        <>
            <div className="row">
                <div className="col-11"></div>
                {/* <div className="col-1" className="close_edit"  onClick={props.setcloseEditWorkspace()}>x</div> */}
            </div>
            <div className="row mt-1">
                <div className="col-5"><b>Name:</b></div>
                <div className="col-6">
                    <input
                        id='nameProject'
                        className="inputProject"
                        name="name"
                        placeholder='name project'
                        value={project.name}
                        onChange={(e) => changeFiledInWorkspace(e)}
                    >
                    </input>
                </div>
                {/* {props.workspaceId}*/}
            </div>
            <div className="row mt-1">
                <div className=" col-5"><b>Description:</b></div>
                <div className="col-6">
                    <input
                        className="inputProject"
                        name="description"
                        id='descriptionProject'
                        placeholder='description'
                        value={project.name}

                        onChange={(e) => changeFiledInWorkspace(e)}
                    >
                    </input>
                </div>
                {/* {props.workspaceId}*/}
            </div>
            <div className="row mt-1">
                <div className=" col-5"><b>Due date:</b></div>
                <div className="col-6">
                    <input
                        className="inputProject"
                        name="dueDate"
                        type="date"
                        id='dueDateProject'
                        value={project.dueDate}
                        onChange={(e) => changeFiledInWorkspace(e)}
                    >
                    </input>
                </div>
                {/* {props.workspaceId}*/}
            </div>

            <div className="row mt-1">
                <div className=" col-5"><b>Color:</b></div>
                <div className="col-6">
                    <input
                        className="inputProject"
                        name="color"
                        type="color"
                        id='colorProject'
                        value={project.color}
                        onChange={(e) => changeFiledInWorkspace(e)}
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
            projectToEdit: state.project_reducer.project,
        }
    },
    (dispatch) => {
        return {
            newProject: (props) => dispatch(actions.newProject(props)),
        }
    }
)(EditProject)