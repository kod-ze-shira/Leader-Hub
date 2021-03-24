import React, { useEffect, useState } from 'react'
import './newProject.css'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import Toast from 'react-bootstrap/Toast'
import viewDetails from '../../viewDetails/viewDetails'
import $ from "jquery";

function NewProject(props) {
    let project = { 'updateDates': [] }
    let [myColor, setMyColor] = useState()
    let [emptyValue, setEmptyValue] = useState(false)
    let [myStyle, setMyStyle] = useState();
    // let [dufultDateDueDate, setDufultDateDueDate] = useState()
    let tempColor
    const colorList = ["#C967B6", "#8D18AD", "#4D2AC9", "#6A67C9", "#2B79C2", "#32AABA", "#34A38B", "#53A118", "#91A118", "#BDAA1C",
        "#C48E1A", "#C46F1A", "#C43C1A", "#BF2E63", "#C9676F",
        "#FD80E5", "#B620E0", "#6236FC", "#8580FD", "#3598F4", "#40D9ED", "#44D7B6", "#6DD41F", "#BFD41", "#F0D923",
        "#F8B520", "#F88C20", "#F84A20", "#F13B7F", "#FD808B",
        "#FCB3EE", "#CA79E0", "#8868FC", "#B6B3FC", "#67B0F5", "#6FDEED", "#6FD6C0", "#86D44A", "#C4D44A", "#F0DE54",
        "#F7C352", "#F7A452", "#F77352", "#F26B9C", "#FCB3B9"]

    // const changeFiledInProject = (input) => {
    //     setMyStyle({ 'border-bottom': 'rgb(129, 129, 165) solid 1px' })
    //     project[input.target.name] = input.target.value
    // }
    let d = dueDateForAnotherTwoMonths();
    // setDufultDateDueDate(d)
    $(`#dueDateProject`).val(d)
    // document.getElementById("dueDateProject").defaultValue = d;

    const changeFiledInProject = (input) => {
        $(`#nameProject`).css({ 'border-bottom': 'rgb(129, 129, 165) solid 1px' })
        project[input.target.name] = input.target.value
    }

    function dueDateForAnotherTwoMonths() {
        let date = new Date()
        date.setMonth(date.getMonth() + 3)
        console.log("date : ", date)
        let month = date.getMonth() + 1
        let day = date.getDate()
        let year = date.getFullYear()
        const finalDate = (day <= 9 ? '0' + day : day) + '-' + (month <= 9 ? '0' + month : month) + '-' + year
        return finalDate;
    }

    function addProject() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        console.log(date + '/' + month + '/' + year)
        project.updateDates[0] = date + '/' + month + '/' + year
        debugger
        // project.workspace = props.workspaceId
        project.workspace = props.workspace.workspace._id
        if (project.dueDate) {
            let myDate = project.dueDate
            let res = myDate.split("-")[2] + '/' + myDate.split("-")[1] + '/' + myDate.split("-")[0];
            project.dueDate = res
        }

        if (!project.name) {
            // $(`#nameProject`).css({ 'border-bottom': 'red solid 1px' })
            setMyStyle({ 'border-bottom': 'red solid 1px' })
        }
        else {

            props.newProject(project)
            document.getElementById('nameProject').value = ''
            document.getElementById('descriptionProject').value = ''
            setMyStyle({ 'border-bottom': ' rgb(129, 129, 165) solid 1px' })
            document.getElementById('dueDateProject').value = ''
            props.closeViewDetails(false)

            // tempColor = getRandomColor();
            // setMyColor(tempColor)

            // $(`#colorProject`).val(myColor)
        }

    }
    // fun()
    // function fun() {
    // tempColor = getRandomColor();
    // setMyColor(tempColor)

    // }

    // myColor = getRandomColor();
    // setMyColor(getRandomColor())

    function getRandomColor() {
        const randColor = Math.floor((Math.random() * colorList.length) + 0)
        const color = colorList[randColor]
        return color;
    }
    return (


        <>

            <div className="details mr-5 ml-4">
                <h5 className="my-5 title-view-details pb-2">Add Project</h5>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input name="name" onChange={(e) => changeFiledInProject(e)}
                        id='nameProject' type="text" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" name="description" id="descriptionProject" rows="2" placeholder="Write a description"
                        onChange={(e) => changeFiledInProject(e)}></textarea>
                </div>
                <div className="row justify-content-between">
                    <div class="form-group col-5">
                        <label for="color">Color</label>
                        <input name="color"
                            className=" form-control "
                            onChange={(e) => changeFiledInProject(e)}
                            type="color"
                            id='colorProject'
                        />
                    </div>
                    <div class="form-group col-5">
                        <label for="color">Due Date</label>
                        <input
                            className="form-control "
                            name="dueDate"
                            type="date"
                            id='dueDateProject'
                            onChange={(e) => changeFiledInProject(e)} />
                    </div>
                </div>
                <div className="row justify-content-between  mx-1 btns-in-view-details-project">
                    <button data-toggle="tooltip" data-placement="top" title="Garbage" className="delete-btn col-4 " >
                        <img src={require('../../../img/bin.png')}></img> Delete
                </button>
                    <button onClick={() => addProject()} className="save_canges_btn col-3">Save</button>
                </div>
            </div>

        </>





    )
}
export default connect(
    (state) => {
        return {
            // workspaceToEdit: state.workspace_reducer.workspace,
            workspace: state.workspace_reducer.workspace,


        }
    },
    (dispatch) => {
        return {
            newProject: (props) => dispatch(actions.newProject(props)),



        }
    }
)(NewProject)