import $ from "jquery"
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'

// import '../../inputDitails/inputDitails.css'

function EditProject(props) {

    useEffect(() => {

    }, [props.workspaces])

    let project = props.project

    // let myDate = project.dueDate;
    // let dueDate1 = myDate.split("/")[2] + '-' + myDate.split("/")[1] + '-' + myDate.split("/")[0];
    // let [dueDateProject, setDueDateProject] = useState(dueDate1)
    const nameRequired = useRef()

    const [projectBeforeChanges, setProjectBeforeChanges] = useState(project)
    const changeFiledInProject = (input) => {
        let editProjectInRedux = { "nameFiled": input.target.name, "value": input.target.value, "project": props.project }
        props.setProjectByFiledFromWorkspace(editProjectInRedux)
        props.project[input.target.name] = input.target.value
    }

    function saveProject() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let projectBeforeChanges = project;
        project = props.project
        project.updateDates[project.updateDates.length] = date + '/' + month + '/' + year
        // let res = dueDateProject.split("-")[2] + '/' + dueDateProject.split("-")[1] + '/' + dueDateProject.split("-")[0];
        // project.dueDate = res



        if (nameRequired.current.value) {

            props.editProjectInServer({ "project": project, 'projectBeforeChanges': projectBeforeChanges })
            props.closeViewDetails(false)
        }
        else {
            nameRequired.current.focus()
            var form = document.getElementById('nameRequired')
            form.classList.add('was-validated')
        }
    }

    return (
        <>

            <div className="details mr-5 ml-4">
                <h5 className="my-5 title-view-details pb-2">Project details</h5>
                <div class="form-group" id='nameRequired'>
                    <label for="name">Name</label>
                    <input name="name" onChange={(e) => changeFiledInProject(e)}
                        type="text" class="form-control" required ref={nameRequired}
                        value={props.project.name} placeholder='Write a name' />
                    <div class="invalid-feedback">
                        Please enter project name.
                     </div>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" name="description" id="descriptionProject" rows="2" placeholder="Write a description about your project"
                        onChange={(e) => changeFiledInProject(e)} value={props.project.description}></textarea>
                </div>
                <div className="row justify-content-between">
                    <div class="form-group col-5">
                        <label for="color">Project color</label>
                        <input name="color"
                            className=" form-control "
                            onChange={(e) => changeFiledInProject(e)}
                            type="color"
                            id='colorProject'
                            value={props.project.color}
                        />
                    </div>
                    <div class="form-group col-5">
                        <label for="color">Due Date</label>
                        <input
                            className="form-control "
                            name="dueDate"
                            type="date"
                            id='dueDateProject'
                            value={props.project.dueDate}
                            onChange={(e) => changeFiledInProject(e)}
                        />
                    </div>
                </div>
                <div className="row justify-content-between  mx-1 btns-in-view-details-project">
                    <button data-toggle="tooltip" data-placement="top" title="Garbage" className="delete-btn col-4 " >
                        <img src={require('../../../img/bin.png')}></img> Delete
                </button>
                    <button button onClick={() => saveProject()} className="save_canges_btn col-3">Save</button>
                </div>
            </div>

        </>
    )
}
export default connect(
    (state) => {
        return {
            workspaces: state.public_reducer.workspaces,
            projectReducer: state.project_reducer.project

        }
    },
    (dispatch) => {
        return {
            editProjectInServer: (task) => dispatch(actions.editProjectInServer(task)),
            setProjectByFiledFromWorkspace: (p) => dispatch(actions.setProjectByFiledFromWorkspace(p)),
            setProject: (p) => dispatch(actions.setProject(p))

        }
    }
)(EditProject)