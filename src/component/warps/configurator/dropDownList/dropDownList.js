import React from 'react'
import { connect } from 'react-redux';
import { Dropdown, DropdownButton, ButtonGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './dropDownList.css'
import { actions } from '../../../../redux/actions/action'
import { ViewWorkspaceName } from '../viewWorkspaceName/viewWorkspaceName'
import $ from 'jquery';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl, InputGroup } from 'react-bootstrap'
import history from '../../../history'


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
    const showInPlatform = () => {
        props.getAllWorkspaces();
        // history.push('/workspacePlatform')

    }
    $(document).ready(function () {
        let flag = false;


        $(".workspaces").click(function () {
            // $(".workspaces").css("border", "none");
            flag = !flag;

            if (flag) {
                $(".icon").show();
                $("input").show()
                $(".search").show()
                $(".workspace-list").show();
                $(".workspace-list").css("border", "0.5px solid #979797");
            }
            else {
                $(".workspace-list").hide();
                $(".workspace-list").hide();
                $(".icon").hide();
                $("input").hide()
            }

        });
    });

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <button onClick={showInPlatform} className="workspaces col-8 mt-5 btn btn-outline-secondary">Workspace</button>
                    <div className="workspace-list  mt-2 col-8">
                        <div className="search">
                            <InputGroup size="sm" className="mb-3 mt-2" >
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-sm"> <FontAwesomeIcon className=""
                                        icon={['fas', 'search']}
                                    ></FontAwesomeIcon></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="search" />
                            </InputGroup>
                        </div>
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

        </>
    )
})




