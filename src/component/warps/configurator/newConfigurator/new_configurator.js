import React from 'react'
import { connect } from 'react-redux';
import './new_configurator.css'
// import { actions } from '../../../../redux/actions/action'
import DropDownList from '../dropDownList/dropDownList'
import ConfiguratorTop from '../configuratorTop/configuratorTop'
import $ from 'jquery'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(function NewTasck(props) {
    const changeBackground = (e) => {
        $(document).ready(function () {
            $("li").removeClass("li-back")
            $(e).addClass("li-back")
        })

    }

    return (
        <>
            <div className="right_nav ">
                <div className="row justify-content-center mt-5">
                    <img src={require('../../../img/logoLeader.svg')}></img>
                </div>
                <ul className="list_config">
                    <li className="li-back" onClick={(e) => changeBackground(e.target)}>My Workspace</li>
                    <li onClick={(e) => changeBackground(e.target)}>My Projects</li>
                    <li onClick={(e) => changeBackground(e.target)}>Goals</li>
                    <li onClick={(e) => changeBackground(e.target)}>Forms</li>
                    <li onClick={(e) => changeBackground(e.target)}>Email</li>
                    <li onClick={(e) => changeBackground(e.target)}>Members</li>

                </ul>

                {/* <ConfiguratorTop /> */}
                {/* <DropDownList /> */}
            </div>
        </>
    )
})




