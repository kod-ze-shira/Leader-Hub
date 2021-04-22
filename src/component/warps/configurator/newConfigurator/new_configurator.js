import React, { useState } from 'react'
import { connect } from 'react-redux';
import './new_configurator.css'
// import { actions } from '../../../../redux/actions/action'
import $ from 'jquery'
// import history from '../../../history'
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function NewConfigorator(props) {
    const [closeOrOpenConfigurator, setCloseOrOpenConfigurator] = useState(true)
    // checkTheUrl()
    // function checkTheUrl() {
    $(document).ready(function () {
        if (window.location.href.indexOf('workspace') != -1 ||
            window.location.href.indexOf('allProjects') != -1) {
            $("li").removeClass("li-back")
            $(`#allProjects`).addClass("li-back")
            $(`#allProjects img`).removeClass("li-back")

        } else {
            if (window.location.href.indexOf('myTasks') != -1) {
                $("li").removeClass("li-back")
                $(`#myTask`).addClass("li-back")
                $(`#myTask img`).removeClass("li-back")
            }
        }


    })
    const changeBackground = (e) => {
        props.history.push("/" + props.user)
        $(document).ready(function () {
            $("li").removeClass("li-back")
            $(e).addClass("li-back")
            $('img').removeClass("li-back")

        })

    }
    function goToAllProjects(e) {
        changeBackground(e)
        props.history.push("/" + props.user + "/allProjects")
    }
    function goToGantt(e) {
        changeBackground(e)
        props.history.push("/" + props.user + "/gantt")
    }
    function goToMyTasks(e) {
        changeBackground(e)
        props.history.push("/" + props.user + "/myTasks")
    }
    function goToMilestones(e) {
        changeBackground(e)
        props.history.push("/" + props.user + "/milestones")
    }

    return (
        <>
            {/* <button class='closeConfigurator' onClick={() => setCloseOrOpenConfigurator(!closeOrOpenConfigurator)}>X</button> */}
            <FontAwesomeIcon icon={["fas", "bars"]} class='closeConfigurator' onClick={() => setCloseOrOpenConfigurator(!closeOrOpenConfigurator)} />

            {closeOrOpenConfigurator ?
                <div className="left_nav ">

                    {/* pt-4 mt-5 */}
                    <div className=" col-8  ml-1 mt-4">
                        {/* <img src={require('../../../img/logo-hub.png')}></img> */}
                        {/* <div onClick={props.openConfigurator} >
                        <img className="ml-4 my-2" src={require('../../../img/menu.png')}></img>
                    </div> */}

                    </div>
                    <ul className="list_config ">
                        <li className="li-back" onDrag onClick={(e) => changeBackground(e.target)}>
                            <img className="mr-2" src={require('../../../img/workspace.svg')}></img>
                    My Workspace </li>
                        {/* id='myWorkspace' */}
                        {/* <li onDrop onClick={(e) => changeBackground(e.target)}> */}
                        <li id='allProjects' onClick={(e) => goToAllProjects(e.target)}>
                            <img className="mr-2" src={require('../../../img/bag-check.svg')}></img>
                        All Projects</li>
                        <li id='myTask' onClick={(e) => goToMyTasks(e.target)}>
                            <img className="mr-2" src={require('../../../img/flag-alt.svg')}></img>
                        My Tasks</li>
                        <li onClick={(e) => goToMilestones(e.target)}>
                            <img className="mr-2" src={require('../../../img/flag-alt.svg')}></img>
                        Milestones</li>
                        {/* <li onClick={(e) => changeBackground(e.target)}>
                        <img className="mr-2" src={require('../../../img/form-line.svg')}></img>
                        Forms</li> */}
                        {/* <li onClick={(e) => changeBackground(e.target)}>
                        <img className="mr-2" src={require('../../../img/mail-open-outline.svg')}></img>
                        Email</li> */}
                        <li onClick={(e) => goToGantt(e.target)}>
                            <img className="mr-2" src={require('../../../img/users-solid.svg')}></img>
                        Gantt</li>

                        <li onClick={(e) => changeBackground(e.target)}>
                            <img className="mr-2" src={require('../../../img/users-solid.svg')}></img>
                        Members <p className="soon px-1 ml-1">soon</p></li>

                    </ul>


                </div>
                :
                null}
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
