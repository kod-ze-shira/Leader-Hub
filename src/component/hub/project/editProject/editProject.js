import $ from "jquery"
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import '../newProject/newProject.css'

function EditProject(props) {
    let [myProect, setMyProject] = useState({})
    let project = props.projectToEdit
    let [nameProject, setNameProject] = useState(project.name)
    let [descriptionProject, setDescriptionProject] = useState(project.description)
    // let [dueDateProject, setDueDateProject] = useState(project.dueDate)
    let [colorProject, setColorProject] = useState(project.color)
    let myDate = project.dueDate;
    //yy dd mm
    //mm dd yy
    let res1 = myDate.split("/")[2] + '-' + myDate.split("/")[1] + '-' + myDate.split("/")[0];
    let [dueDateProject, setDueDateProject] = useState(res1)

    const changeNameProject = (input) => {
        $(`#nameProject`).css({ 'border-bottom': 'rgb(129, 129, 165) solid 1px' })
        setNameProject(input.target.value)
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
        }
    }

    function deleteProject(event) {
        // props.showToast(true)
        props.setProject(props.projectToEdit)
        props.deleteProjectInServer()
        event.stopPropagation();
    }

    const deleteMyProject = () => {
        // props.showToast({ 'type': 'Project', 'object': props.projectToEdit })
        props.showToast(props.projectToEdit)
    }

    return (
        <>
            <div className="row">
                <div className="col-11"></div>
            </div>
            <div className="row mt-1">
                <div className="col-5"><b>Name:</b></div>
                <div className="col-6">
                    <input
                        id='nameProject'
                        className="inputProject"
                        name="name"
                        placeholder='name project'
                        value={nameProject}
                        onChange={(e) => changeNameProject(e)}
                    >
                    </input>
                </div>
            </div>
            <div className="row mt-1">
                <div className=" col-5"><b>Description:</b></div>
                <div className="col-6">
                    <input
                        className="inputProject"
                        name="description"
                        id='descriptionProject'
                        // placeholder='description'
                        // placeholder={project.description}
                        value={descriptionProject}
                        onChange={(e) => changeDescriptionProject(e)}
                    >
                    </input>
                </div>
            </div>
            <div className="row mt-1">
                <div className=" col-5"><b>Due date:</b></div>
                <div className="col-6">
                    <input
                        className="inputProject"
                        name="dueDate"
                        type="date"
                        id='dueDateProject'
                        value={dueDateProject}
                        onChange={(e) => changeDueDateProject(e)}
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
                        value={colorProject}
                        onChange={(e) => changeColorProject(e)}
                    >
                    </input>
                </div>
                {/* {props.workspaceId}*/}
            </div>
            {/* <img onClick={() => props.showToast(true)} src={require('../../../img/bin.png')}></img> */}

            <div className="row mt-1">
                <div classNae="col-3"></div>
                <div className="col-3">
                    <button onClick={() => saveProject()}>save</button></div>
            </div>
            <button onClick={deleteMyProject}>delete </button>

            {/* <img onClick={(event) => deleteProject(event)} src={require('../../../img/bin.png')}></img> */}



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
            editProjectInServer: (task) => dispatch(actions.editProjectInServer(task)),
            setProject: (p) => dispatch(actions.setProject(p)),
            deleteProjectInServer: () => dispatch(actions.deleteProjectInServer()),


        }
    }
)(EditProject)