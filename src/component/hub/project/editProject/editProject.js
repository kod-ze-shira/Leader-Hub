import $ from "jquery"
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'

// import '../../inputDitails/inputDitails.css'

function EditProject(props) {
    const [projectBeforeChanges] = useState({ ...props.workspaces[props.indexWorkspace].projects[props.indexProject] })
    let project;
    useEffect(() => {
        props.objectBeforeChanges({ 'type': 'project', 'project': projectBeforeChanges })
    }, [props.workspaces])


    let myDate = props.workspaces[props.indexWorkspace].projects[props.indexProject].dueDate;
    let dueDate1 = myDate.split("/")[2] + '-' + myDate.split("/")[1] + '-' + myDate.split("/")[0];
    let [dueDateProject, setDueDateProject] = useState(dueDate1)
    const nameRequired = useRef()


    const changeFiledInProject = (input) => {

        // let editProjectInRedux = { "nameFiled": input.target.name, "value": input.target.value, "project": props.workspaces[props.indexWorkspace].projects[props.indexProject] }
        let editProjectInRedux = { "nameFiled": input.target.name, "value": input.target.value }
        props.setProjectByFiledFromWorkspace(editProjectInRedux)
        // props.workspaces[props.indexWorkspace].projects[props.indexProject][input.target.name] = input.target.value
    }

    const changeDateInProject = (input) => {

        let res = dueDateProject.split("-")[2] + '/' + dueDateProject.split("-")[1] + '/' + dueDateProject.split("-")[0];
        let editProjectInRedux = { "nameFiled": input.target.name, "value": res, "project": props.workspaces[props.indexWorkspace].projects[props.indexProject] }
        setDueDateProject(input.target.value)
        props.setProjectByFiledFromWorkspace(editProjectInRedux)
        // props.workspaces[props.indexWorkspace].projects[props.indexProject][input.target.name] = res
    }

    function saveProject() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        project = props.workspaces[props.indexWorkspace].projects[props.indexProject]
        project.updateDates[project.updateDates.length] = date + '/' + month + '/' + year
        // let res = dueDateProject.split("-")[2] + '/' + dueDateProject.split("-")[1] + '/' + dueDateProject.split("-")[0];
        // project.dueDate = res



        if (nameRequired.current.value) {
            props.editProjectInServer({ "project": project, 'projectBeforeChanges': projectBeforeChanges })
            props.objectBeforeChanges(null)
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
                <h5 className="mt-5 title-view-details pb-1 mb-2">Project details</h5>
                <div class="row justify-content-between  mx-1 mb-2">
                    <label>workspace: {props.workspace.name}</label>
                </div>
                <div class="form-group" id='nameRequired'>
                    <label for="name">Name</label>
                    <input name="name" onChange={(e) => changeFiledInProject(e)}
                        type="text" class="form-control" required ref={nameRequired}
                        value={props.workspaces[props.indexWorkspace].projects[props.indexProject].name} placeholder='Write a name' />
                    <div class="invalid-feedback">
                        Please enter project name.
                     </div>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" name="description" id="descriptionProject" rows="3" placeholder="Write a description about your project"
                        onChange={(e) => changeFiledInProject(e)} value={props.workspaces[props.indexWorkspace].projects[props.indexProject].description}></textarea>
                </div>
                <div className="row justify-content-between">
                    <div class="form-group col-5">
                        <label for="color">Project color</label>
                        <input name="color"
                            className=" form-control "
                            onChange={(e) => changeFiledInProject(e)}
                            type="color"
                            id='colorProject'
                            value={props.workspaces[props.indexWorkspace].projects[props.indexProject].color}
                        />
                    </div>
                    <div class="form-group col-5">
                        <label for="color">Due Date</label>
                        <input
                            className="form-control "
                            name="dueDate"
                            type="date"
                            id='dueDateProject'
                            value={dueDateProject}
                            onChange={(e) => changeDateInProject(e)}
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
            projectReducer: state.project_reducer.project,
            workspace: state.workspace_reducer.workspace,
            indexProject: state.public_reducer.indexCurrentProject,
            indexWorkspace: state.public_reducer.indexOfWorkspace
        }
    },
    (dispatch) => {
        return {
            editProjectInServer: (task) => dispatch(actions.editProjectInServer(task)),
            setProjectByFiledFromWorkspace: (p) => dispatch(actions.setProjectByFiledFromWorkspace(p)),
            setProject: (p) => dispatch(actions.setProject(p)),
            setProjectInWorkspace: (p) => dispatch(actions.setProjectInWorkspace(p))
        }
    }
)(EditProject)