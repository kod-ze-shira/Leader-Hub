import React from 'react'
import { connect } from 'react-redux';
import { Dropdown, DropdownButton, ButtonGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './dropDawnList.css'
import { actions } from '../../../../redux/actions/action'
import Workspace from '../workspace/workspace'

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


   

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                   <Workspace></Workspace>
                </div>
                <div className="row justify-content-center">
                    <button className=" col-8 mt-2 btn btn-outline-secondary">Projects<div className="mt-1 arrow-down"></div></button>
                </div>
                <div className="row justify-content-center">
                    <button className=" col-8 mt-2 btn btn-outline-secondary">Tasks<div className="mt-1 arrow-down"></div></button>
                </div>
                <div className="row justify-content-center">
                    <button className=" col-8 mt-2 btn btn-outline-secondary">Goals<div className="mt-1 arrow-down"></div></button>
                </div>
                <div className="row justify-content-center">
                    <button className=" col-8 mt-2 btn btn-outline-secondary">Forms<div className="mt-1 arrow-down"></div></button>
                </div>
                <div className="row justify-content-center">
                    <button className=" col-8 mt-2 btn btn-outline-secondary">Emails<div className="mt-1 arrow-down"></div></button>
                </div>
                <div className="row justify-content-center">
                    <button className=" col-8 mt-2 btn btn-outline-secondary">Teams<div className="mt-1 arrow-down"></div></button>
                </div>
            </div>

        </>
    )
})




