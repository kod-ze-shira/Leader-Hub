import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'

import './BodyOfAssignmentTask.css'


function BodyEmailOfAssignmentTask(props) {

    // useEffect(() => {

    // }, [])



    return (
        <>
            <div className="container">
                <div className="col align-self-center">
                    <img src={require('../../img/border-top-email.png')}
                    ></img>
                    <div className="body-email-assingTo ">
                        <div className="col align-self-cente mt-3">
                            {/* תמונת לוגו פרויקט */}
                            <img className=" logo-workspace-email" src={require('../../img/logo-workspace-email.png')} ></img>
                            {/* שם הפרויקט */}
                            <div className="row justify-content-center">
                                <h1 className="col-12  name-workspace-email">Hub</h1>

                                <p className="col-12 mt-3">Hi dvira, You have shared with a</p>
                                <h2 className="col-12 r"> New task in Leader</h2>
                            </div>
                            <div className="container mb-5">
                                <div className="mt-5 w-75 row justify-content-md-center details-of-task">
                                    <div className="col-4 mt-5 title">workspase</div>
                                    <div className="col-4 mt-5 title">project</div>
                                    <div className="col-4 mt-5 title">card</div>
                                    <div className="col-4 mt-2 workspase-whith-logo">
                                        <span className="logo-of-w mr-2">a</span>
                                        <p>workspase</p>
                                    </div>
                                    <div className="project-logo col-4 mt-2">
                                        <div className="mr-2"></div>
                                        <p>project</p>
                                    </div>
                                    <div className="col-4 mt-2 card---"><p>card</p></div>
                                    <div className="col-10 mt-5 task-det">
                                        <p className="task-name">Task</p>
                                        <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipis</p>
                                    </div>
                                    <div className="col-10 mt-5 border-line"></div>
                                    <div className="col-12 mt-5">
                                        <div className="col-5 assigned-to">
                                            <img src={require('../../img/members.svg')}></img>
                                            <p className="ml-2">Assigned To</p>
                                        </div>
                                        <div className="col-5 mb-2 assigned-to">
                                            <img src={require('../../img/members.svg')}></img>
                                            <p className="ml-2">Due Date</p>
                                        </div>
                                        <div className="det col-5 mb-3">Yael Levi</div>
                                        <div className="det col-5 mb-3">21/03/2021</div>
                                    </div>
                                </div>
                            </div>
                            <button className='buttonNewProject'
                                data-tip data-for="add_p"
                            >Via in hub</button> 
                            <div className="mt-4 mb-0 details-email"></div>
                        </div>
                    </div>
                    <div className="pb-0 mb-0">
                        <img src={require('../../img/border-bottom-email.png')} ></img>
                    </div>
                </div>
            </div>
        </>

    )

}
const mapStateToProps = (state) => {

    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BodyEmailOfAssignmentTask)

// export default BodyEmailOfAssignmentTask(mapStateToProps, mapDispatchToProps)(BodyEmailOfAssignmentTask )