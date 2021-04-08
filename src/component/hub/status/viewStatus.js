import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
// import ViewDetails from '../../viewDetails/viewDetails'
import './viewAllStatuses.css'
// import EditStatus from './editStatus'
import EditStatus from './editStatus'

function ViewAllStatuses(props) {

    useEffect(() => {
        
        // props.getAllStatusesTaskForUser()
    }, []);


    // useEffect(() => {
    //     // debugger
    //     // console.log(props.statuses);
    // }, [props.statuses])
    const [viewEditStatus, setViewEditStatus] = useState(false)
    const [viewAddStatus, setViewAddStatus] = useState(true)

    const openEditStatus = () => {
       
        setViewAddStatus(!viewAddStatus)
        // alert(viewAddStatus)
        setViewEditStatus(true)

    }

    return (

        <>
            <div className="container" >
                {viewAddStatus ?
                    <div className="row justify-content-around" onClick={props.changeStatusOfTask(props.status._id)}>
                        <div className="menu-status " style={{ backgroundColor: props.status.color }}>
                            <p >{props.status.statusName}</p>
                            {/* onClick={(event) => editStatus(props.myProject.project, event)} */}
                            {/* style={myStyleIcons} */}

                        </div>
                        <img
                            // onClick={props.changeStatus(props.status._id)}
                            onClick={openEditStatus}
                            src={require('../../img/pencil-write.svg')} />
                    </div>
                    : null}
                {
                    viewEditStatus ?
                        <EditStatus status={props.status} />
                        : null
                }
            </div>
            {/* {props.statuses.length && renderedListStatuses} */}
        </>

    )

}
const mapStateToProps = (state) => {

    return {
        // statuses: state.status_reducer.statuses
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // setStatus:(status)=>dispatch(actions.setStatus(status))
        // getAllStatusesTaskForUser: () => dispatch(actions.getAllStatusesTaskForUser()),
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllStatuses)