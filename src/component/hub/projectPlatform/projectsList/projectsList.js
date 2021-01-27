import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import { Button, Card, Form } from 'react-bootstrap';
import viewProject from '../../project/viewProject/viewProject';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import './projectsList.css'
// import EditWorkspace from '.././editWorkspace/editWorkspace'
// import project_reducer from '../../../../redux/Reducers/project_reducer';

function ProjectsList(props) {

    const { id } = useParams();

    useEffect(() => {
        props.getProjectsByWorkspaceId(id);
    }, [])

    const [projectId, setProjectId] = useState();


    // const func = (color,id) => {
    //     // alert("ghj")
    //     console.log(id);
    //     $(document).ready(function () {
    //         $(".select").css("color", color)
    //     });
    // }
    const func = (id) => {
        setProjectId(id)
        console.log(id);
    }

    return (
        <>
            <div className="col-11 mt-5 row-projects">
                <select onChange={(e) => func(e.target.value)} className="select col-2 py-1">
                    {props.projects.map((project) => {
                        // return <viewProject key={project._id} project={project} />
                        if (project.name)
                        return<> 
                         <option className="option" value={project._id}
                            style={{ color: project.color ? project.color : "#F7B500" }}>
                            {project.name} </option></>
                    })}
                </select>
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




