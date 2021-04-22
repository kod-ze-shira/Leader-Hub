import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import EditStatus from './editStatus'
// import ViewDetails from '../../viewDetails/viewDetails'
import './viewStatus.css'
import $ from 'jquery'


function ViewStatus(props) {

    useEffect(() => {
        debugger
        console.log(props.status);
    }, [])

    const [openPopUpToEdit, setOpenPopUpToEdit] = useState(false)


    const openEditTask = (event) => {
        debugger
        setOpenPopUpToEdit(true)
        props.saveIndexOfStatusInRedux(props.index)
        props.changeStatus(props.index)
        $('.display-task').css({ 'display': 'none' })
        console.log("openEditTask", openPopUpToEdit);

    }
    return (

        <>
            <div className="container display-task">
                <div className="" >
                    <div onClick={(id) => props.saveStatus(props.status)} className="menu-status " style={{ backgroundColor: props.status.color }}>
                        <p >{props.status.statusName}</p>
                    </div>
                   
                </div>
                <img
                        className="pencil-status "
                        onClick={(e) => openEditTask(e)}
                        src={require('../../img/pencil-write.svg')} />
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