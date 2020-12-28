import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { CompactPicker } from 'react-color';
import './header.css'


export default function Header() {
    return (

        <div className="headerserch">
            <div className="row">
            
                <div className="col-md-1 col-xs-2 mt-2 Type" style={{ color: "#707074" }}>Type</div>
                <div className="col-md-2 col-xs-2 mt-2" style={{ color: "#707074" }}>Name</div>
                <div className="col-md-2 col-xs-1"></div>
                <div className="col-md-1  col-xs-1 mt-2 Category" style={{ color: "#707074" }}>Category</div>
                <div className="col-md-2 col-xs-1 mt-2 Do" style={{ color: "#707074" }}>Do To</div>
            </div>
            <div className="row mt-2">

                <div className="col-md-1 col-xs-0.5">

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <img src={require('../../img/angle-down-solid.png')}></img>
                           Task <img src={require('../../img/star-solid.png')}></img>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" id="project">
                                Project</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" id="task">
                                <img src={require('../../img/1star-solid.png')}></img>
                                Task</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>

                </div>


                <div className="col-md-4 col-xs-1 input_task_or_project">
                    <div className="mt-2"></div>
                    <input type="text"
                        id="inputText" placeholder="Type the name of the task or project" />
                </div>
                <div className="col-md-1.5 col-xs-0.5 type_category"><div className="mt-2"></div>Type Category</div>
                <div className="col-md-1 col-xs-0.5"></div>
                <div className="col-md-1.5 date">
                    <div className="row mt-2"></div>
                    <input type="date" id="date1"></input>
                </div>
                <div className="col-md-2 col-xs-1 START"><div className="textstart mt-2">
                    <div className="mt-2"></div>
                    <b>START TASK</b></div></div>
            </div>
        </div>
    );
}