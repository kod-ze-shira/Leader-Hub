import React, { useEffect, useState } from 'react'
import './newProject.css'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import Toast from 'react-bootstrap/Toast'
import viewDetails from '../../viewDetails/viewDetails'
import $ from "jquery";

function NewProject(props) {
    let project = { 'updateDates': [] }
    let myColor;
    const colorList = ["#C967B6", "#8D18AD", "#4D2AC9", "#6A67C9", "#2B79C2", "#32AABA", "#34A38B", "#53A118", "#91A118", "#BDAA1C",
        "#C48E1A", "#C46F1A", "#C43C1A", "#BF2E63", "#C9676F",
        "#FD80E5", "#B620E0", "#6236FC", "#8580FD", "#3598F4", "#40D9ED", "#44D7B6", "#6DD41F", "#BFD41", "#F0D923",
        "#F8B520", "#F88C20", "#F84A20", "#F13B7F", "#FD808B",
        "#FCB3EE", "#CA79E0", "#8868FC", "#B6B3FC", "#67B0F5", "#6FDEED", "#6FD6C0", "#86D44A", "#C4D44A", "#F0DE54",
        "#F7C352", "#F7A452", "#F77352", "#F26B9C", "#FCB3B9"]



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
            $(`#nameProject`).val('')
            $(`#descriptionProject`).val('')
            $(`#dueDateProject`).val('')
            myColor = getRandomColor();
            $(`#colorProject`).val(myColor)
        }
    }
    myColor = getRandomColor();
    function getRandomColor() {
        const randColor = Math.floor((Math.random() * colorList.length) + 0)
        const color = colorList[randColor]
        return color;
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
                        className="inputProject"
                        name="name"
                        placeholder='name project'
                        // value={project.name}
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
                        className="inputProject"
                        name="description"
                        id='descriptionProject'
                        placeholder='description'
                        // value={project.name}

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
                        className="inputProject"
                        name="dueDate"
                        type="date"
                        id='dueDateProject'
                        // value={project.dueDate}
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
                        className="inputProject"
                        name="color"
                        type="color"
                        id='colorProject'
                        value={myColor}
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