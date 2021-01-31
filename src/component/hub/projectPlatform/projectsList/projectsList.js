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

function ProjectsList(props) {

    // const { id } = useParams();

    useEffect(() => {
        props.getProjectById("6011270ba72ba9f8be885e06")
        // console.log("60098264d4d8ce179bcb7fdd")      
    }, [])
    //to chang the project that user selected
    const changeSelectedProject = (event) => {
        let projectIdSelected = event.target.options[event.target.selectedIndex].id;
        props.changeProject(projectIdSelected)

    }

    const viewProjectsByWorkspace = props.projects.map((project) => {
        if (project.name)
            return <>
                <option className="option" value={project._id} color={project.color}
                    style={{ color: project.color ? project.color : "#F7B500" }}>
                    {project.name} </option></>
    })


    return (
        <>
            <div className="row justify-content-center">
                <button onClick={() =>  props.getProjectsByWorkspaceId(props.project.workspace._id)}>click me</button>
                <div className="col-11 mt-5 row-projects ">
                    <select onChange={(e) => changeSelectedProject(e)} className=" py-1">{viewProjectsByWorkspace}</select>
                    <a className="ml-0 pt-1">Add Project +</a>

                </div>
            </div>
            {/* <CardsByProject projectId={projectId}></CardsByProject> */}
            {/* 6011270ba72ba9f8be885e06 */}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        projects: state.public_reducer.projects,
        project: state.project_reducer.project
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProjectById: (idProject) => dispatch(actions.getProjectByIdInServer(idProject)),
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspace(idWorkspace))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList)




