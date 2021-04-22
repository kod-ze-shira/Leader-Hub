import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import EditStatus from './editStatus'
// import ViewDetails from '../../viewDetails/viewDetails'
import './viewStatus.css'


function ViewStatus(props) {

    useEffect(() => {
        console.log(props.status);
    }, [])

    const [openPopUpToEdit, setOpenPopUpToAdd] = useState(false)

    const openEditTask = (event) => {
        setOpenPopUpToAdd(true)
        props.saveIndexOfStatusInRedux(props.index)
        props.changeStatus(props.index)
        console.log("openEditTask", openPopUpToEdit);

    }
    return (

        <>
            <div className="container">
                <div className="row justify-content-around" onClick={(id) => props.saveStatus(props.status)}>
                    <div className="menu-status " style={{ backgroundColor: props.status.color }}>
                        <p >{props.status.statusName}</p>
                    </div>
                    <img
                        className="pencil-status"
                        onClick={(e) => openEditTask(e)}
                        src={require('../../img/pencil-write.svg')} />
                </div>
            </div>

            {openPopUpToEdit ? <EditStatus status={props.status} index={props.index} /> : null}
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
        saveIndexOfStatusInRedux: (index) => dispatch(actions.saveIndexOfStatusInRedux(index))
        // getAllStatusesTaskForUser: () => dispatch(actions.getAllStatusesTaskForUser()),
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(ViewStatus)