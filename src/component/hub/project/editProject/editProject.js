import React, { useEffect, useState } from 'react'
import '../newProject/newProject.css'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import Toast from 'react-bootstrap/Toast'
import viewDetails from '../../viewDetails/viewDetails'
import $ from "jquery";

function EditProject(props) {
    let project = { 'updateDates': [] }

    const changeFiledInWorkspace = (input) => {
        $(`#nameProject`).css({ 'border-bottom': 'rgb(129, 129, 165) solid 1px' })
        project[input.target.name] = input.target.value
    }

    function addProject() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        console.log(date + '/' + month + '/' + year)
        project.updateDates[0] = date + '/' + month + '/' + year
        project.workspace = props.workspaceId
        if (!project.name)
            $(`#nameProject`).css({ 'border-bottom': 'red solid 1px' })
        else {
            props.newProject(project)
            // $(`#nameProject`).val('')
            // $(`#descriptionProject`).val('')
            // $(`#dueDateProject`).val('')
            // myColor = getRandomColor();
            // $(`#colorProject`).val(myColor)
        }
    }

    return (


        <>
            <div className="row">
                <div className="col-11"></div>
                {/* <div className="col-1" className="close_edit"  onClick={props.setcloseEditWorkspace()}>x</div> */}
            </div>
            <div className="row mt-1">
                <div className="col-5"><b>Name:</b></div>
                <div className="col-6">
                    <input
                        id='nameProject'
                        className="name"
                        name="name"
                        placeholder='name project'
                        value={props.prject.name}
                        onChange={(e) => changeFiledInWorkspace(e)}
                    >
                    </input>
                </div>
                {/* {props.workspaceId}*/}
            </div>
            <div className="row mt-1">
                <div className=" col-5"><b>Description:</b></div>
                <div className="col-6">
                    <input
                        className="name"
                        name="description"
                        id='descriptionProject'
                        placeholder='description'
                        value={props.prject.name}

                        onChange={(e) => changeFiledInWorkspace(e)}
                    >
                    </input>
                </div>
                {/* {props.workspaceId}*/}
            </div>
            <div className="row mt-1">
                <div className=" col-5"><b>Due date:</b></div>
                <div className="col-6">
                    <input
                        className="name"
                        name="dueDate"
                        type="date"
                        id='dueDateProject'
                        value={props.prject.dueDate}
                        onChange={(e) => changeFiledInWorkspace(e)}
                    >
                    </input>
                </div>
                {/* {props.workspaceId}*/}
            </div>

            <div className="row mt-1">
                <div className=" col-5"><b>Color:</b></div>
                <div className="col-6">
                    <input
                        className="name"
                        name="color"
                        type="color"
                        id='colorProject'
                        value={props.prject.color}
                        onChange={(e) => changeFiledInWorkspace(e)}
                    >
                    </input>
                </div>
                {/* {props.workspaceId}*/}
            </div>

            <div className="row mt-1">
                <div classNae="col-3"></div>
                <div className="col-3">
                    <button onClick={() => addProject()}>save</button></div>
            </div>


        </>





    )
}
export default connect(
    (state) => {
        return {
            // workspaceToEdit: state.workspace_reducer.workspace,
            // workspaces: state.workspace_reducer.workspaces,


        }
    },
    (dispatch) => {
        return {
            newProject: (props) => dispatch(actions.newProject(props)),



        }
    }
)(NewProject)