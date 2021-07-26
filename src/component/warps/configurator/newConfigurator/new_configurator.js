import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions } from '../../../../redux/actions/action'
import $ from 'jquery';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './new_configurator.css';
import NumberOfNotShowShareProjects from '../numberOfNotShowShareProjects/numberOfNotShowShareProjects'

function NewConfigorator(props) {
    const [closeOrOpenConfigurator, setCloseOrOpenConfigurator] = useState(true)

    // checkTheUrl()
    // function checkTheUrl() {
    $(document).ready(function () {
        if (window.location.href.indexOf('workspace') !== -1) {
            $("li").removeClass("li-back")
            $(`img`).removeClass("li-back")
        }
        else
            if (window.location.href.indexOf('allProjects') !== -1) {
                $("li").removeClass("li-back")
                $(`#allProjects`).addClass("li-back")
                $(`#allProjects img`).removeClass("li-back")

            } else {
                if (window.location.href.indexOf('myTasks') !== -1) {
                    $("li").removeClass("li-back")
                    $(`#myTask`).addClass("li-back")
                    $(`#myTask img`).removeClass("li-back")
                } else {
                    if (window.location.href.indexOf('milestones') !== -1) {
                        $("li").removeClass("li-back")
                        $(`#milstones`).addClass("li-back")
                        $(`#milstones img`).removeClass("li-back")
                    }
                }

            }
    })

    const changeBackground = (e) => {
        props.history.push("/" + props.user + "/hub")
        $(document).ready(function () {
            $("li").removeClass("li-back")
            $(e).addClass("li-back")
            $('img').removeClass("li-back")
        })
    }

    const closeConfigurator = (e) => {
        setCloseOrOpenConfigurator(!closeOrOpenConfigurator)
        props.openOrClose(closeOrOpenConfigurator)
    }
    function goToAllProjects(e) {
        changeBackground(e)
        if (props.sharedProjects.filter(shareProject => shareProject.ifShow === false).length > 0)
            props.setIfShowShareProjectsToTrue()
        props.history.push("/" + props.user + "/hub/allProjects")
    }
    function goToMyTasks(e) {
        changeBackground(e)
        props.history.push("/" + props.user + "/hub/myTasks")
    }
    function goToMilestones(e) {
        changeBackground(e)
        props.history.push("/" + props.user + "/hub/milestones")
    }
    // function goToGantt(e) {
    //     changeBackground(e)
    //     props.history.push("/" + props.user + "/gantt")
    // }
    return (
        <>
            {/* <div>
                <FontAwesomeIcon title="Close menu"
                    icon={["fas", "bars"]} className='closeConfigurator' onClick={(e) => closeConfigurator(e)
                    } />

            </div> */}
            {closeOrOpenConfigurator ?
                <div className="left_nav ">

                    {/* pt-4 mt-5 */}
                    {/* <div className=" col-8"> */}
                    {/* <img src={require('../../../img/logo-hub.png')}></img> */}
                    {/* <div onClick={props.openConfigurator} >
                        <img className="ml-4 my-2" src={require('../../../img/menu.png')}></img>
                    </div> */}

                    {/* </div> */}
                    <ul className="list_config ">
                        <li id='li-back' className='li-back' onClick={(e) => changeBackground(e.target)}>
                            <img className="mr-2" src={require('../../../../assets/img/workspace.svg')}></img>
                            <p>My Workspaces</p>
                        </li>
                        <li id='allProjects' onClick={(e) => goToAllProjects(e.target)}>
                            <img className="mr-2" src={require('../../../../assets/img/bag-check.svg')}></img>
                            <p>All Projects</p>
                            <NumberOfNotShowShareProjects />
                        </li>
                        <li id='myTask' onClick={(e) => goToMyTasks(e.target)}>
                            <FontAwesomeIcon
                                className="mr-2" icon={["fas", "tasks"]}
                            />
                            <p>My Tasks</p>
                        </li>
                        <li id='milestone' onClick={(e) => goToMilestones(e.target)}>
                            <img className="mr-2" src={require('../../../../assets/img/flag-alt.svg')}></img>
                            <p>Milestones</p>
                        </li>

                        {/* <li onClick={(e) => changeBackground(e.target)}>
                        <img className="mr-2" src={require('../../../img/mail-open-outline.svg')}></img>
                        Email</li> */}
                        {/* <li onClick={(e) => changeBackground(e.target)} >
                            <img className="mr-2" src={require('../../../img/users-solid.svg')}></img>
                        Members <p className="soon px-1 ml-1">soon</p></li> */}

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
        sharedProjects: state.public_reducer.sharedProjects//to know if has objects that yet not show
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setIfShowShareProjectsToTrue: () => dispatch(actions.setIfShowShareProjectsToTrue())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewConfigorator))

