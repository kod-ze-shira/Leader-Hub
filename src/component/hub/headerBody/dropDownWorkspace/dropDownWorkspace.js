import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import { Button, Card, Form } from 'react-bootstrap';
import viewProject from '../../project/viewProject/viewProject';
import { useParams } from 'react-router-dom';
import './dropDownWorkspace.css'
// import EditWorkspace from '.././editWorkspace/editWorkspace'
// import project_reducer from '../../../../redux/Reducers/project_reducer';

function DropDownWorkspace(props) {

    let { id } = useParams();

    useEffect(() => {
        { props.getAllWorkspaces() };

    }, []);
    //to chang the project that user selected
    const changeSelectedWorkspace = (event) => {
        let workspaceId = event.target.options[event.target.selectedIndex].id;
        // let projectColorSelected = event.target.options[event.target.select].color;
        console.log(event.target.options[event.target.select])
        // alert(event.target.options[event.target.selectedIndex].color)
        // props.changeProject(workspaceId)
        props.changeWorkspace(workspaceId)

    }
    const viewWorkspace = props.workspaces.map((workspace) => {
        if (workspace.name)
            return <option className="option" id={workspace._id} color={workspace.color}
                style={{ color: workspace.color ? workspace.color : "#F7B500" }}>
                {workspace.name} </option>
        // <option id={project._id} value={project.color}>{project.name}</option>

    })
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-11 mt-5 row-projects ">
                    <select onChange={(e) => changeSelectedWorkspace(e)} className=" py-1">{viewWorkspace}</select>
                    {/* <label className="col-10">Add Project</label> */}

                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        workspaces: state.public_reducer.workspaces,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspaces: () => dispatch(actions.getAllWorkspaces())
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(DropDownWorkspace)




