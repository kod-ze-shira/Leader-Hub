import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import EditStatus from './editStatus'
import './viewStatus.css'
import $ from 'jquery'
import AddStatus from './addStatus'
import ViewStatus from './viewStatus'
import './viewStatus.css'


function ViewAllStatuses(props) {

    useEffect(() => {
        debugger
        console.log(props.task._id);
        props.getAllStatusesTaskForWorkspace(props.task._id);
        console.log(props.statuses);
        console.log(props.status);
    }, [props.cards])

    const [openPopUp, setOpenPopUp] = useState(props.openPopUp)
    const [openPopUpToAdd, setOpenPopUpToAdd] = useState(false)
    const [status, setStatus] = useState()


    const openPopUpStatus = (e) => {
        // setOpenPopUp(!openPopUp)
        if (openPopUpToAdd == true)
            setOpenPopUpToAdd(!openPopUpToAdd)
    }
    const openAddStatus = (e) => {
        setOpenPopUpToAdd(!openPopUpToAdd)
        setOpenPopUp(!openPopUp)
    }
    const saveStatus = (value) => {
        let editStatusInRedux = { "nameFiled": "status", "value": value }
        props.setTaskByFiledFromTasks(editStatusInRedux)
    }
    const changeStatusByIndex = (indexOfStatus) => {
        let s = props.statuses[indexOfStatus]
        setStatus(s)
        let a = props.status.statusName
        console.log(a)
    }
    const closePopUpOfViewStatus = () => {
        openPopUp(false)
    }

    return (

        <>

            <div className={openPopUp || openPopUpToAdd ? "menu__" : ""}>
                <div className="status-list">
                    {openPopUp && props.statuses.length ? props.statuses.map((status, index) => (
                        <ViewStatus saveStatus={(e) => saveStatus(e)}
                            changeStatus={changeStatusByIndex}
                            status={status} index={index}
                        // openPopUp={closePopUpOfViewStatus} 
                        />
                    )) : null}
                    {openPopUp ?
                        <button onClick={(e) => openAddStatus(e)} className="ml-3 create-label">Create New Status</button>
                        : null}
                    {openPopUpToAdd ? <AddStatus task={props.task} status={props.status} /> : null}
                </div>
            </div>
        </>

    )

}
const mapStateToProps = (state) => {

    return {
        statuses: state.status_reducer.statuses,
        cards: state.public_reducer.cards,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllStatusesTaskForWorkspace: (taskId) => dispatch(actions.getAllStatusesTaskForWorkspace(taskId)),
        saveIndexOfStatusInRedux: (index) => dispatch(actions.saveIndexOfStatusInRedux(index)),
        createStatus: (status) => dispatch(actions.createStatus(status)),
        setTaskByFiledFromTasks: (taskDetails) => dispatch(actions.setTaskByFiledFromTasks(taskDetails))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllStatuses)