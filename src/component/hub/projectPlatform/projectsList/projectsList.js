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

    const { id } = useParams();

    useEffect(() => {
        props.getProjectsByWorkspaceId(id);
    }, [])
    // 6011270ba72ba9f8be885e06
    const [projectId, setProjectId] = useState("6011270ba72ba9f8be885e06");
    const [color, setColor] = useState();



    $(document).ready(function () {
        $(".select").change(function () {
            // console.log(color);
            $(".select").css("color", color)
        });
    });


    const func = (id) => {
        // console.log(id);
        setProjectId(id)
        console.log(projectId);
    }

    const viewOptinonc = props.projects.map((project) => {
        // setColor(project.color)
        if (project.name)
            return <>
                <option className="option" value={project._id} color={project.color}
                    style={{ color: project.color ? project.color : "#F7B500" }}>
                    {project.name} </option></>
    })


    return (
        <>
            <div className="col-11 mt-5 row-projects">
                <select onChange={(e) => func(e.target.value)} className="select  py-1">
                    {viewOptinonc}
                </select>
                <a className="ml-0 pt-1">Add Project +</a>
            </div>
            <CardsByProject projectId={projectId}></CardsByProject>
            {/* 6011270ba72ba9f8be885e06 */}
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




