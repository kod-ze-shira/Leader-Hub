import $ from "jquery"
import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import title from '../../../../Data/title.json'
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
        let value = input.target.value ? input.target.value : input.target.innerText
        if (!value)
            value = ''
        let editProjectInRedux = { "nameFiled": input.target.name ? input.target.name : "description", "value": value }
        props.setProjectByFiledFromWorkspace(editProjectInRedux)
        // props.workspaces[props.indexWorkspace].projects[props.indexProject][input.target.name] = input.target.value
    }

    const changeDateInProject = (input) => {
        let res = input.target.value.split("-")[2] + '/' + input.target.value.split("-")[1] + '/' + input.target.value.split("-")[0];
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

    const deletProject = () => {
        $(`#${props.workspaces[props.indexWorkspace].projects[props.indexProject]._id + "disappear"}`).css("display", "none")
        props.showToast({ 'type': 'Project', 'object': props.workspaces[props.indexWorkspace].projects[props.indexProject] })
        props.closeViewDetails();

    }

    function closeViewDetailsInProject() {
        props.setProjectInWorkspace(projectBeforeChanges)
        props.closeViewDetails()
    }

    return (
        <>

            <div className="details mr-4 ml-4">
                <div className='propertiesViewDitails'>
                    <div className='row mt-4 mb-1 justify-content-between headerDitails'>
                        <h5 className=" title-view-details  pl-3">Project details</h5>
                        <div class="close pr-3" onClick={() => closeViewDetailsInProject()}>x</div>
                        {/* <h5 className="mt-5 title-view-details pb-1 mb-2">Project details</h5> */}
                    </div>

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
                        <div class="form-control descriptionProject"
                            name="description"
                            id="descriptionProject" rows="5"
                            placeholder="Write a description about your project"
                            value={props.workspaces[props.indexWorkspace].projects[props.indexProject].description}
                            // onChange={(input) => changeFiledInProject(input)}
                            contentEditable
                            onBlur={(input) => changeFiledInProject(input)}
                        >{props.workspaces[props.indexWorkspace].projects[props.indexProject].description}</div>
                    </div>
                    <div className="row justify-content-between">
                        <div class="form-group col-5 ditailsAction">
                            <label for="color">Project color</label>
                            <input name="color"
                                className=" form-control "
                                onChange={(e) => changeFiledInProject(e)}
                                type="color"
                                id='colorProject'
                                value={props.workspaces[props.indexWorkspace].projects[props.indexProject].color}
                            />
                        </div>
                        <div class="form-group col-5 ditailsAction ">
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
                </div>
                <div className="row justify-content-between ">
                    <button
                        onClick={deletProject}
                        className="delete-btn col-4 "
                        data-tip data-for="delete" >
                        <img src={require('../../../img/bin.png')}></img> Delete
                        <ReactTooltip data-tip id="delete" place="top" effect="solid">
                            {title.title_delete}
                        </ReactTooltip>
                    </button>
                    <button data-tip data-for="save" onClick={() => saveProject()} className="save_canges_btn col-3">Save</button>
                    <ReactTooltip data-tip id="save" place="top" effect="solid">
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
            setProjectInWorkspace: (project) => dispatch(actions.setProjectInWorkspace(project)),

        }
    }
)(EditProject)