import $ from "jquery"
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
// import '../../inputDitails/inputDitails.css'

function EditProject(props) {
    let [myProect, setMyProject] = useState({})
    let project = props.project
    let [nameProject, setNameProject] = useState(project.name)
    let [descriptionProject, setDescriptionProject] = useState(project.description)
    let [colorProject, setColorProject] = useState(project.color)

    let myDate = project.dueDate;
    let dueDate1 = myDate.split("/")[2] + '-' + myDate.split("/")[1] + '-' + myDate.split("/")[0];
    let [dueDateProject, setDueDateProject] = useState(dueDate1)

    const changeNameProject = (input) => {
        $(`#nameProject`).css({ 'border-bottom': 'rgb(129, 129, 165) solid 1px' })
        setNameProject(input.target.value)
        let p = props.project
        p.name = input.target.value
        props.setProject(p)
    }

const changeProjectField=(input)=>{
    

}

    const changeDescriptionProject = (input) => {
        setDescriptionProject(input.target.value)
    }
    const changeDueDateProject = (input) => {
        setDueDateProject(input.target.value)
    }
    const changeColorProject = (input) => {
        setColorProject(input.target.value)
    }
    const changeFiledInWorkspace = (input) => {
        $(`#nameProject`).css({ 'border-bottom': 'rgb(129, 129, 165) solid 1px' })
        if (input.target.name == 'dueDate') {
            let myDate = input.target.value
            let res = myDate.split("-")[2] + '/' + myDate.split("-")[1] + '/' + myDate.split("-")[0];
            project[input.target.name] = res
        }
        else
            setNameProject(input.target.value)
        // setMyProject({ ...myProject, myProject[input.target.name]: input.target.value })
        // project[input.target.name] = input.target.value
    }



    function saveProject() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        console.log(date + '/' + month + '/' + year)
        project.updateDates[project.updateDates.length] = date + '/' + month + '/' + year
        // project.workspace = props.workspaceId
        project.name = nameProject
        project.description = descriptionProject
        let res = dueDateProject.split("-")[2] + '/' + dueDateProject.split("-")[1] + '/' + dueDateProject.split("-")[0];
        project.dueDate = res
        project.color = colorProject
        if (!project.name)
            $(`#nameProject`).css({ 'border-bottom': 'red solid 1px' })
        else {
            props.editProjectInServer({ "project": project })
            document.getElementById('nameProject').value = ''
            document.getElementById('descriptionProject').value = ''
            document.getElementById('dueDateProject').value = ''
            props.closeViewDetails(false)

        }
    }

    const deleteMyProject = () => {
        props.closeViewDetails(false)
        props.showToast(true)
    }

    return (
        <>

            <div className="details mr-5 ml-4">
                <h5 className="my-5 title-view-details pb-2">Project details</h5>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input name="name" onChange={(e) => changeNameProject(e)}
                        id='nameProject' type="text" class="form-control"
                        value={nameProject} placeholder='Write a name' />
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" name="description" id="descriptionProject" rows="2" placeholder="Write a description about your project"
                        onChange={(e) => changeDescriptionProject(e)} value={descriptionProject}></textarea>
                </div>
                <div className="row justify-content-between">
                    <div class="form-group col-5">
                        <label for="color">Project color</label>
                        <input name="color"
                            className=" form-control "
                            onChange={(e) => changeColorProject(e)}
                            type="color"
                            id='colorProject'
                            value={colorProject}
                        />
                    </div>
                    <div class="form-group col-5">
                        <label for="color">Due Date</label>
                        <input
                            className="form-control "
                            name="dueDate"
                            type="date"
                            value={dueDateProject}
                            id='dueDateProject'
                            value={dueDateProject}
                            onChange={(e) => changeDueDateProject(e)}
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
            // project: state.project_reducer.project,
        }
    },
    (dispatch) => {
        return {
            editProjectInServer: (task) => dispatch(actions.editProjectInServer(task)),
            setProjectInWorkspace: (p) => dispatch(actions.setProjectInWorkspace(p)),


        }
    }
)(EditProject)