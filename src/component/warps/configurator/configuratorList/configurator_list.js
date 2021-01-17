

import React from 'react'
import { connect } from 'react-redux';
// import { actions } from '../../../../redux/actions/action'
import { Dropdown, DropdownButton, ButtonGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import $ from 'jquery'

import './configurator_list.css'
const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(function ConfiguratorList(props) {
    $(document).ready(function () {
        debugger

        $("#basic-nav-dropdown").click(function () {
            $(".cc").toggle();
        });
    });
    return (
        <>

            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
<div className="cc">

                <NavDropdown
                    drop="down"
                    title="Drop"
                    className="aa"
                >
                    <NavDropdown
                        drop="down"
                        title="Drop"
                        className="bb"
                    ></NavDropdown>
                </NavDropdown>


                <NavDropdown
                    drop="down"
                    title="Drop"
                    className=""

                >
                    <NavDropdown
                        drop="down"
                        title="Drop"
                    >
                    </NavDropdown>

                </NavDropdown>



                <NavDropdown
                    drop="down"
                    title="Drop"
                    className=""

                >
                </NavDropdown>
                </div>

            </NavDropdown>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">


                <NavDropdown
                    drop="down"
                    title="Drop"
                    className="aa"
                >
                    <NavDropdown
                        drop="down"
                        title="Drop"
                        className="bb"
                    ></NavDropdown>
                </NavDropdown>


                <NavDropdown
                    drop="down"
                    title="Drop"
                    className=""

                >
                    <NavDropdown
                        drop="down"
                        title="Drop"
                    >
                    </NavDropdown>

                </NavDropdown>



                <NavDropdown
                    drop="down"
                    title="Drop"
                    className=""

                >
                </NavDropdown>


            </NavDropdown>
            {/* </NavDropdown> */}


            {/* </NavDropdown> */}

        </>
    )
})




