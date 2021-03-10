import React from 'react'
import { connect } from 'react-redux';
import './new_configurator.css'
// import { actions } from '../../../../redux/actions/action'
import DropDownList from '../dropDownList/dropDownList'
import ConfiguratorTop from '../configuratorTop/configuratorTop'
import $ from 'jquery'
import history from '../../../history'
import { withRouter } from 'react-router-dom';


function NewConfigorator(props) {
    const changeBackground = (e) => {
        props.history.push("/" + props.user)
        $(document).ready(function () {
            $("li").removeClass("li-back")
            $(e).addClass("li-back")
        })

    }
    function goToAllProjects(e) {
        changeBackground(e)
        props.history.push("/" + props.user + "/allWorkspace")
    }
    return (
        <>
            <div className="left_nav ">
                <div className=" col-8 pt-4 mt-3 ml-1">
                    <img src={require('../../../img/logo-hub.png')}></img>
                    {/* <div onClick={props.openConfigurator} >
                        <img className="ml-4 my-2" src={require('../../../img/menu.png')}></img>
                    </div> */}

                </div>
                <ul className="list_config">
                    <li className="li-back" onDrag onClick={(e) => changeBackground(e.target)}>
                        <img className="mr-2" src={require('../../../img/workspace.svg')}></img>
                    My Workspace </li>
                    {/* <li onDrop onClick={(e) => changeBackground(e.target)}> */}
                    <li onDrag onClick={(e) => goToAllProjects(e.target)}>

                        <img className="mr-2" src={require('../../../img/bag-check.svg')}></img>
                        My Projects</li>
                    <li onClick={(e) => changeBackground(e.target)}>
                        <img className="mr-2" src={require('../../../img/flag-alt.svg')}></img>
                        Goals</li>
                    <li onClick={(e) => changeBackground(e.target)}>
                        <img className="mr-2" src={require('../../../img/form-line.svg')}></img>
                        Forms</li>
                    <li onClick={(e) => changeBackground(e.target)}>
                        <img className="mr-2" src={require('../../../img/mail-open-outline.svg')}></img>
                        Email</li>
                    <li onClick={(e) => changeBackground(e.target)}>
                        <img className="mr-2" src={require('../../../img/users-solid.svg')}></img>
                        Members</li>

                </ul>


                {/* <ConfiguratorTop /> */}
                {/* <DropDownList /> */}
            </div>
        </>
    )
}

const mapStateToProps = (state) => {

    return {
        user: state.public_reducer.userName,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewConfigorator))
