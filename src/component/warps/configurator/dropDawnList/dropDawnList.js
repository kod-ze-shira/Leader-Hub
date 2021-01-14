import React from 'react'
import { connect } from 'react-redux';
import { Dropdown, DropdownButton, ButtonGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './dropDawnList.css'
// import { actions } from '../../../../redux/actions/action'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(function NewTasck(props) {
    return (
        <>
            <Dropdown>
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
            </Dropdown>
        </>
    )
})




