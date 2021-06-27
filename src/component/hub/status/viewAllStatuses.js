import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import AddStatus from './addStatus'
import ViewStatus from './viewStatus'
import './viewStatus.css'


function ViewAllStatuses(props) {

    useEffect(() => {
        console.log(props.task._id);
        console.log(props.statuses);
        console.log(props.status);

    }, [props.cards])

    const [openPopUp, setOpenPopUp] = useState(props.openPopUp)
    const [openPopUpToAdd, setOpenPopUpToAdd] = useState(false)
    const [status, setStatus] = useState()


    const openPopUpStatus = (e) => {
        // setOpenPopUp(!openPopUp)
        if (openPopUpToAdd === true)
            setOpenPopUpToAdd(!openPopUpToAdd)
    }
    const openAddStatus = (e) => {
        setOpenPopUpToAdd(!openPopUpToAdd)
        setOpenPopUp(!openPopUp)
        e.stopPropagation()
    }
    const saveStatus = (value) => {
        // if (!props.task.complete) {
        let editStatusInRedux
        editStatusInRedux = { "nameFiled": "status", "value": value }
        if (props.task.complete)
            editStatusInRedux = { "nameFiled": "complete", "value": false }
        props.setTaskByFiledFromTasks(editStatusInRedux)

        // }
    }

    const changeStatusByIndex = (indexOfStatus) => {
        let s = props.statuses[indexOfStatus]
        if (s.complete === false)
            setStatus(s)

    }
    const closePopUpOfViewStatus = () => {
        openPopUp(false)
    }
    const top = props.topContactList + props.heightContactsList < props.heightCurrentScreen ? props.topContactList - 5 : props.topContactList - 50;
    const height = props.topContactList + props.heightContactsList < props.heightCurrentScreen ? props.heightContactsList : props.heightContactsList - 200
    const left = props.leftContactList + props.widthContactsList < props.widthCurrentScreen ? props.leftContactList : props.widthCurrentScreen - 350
    const width = props.leftContactList + props.widthContactsList < props.widthCurrentScreen ? props.widthContactsList : props.widthContactsList

    return (

        <>
            <div className={props.hub ? "view-list-status-from-platform" : null}
                style={{ "width": props.hub ? width : 300, "height": props.hub ? height : 200, "left": props.hub ? left : 60, "top": props.hub ? top : 410 }}>

                <div className={openPopUp || openPopUpToAdd ? "menu__" : ""}  >
                    <div className="status-list">
                        {openPopUp && props.statuses.length ?
                            props.statuses.map((status, index) => (

                                < ViewStatus saveStatus={(e) => saveStatus(e)}
                                    changeStatus={changeStatusByIndex}
                                    status={status} index={index}
                                    openPopUp={props.openPopUp}
                                    fromHub={props.hub}
                                />
                            ))
                            : null}
                        {openPopUp && !props.hub ?
                            // <div className="container">
                            <button onClick={(e) => openAddStatus(e)} className="ml-3 create-label">Create New Status</button>
                            // </div>
                            : null}
                        {openPopUpToAdd ? <AddStatus task={props.task} status={props.status} /> : null}
                    </div>
                </div>
            </div>
        </>

    )

}
const mapStateToProps = (state) => {

    return {
        statuses: state.status_reducer.statuses,
        cards: state.public_reducer.cards,
        leftContactList: state.design_reducer.leftContactList,
        topContactList: state.design_reducer.topContactList,
        heightCurrentScreen: state.design_reducer.heightCurrentScreen,
        widthCurrentScreen: state.design_reducer.widthCurrentScreen,
        widthContactsList: state.design_reducer.widthContactsList,
        heightContactsList: state.design_reducer.widthContactsList,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveIndexOfStatusInRedux: (index) => dispatch(actions.saveIndexOfStatusInRedux(index)),
        createStatus: (status) => dispatch(actions.createStatus(status)),
        setTaskByFiledFromTasks: (taskDetails) => dispatch(actions.setTaskByFiledFromTasks(taskDetails))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllStatuses)