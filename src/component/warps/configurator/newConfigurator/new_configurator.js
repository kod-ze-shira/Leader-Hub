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
        props.history.push("/"+props.user)
        $(document).ready(function () {
            $("li").removeClass("li-back")
            $(e).addClass("li-back")
        })

    }

    return (
        <>
            <div className="left_nav ">
                <div className="ml-5 pt-4 mt-5">
                    <img src={require('../../../img/logoLeader.svg')}></img>
                </div>
                <ul className="list_config">
                    <li className="li-back" onClick={(e) => changeBackground(e.target)}>
                        <img className="mr-2" src={require('../../../img/mail-open-outline.svg')}></img>
                       My Workspace</li>
                    <li onClick={(e) => changeBackground(e.target)}>
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
