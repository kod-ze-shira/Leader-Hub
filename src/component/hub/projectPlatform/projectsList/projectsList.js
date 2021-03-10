import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import { Button, Card, Form } from 'react-bootstrap';
import viewProject from '../../project/viewProject/viewProject';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import CardsByProject from '../../Cards/cardsByProject/cardsByProject';
import './projectsList.css'
import { FileFill } from 'react-bootstrap-icons';
import { Alert } from 'bootstrap';
// import EditWorkspace from '.././editWorkspace/editWorkspace'
// import project_reducer from '../../../../redux/Reducers/project_reducer';
import Select from 'react-select';
function ProjectsList(props) {

    const { idProject } = useParams();

    useEffect(() => {
        props.getProjectByIdInServer(idProject)
        // props.changeProject(idProject)
        props.getProjectsByWorkspaceId(props.project.workspace)
        console.log("project" + props.projects)

        // props.sendWorspaceId(props.project.workspace)


    }, [props.project.workspace._id])

    //to chang the project that user selected
    let myProject = props.project;
    // myWorkspace = props.workspaces.find(w => w._id == workspaceId)

    const changeSelectedProject = (id) => {
        // props.changeProjectId()
        props.getProjectByIdInServer(id)
        $(document).ready(function () {
            $(".project-select").css("color", props.project.color)
        })
        // let projectIdSelected = event.target.options[event.target.selectedIndex].id;
        props.changeProject(id)
    }
    // const viewProjectsByWorkspace1 = props.projects.map((project) => {
    //     // if (project.name && project._id != props.project._id)
    //       return   project.name
               
    // })

    // const viewProjectsByWorkspace1 = props.projects.map((project) => {
    //     if (project.name && project._id != props.project._id)
    //         return <>
    //             <option className="option" value={project._id}
    //                 style={{ color: project.color ? project.color : "#F7B500" }}>
    //                 {project.name} </option>
    //         </>
    // })

    return (
        <>
           
            {/* <Dropdown className="m-4" onChange={(e) => changeSelectedProject(e.target.value)} options={options} value={props.project.name} /> */}
            {/* {options} */}
            {/* <div className="">
                <div className=" mt-5 py-1 row-projects " >
                    <select defaultValue={idProject}
                        onChange={(e) => changeSelectedProject(e.target.value)} className="project-select pl-4 py-1">
                        <option className="option " value={props.project._id}
                            style={{ color: props.project.color ? props.project.color : "#F7B500" }}>
                            {props.project.name} */}
            {/* <span class='stripeProject' */}
            {/* style={{ 'background-color': props.project.color }}></span> */}
            {/* </option>
                        // {viewProjectsByWorkspace1}
                    </select>
                    <a className="ml-0 pr-4 pt-1">Add Project +</a>
                </div>
            </div> */}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        projects: state.public_reducer.projects,
        project: state.project_reducer.project,
        workspaces: state.public_reducer.workspaces,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setProject: (project) => dispatch(actions.setProject(project)),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        getProjectByIdInServer: (idProject) => dispatch(actions.getProjectByIdInServer(idProject)),
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList)




