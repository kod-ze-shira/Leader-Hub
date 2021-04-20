import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import EditStatus from './editStatus'
// import ViewDetails from '../../viewDetails/viewDetails'
import './viewAllStatuses.css'


function ViewAllStatuses(props) {

    useEffect(() => {
    }, [])

    const [openPopUpToEdit, setOpenPopUpToAdd] = useState(false)

    const openEditTask = () => {
        setOpenPopUpToAdd(true)
        console.log("openEditTask", openPopUpToEdit);

    }
    return (

        <>
            <div className="container">
                <div className="row justify-content-around">
                    <div className="menu-status " style={{ backgroundColor: props.status.color }}>
                        <p >{props.status.statusName}</p>
                        {/* onClick={(event) => editStatus(props.myProject.project, event)} */}
                        {/* style={myStyleIcons} */}

                    </div>
                    <img
                        // onClick={props.changeStatus(props.status._id)}
                        onClick={openEditTask}
                        src={require('../../img/pencil-write.svg')} />
                </div>
            </div>

            {openPopUpToEdit ? <EditStatus status={props.status} /> : null}
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
        // getAllStatusesTaskForUser: () => dispatch(actions.getAllStatusesTaskForUser()),
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllStatuses)