import React from 'react'
import { connect } from 'react-redux'

import './BodyOfAssignmentTask.css'


function BodyEmailOfAssignmentTask(props) {

    // useEffect(() => {

    // }, [])



    return (
        <>
            <div className="container">
                <img src={require('../../img/border-top-email.png')}
                ></img>
                <div className="body-email-assingTo ">
                    <div className="row justify-content-center">
                        {/* תמונת לוגו פרויקט */}
                        <img className=" logo-workspace-email" src={require('../../img/logo-workspace-email.png')} ></img>
                        {/* שם הפרויקט */}
                        <h1 className="col-12 align-self-center name-workspace-email">Hub</h1>

                        <p className="col-12 align-self-center">Hi dvira, You have shared with a</p>
                        <h2 className="col-12 align-self-center"> New task in Leader</h2>
                        <div className="details-email"></div>

                    </div>
                </div>
                <img src={require('../../img/border-bottom-email.png')} ></img>
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