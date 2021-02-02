import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import { Button, Card, Form } from 'react-bootstrap';
import viewProject from '../../project/viewProject/viewProject';
import { useParams } from 'react-router-dom';
import './projectsList.css'
// import EditWorkspace from '.././editWorkspace/editWorkspace'
// import project_reducer from '../../../../redux/Reducers/project_reducer';

function ProjectsList(props) {

    let { id } = useParams();

    useEffect(() => {
        props.getProjectsByWorkspaceId("60097fcf88229595ce677d42");
    }, [])
    //to chang the project that user selected
    const changeSelectedProject = (event) => {
        console.log("hi")
        let projectIdSelected = event.target.options[event.target.selectedIndex].id;
        // let projectColorSelected = event.target.options[event.target.select].color;
        console.log(event.target.options[event.target.select])
        // alert(event.target.options[event.target.selectedIndex].color)
        props.changeProject(projectIdSelected)

    }
    const viewProjectsByWorkspace = props.projects.map((project) => {
        if (project.name)
            return <option className="option" id={project._id} color={project.color}
                style={{ color: project.color ? project.color : "#F7B500" }}>
                {project.name} </option>
        // <option id={project._id} value={project.color}>{project.name}</option>

    })
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-11 mt-5 row-projects ">
                    <select onChange={(e) => changeSelectedProject(e)} className=" py-1">{viewProjectsByWorkspace}</select>
                    {/* <label className="col-10">Add Project</label> */}
                    <a className="ml-0 pt-1">Add Project +</a>

                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        projects: state.public_reducer.projects,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList)




