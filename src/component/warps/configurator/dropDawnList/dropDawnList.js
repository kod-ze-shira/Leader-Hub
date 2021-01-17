import React from 'react'
import { connect } from 'react-redux';
import { Dropdown, DropdownButton, ButtonGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './dropDawnList.css'
import { actions } from '../../../../redux/actions/action'
import { ViewWorkspaceName } from '../viewWorkspaceName/viewWorkspaceName'
import $ from 'jquery';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { BorderStyle } from 'react-bootstrap-icons';

const mapStateToProps = (state) => {
    return {
        workspaces: state.public_reducer.worksapces

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(function NewTasck(props) {

    const renderedWorkspacesName = props.workspaces.map(todo => {
        return <ViewWorkspaceName key={todo._id} workspace={todo} />
    })
    $(document).ready(function () {
        let flag = false;


        $(".workspaces").click(function () {
            // $(".workspaces").css("border", "none");
            flag = !flag;

            if (flag) {
                $(".icon").show();
                $("input").show()
                $(".workspace-list").show();
                $(".workspace-list").css("border", "0.5px solid #979797");
            }
            else {
                $(".workspace-list").hide();
                $(".workspace-list").hide();
                $(".icon").hide();
                $("input").hide()
            }
            // flag = !flag;
        });
    });

    return (
        <>
            {/* <button onClick={() => props.getAllWorkspaces()}> hi</button> */}
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <button onClick={() => props.getAllWorkspaces()} className="workspaces col-8 mt-5 btn btn-outline-secondary">Workspace</button>
                    <div className="workspace-list  mt-2 col-8">
                        <input className="show col-10 mt-2" type="" id="search" name="search" placeholder="search"
                        >
                        </input>
                        <FontAwesomeIcon className="icon show"
                            icon={['fas', 'search']}
                        ></FontAwesomeIcon>
                        <div className="" >{renderedWorkspacesName}</div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <button className=" col-8 mt-2 btn btn-outline-secondary">Projects</button>
                </div>
                <div className="row justify-content-center">
                    <button className=" col-8 mt-2 btn btn-outline-secondary">Tasks</button>
                </div>
                <div className="row justify-content-center">
                    <button className=" col-8 mt-2 btn btn-outline-secondary">Goals</button>
                </div>
                <div className="row justify-content-center">
                    <button className=" col-8 mt-2 btn btn-outline-secondary">Forms</button>
                </div>
                <div className="row justify-content-center">
                    <button className=" col-8 mt-2 btn btn-outline-secondary">Emails</button>
                </div>
                <div className="row justify-content-center">
                    <button className=" col-8 mt-2 btn btn-outline-secondary">Teams</button>
                </div>
            </div>
            {/* <Dropdown>
                <div className="row justify-content-around mt-5">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="col-8">
                        Workspace
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </div>
                <div className="row justify-content-around mt-3">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="col-8">
                        Projects
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </div>
                <div className="row justify-content-around mt-3">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="col-8">
                        Tasks
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </div>
                <div className="row justify-content-around mt-3">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="col-8">
                        Goals
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </div>
                <div className="row justify-content-around mt-3">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="col-8">
                        Forms
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </div>
                <div className="row justify-content-around mt-3">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="col-8">
                        Emails
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </div>
                <div className="row justify-content-around mt-3">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="col-8">
                        Teams
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </div>
            </Dropdown> */}
        </>
    )
})




