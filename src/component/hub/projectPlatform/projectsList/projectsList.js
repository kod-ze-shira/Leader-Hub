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

    let { name } = useParams();

    useEffect(() => {
        props.getProjectsByWorkspaceId("60097fcf88229595ce677d42");
    }, [])
    //to chang the project that user selected
    const changeSelectedProject = (event) => {
     let projectIdSelected=  event.target.options[event.target.selectedIndex].id;
    // alert(event.target.options[event.target.selectedIndex].color)
      props.changeProject(projectIdSelected)  

    }
    const viewProjectsByWorkspace = props.projects.map((project) => {
        // console.log(project.name);
        // return <viewProject key={project._id} project={project} />
        if (project.name)
            return <option id={project._id} value={project.color}>{project.name}</option>

    })
    return (
        <>
            <div className="mx-5 mt-5 row-projects ">
                <select onChange={(e) => changeSelectedProject(e)} className="col-2 py-1">{viewProjectsByWorkspace}</select>
                {/* <label className="col-10">Add Project</label> */}
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
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspace(idWorkspace))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList)




