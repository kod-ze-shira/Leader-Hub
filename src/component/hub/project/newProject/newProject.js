import $ from "jquery"
import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import title from '../../../../Data/title.json'
import { actions } from '../../../../redux/actions/action'
import './newProject.css'
import QuillNewProject from '../myQuill/quillNewProject'
import AssignWorkspaceToNewProject from '../../assignWorkspaceToNewProject/assignWorkspaceToNewProject'


function NewProject(props) {
    let [flag, setFlag] = useState(false)
    let project = { 'updateDates': [] }
    let [myColor, setMyColor] = useState("#C967B6")
    let [nameProject, setNameProject] = useState('')
    let [description, setDescription] = useState('')
    let [myStyle, setMyStyle] = useState('');
    let [myDueDate, setMyDueDate] = useState('')
    const [workspaceForProject, setWorkspaceForProject] = useState()

    const nameRequired = useRef()

    const colorList = ["#C967B6", "#8D18AD", "#4D2AC9", "#6A67C9", "#2B79C2", "#32AABA", "#34A38B", "#53A118", "#91A118", "#BDAA1C",
        "#C48E1A", "#C46F1A", "#C43C1A", "#BF2E63", "#C9676F",
        "#FD80E5", "#B620E0", "#6236FC", "#8580FD", "#3598F4", "#40D9ED", "#44D7B6", "#6DD41F", "#BFD41", "#F0D923",
        "#F8B520", "#F88C20", "#F84A20", "#F13B7F", "#FD808B",
        "#FCB3EE", "#CA79E0", "#8868FC", "#B6B3FC", "#67B0F5", "#6FDEED", "#6FD6C0", "#86D44A", "#C4D44A", "#F0DE54",
        "#F7C352", "#F7A452", "#F77352", "#F26B9C", "#FCB3B9"]

    function getRandomColor() {
        const randColor = Math.floor((Math.random() * colorList.length) + 0)
        const color = colorList[randColor]
        return color;
    }
    if (!flag) {
        fun()
        setFlag(true)
    }
    function fun() {
        let p = getRandomColor()
        setMyColor(p)
        p = dueDate()
        setMyDueDate(p)
    }
    const changeNameInProject = (input) => {
        $(`#nameProject`).css({ 'border-bottom': 'rgb(129, 129, 165) solid 1px' })
        setNameProject(input.target.value)
    }
    let d = dueDateForAnotherTwoMonths();
    // setDufultDateDueDate(d)
    $(`#dueDateProject`).val(d)
    // document.getElementById("dueDateProject").defaultValue = d;



    const changeDueDateInProject = (input) => {
        setMyDueDate(input.target.value)
        // project[input.target.name] = input.target.value

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
        console.log(project)
        project.color = myColor
        project.workspace = props.workspace._id
        project.name = nameProject
        project.description = description

        let myDate = myDueDate
        let res = myDate.split("-")[2] + '/' + myDate.split("-")[1] + '/' + myDate.split("-")[0];
        project.dueDate = res
        if (props.fromAllproject) {
            if (!workspaceForProject) {
                alert("choose workspace")
                return
            }
            project.workspace = workspaceForProject
        }
        if (nameRequired.current.value) {
            props.newProject(project)
            document.getElementById('nameProject').value = ''
            // document.getElementById('descriptionProject').value = ''
            setMyStyle({ 'border-bottom': ' rgb(129, 129, 165) solid 1px' })
            document.getElementById('dueDateProject').value = ''
            // props.closeViewDetails(false)
            props.closeViewDetails()
        }
        else {
            nameRequired.current.focus()
            var form = document.getElementById('nameRequired')
            form.classList.add('was-validated')
        }
    }

    function dueDate() {
        let date = new Date()
        date.setMonth(date.getMonth() + 3)
        let month = date.getMonth() + 1
        let day = date.getDate()
        let year = date.getFullYear()
        const finalDate = year + '-' + (month <= 9 ? '0' + month : month) + '-' + (day <= 9 ? '0' + day : day)
        return (finalDate)
    }
    const changeColorProject = (input) => {
        setMyColor(input.target.value)
        project[input.target.name] = input.target.value
    }

    return (
        <>
            <div className="details mr-4 ml-4">
                <div className='propertiesViewDitails'>
                    <div className='row mt-4 mb-1 justify-content-between headerDitails'>
                        <h5 className=" title-view-details  pl-3">Add Project</h5>

                        <div className="close pr-3" onClick={() => props.closeViewDetails()}>x</div>
                        {/* <h5 className="mt-5 title-view-details pb-1 mb-2">Add Project</h5> */}

                    </div>

                    {!props.fromAllproject ?
                        <div className="row justify-content-between  mx-1 mb-2">
                            <label>workspace: {props.workspace.name}</label>
                        </div> :
                        <div className=" col-3 px-1">
                            <label>choose workspace: </label>
                            <AssignWorkspaceToNewProject setWorkspaceToProject={(w) => setWorkspaceForProject(w)} />
                        </div>}

                    <div className="form-group" id='nameRequired'>
                        <label for="name">Name</label>
                        <input name="name" onChange={(e) => changeNameInProject(e)}
                            required ref={nameRequired} autoFocus
                            id='nameProject' type="text" className="form-control" value={nameProject} />
                        <div className="invalid-feedback">
                            Please enter project name.
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="description">Description</label>
                        <QuillNewProject text={(e) => setDescription(e)} />

                        {/* <div className="form-control descriptionProject" name="description"
                            id="descriptionProject" rows="5" placeholder="Write a description about your project"
                            ref={descriptionInput} contentEditable></div> */}
                    </div>
                    <div className="row justify-content-between" >
                        <div className="form-group col-5 ditailsAction col-md-4">
                            <label for="color">Project color</label>
                            <input name="color"
                                className="form-control"
                                onChange={(e) => changeColorProject(e)}
                                type="color"
                                id='colorProject'
                                value={myColor}
                            />
                        </div>
                        <div className="form-group col-5 ditailsAction col-md-8" >
                            <label for="color">Due Date</label>
                            <input
                                className="form-control "
                                name="dueDate"
                                type="date"
                                id='dueDateProject'
                                value={myDueDate}
                                onChange={(e) => changeDueDateInProject(e)} />
                        </div>
                    </div>
                </div>
                <div className="row justify-content-end">
                    <button onClick={() => addProject()} data-tip data-for="save"
                        style={{ 'margin-top': '0px !important;' }} className="save_canges_btn px-5">Save</button>
                    <ReactTooltip className="tooltip-style" data-tip id="save" place="top" effect="solid">
                        {title.title_save}
                    </ReactTooltip>
                </div>
            </div>


        </>





    )
}
export default connect(
    (state) => {
        return {
            workspace: state.workspace_reducer.workspace,
            descriptionNewProject: state.public_reducer.descriptionNewProject
        }
    },
    (dispatch) => {
        return {
            newProject: (props) => dispatch(actions.newProject(props)),
        }
    }
)(NewProject)