import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import EditStatus from './editStatus'
// import ViewDetails from '../../viewDetails/viewDetails'
import './viewStatus.css'
import $ from 'jquery'


function ViewStatus(props) {
    useEffect(() => {

        console.log(props.status);

    }, [])
    const [openPopUpToEdit, setOpenPopUpToEdit] = useState(false)

    const openEditTask = (event) => {
        setOpenPopUpToEdit(true)
        props.saveIndexOfStatusInRedux(props.index)
        props.changeStatus(props.index)
        $('.display-task').css({ 'display': 'none' })
        console.log("openEditTask", openPopUpToEdit);
        event.stopPropagation()

    }
    const saveStatus1 = (id) => {
        props.saveStatus(props.status)
        if (props.status.statusName == props.statuses[2].statusName) {
            let editTaskInRedux = { "nameFiled": "complete", "value": true }
            props.setTaskByFiledFromTasks(editTaskInRedux)
            props.completeTask(props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask])
        }
    }
    return (
        <>
            <div className="container display-task ">
                <div className="row ml-2">
                    <div onClick={(id) => saveStatus1(id)} className="menu-status col-8 " style={{ backgroundColor: props.status.color }}>
                        <p >{props.status.statusName}</p>
                    </div>
                    <img
                        className={props.index < 3 ? "disabled pencil-status ml-2" : "pencil-status ml-2"}
                        title={props.index < 3?"Deputable status cannot be edited":"Edit Status"}
                        onClick={(e) => openEditTask(e)}
                        src={require('../../img/pencil-write.svg')} />
                </div>
            </div>

            {openPopUpToEdit ? <EditStatus openPopUp={props.openPopUp} status={props.status} index={props.index} /> : null}
        </>

    )

}
const mapStateToProps = (state) => {

    return {
        cards: state.public_reducer.cards,
        statuses: state.status_reducer.statuses,
        indexCurrentTask: state.public_reducer.indexCurrentTask,
        indexCurrentCard: state.public_reducer.indexCurrentCard,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveIndexOfStatusInRedux: (index) => dispatch(actions.saveIndexOfStatusInRedux(index)),
        completeTask: (task) => dispatch(actions.completeTask(task)),
        setTaskByFiledFromTasks: (taskDetails) => dispatch(actions.setTaskByFiledFromTasks(taskDetails)),

    }


}

export default connect(mapStateToProps, mapDispatchToProps)(ViewStatus)