import ReactDOM from 'react-dom'
// import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import './header.css'
import { setproject } from '../../../redux/actions/action'
import React, { useState } from 'react';
import Newtask from './newtask/newtask'
import NewProject from './newproject/newproject';
import NewWorkpas from './nweworkspace/newworkspace';


import { actions } from '..//..//..//redux/actions/action'
import { propTypes } from 'react-bootstrap/esm/Image';

import './header.css'


// function mapStateToProps(state) {
//     return {
//         project: state.projectReducer.project,
//     };
// }

// const mapDispatchToProps = (dispatch) => ({
//     setproject: (project_name) => dispatch(setproject(project_name))

// })
function Header(props) {
    function newtask() {
        settask(false);
    }
    function newworkpas() {
        set_workpas(false);
    }
    function newpoject() {
        set_project(false);
    }

    const [project, set_project] = useState(true);
    const [task, settask] = useState(true);
    const [workpas, set_workpas] = useState(true);
    // const [nameW, setNameW] = useState();

    // const createWorkspace = (e) => {
    //     const jsonW = {
    //         "name": nameW,

    //     }}
    // props.createW(jsonW);
    const change = (event) => {
        debugger
        props.createW(event.target.name, event.target.value)
    }

    return (
        task ?
            workpas ?
                project ?
                   <div className="headerserch">
                            <div className="row">

                                <div className="col-md-1 col-xs-2 mt-2 Type" style={{ color: "#707074" }}>Type</div>
                                <div className="col-md-2 col-xs-2 mt-2" style={{ color: "#707074" }}>Name</div>
                                <div className="col-md-2 col-xs-1"></div>
                                {/* <div className="col-md-1  col-xs-1 mt-2 Category" style={{ color: "#707074" }}>Category</div> */}
                                <div className="col-md-2 col-xs-1 mt-2 Do" style={{ color: "#707074" }}>Do To</div>
                            </div>
                            <div className="row mt-2">
                                {/* <h1>{props.workspace1}</h1> */}
                                <div className="col-md-1 col-xs-0.5">

                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            <img src={require('../../img/angle-down-solid.png')}></img>
                           Task <img src={require('../../img/star-solid.png')}></img>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item id="project" onClick={newpoject}>
                                                Project</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2" id="task" onClick={newtask}>
                                                <img src={require('../../img/1star-solid.png')}></img>
                                Task</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2" id="workpas" onClick={newworkpas}>

                                                workpas</Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown>

                                </div>



                                <div className="col-md-4 col-xs-1 input_task_or_project">
                                    <div className="mt-2"></div>
                                    <input type="text" name="name"
                                        id="inputText" placeholder="Type the name of the task or project" onChange={(e) => change(e)} />
                                </div>
                                <div className="col-md-1.5 col-xs-0.5 type_category"><div className="mt-2"></div>Type Category</div>
                                <div className="col-md-1 col-xs-0.5"></div>
                                <div className="col-md-1.5 date">
                                    <div className="row mt-2"></div>
                                    <input type="date" id="date1"></input>
                                </div>
                                <div className="col-md-2 col-xs-1 START"><div className="textstart mt-2">
                                <div className="mt-2"></div>
                                <b>START TASK</b></div>
                                </div></div>

                        <button onClick={() => props.setWorkspaCrud(props.workspace1)}>NEW</button>
                            <button onClick={() => { props.setWorkspaCrud(props.workspace1); debugger }}>NEW</button>
                        </div>

           

                    :
                    <>
                        <NewProject />
                    </>
                :
                <>
                    <NewWorkpas />

                </>
            :
            <>
                <Newtask />
            </>





    )

}
const mapStateToProps = (state) => {
    return {
        workspace1: state.workspace_reducer.workspace,



    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setWorkspaCrud: (props) => dispatch(actions.setWorkspaceCrud(props)),
        createW: (name, value) => dispatch(actions.setWorkspace(name, value)),
        // setWorkspaCrud: (props) => dispatch({ type: 'SET_WORKSPACE_CRUD', payloud: props })



    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
