import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
// import  ViewTask  from '../viewTask/viewTask'
import ViewTaskByCrad from '../viewTaskByCard/viewTaskByCrad'
// import { InputGroup, FormControl,FormControlLabel } from 'react-bootstrap'


function TasksByCard(props) {
    useEffect(() => {

        console.log("cardId", props.cardId);
        props.getTasksByCardId(props.cardId)
        console.log("tasks", props.task);

    },[props,props.cardId])

    const renderTasksByCrad = props.tasks.map((task) => {
        console.log(task);
        return <ViewTaskByCrad key={task._id} task={task} />

    })
    return (
        <>
            <div>{renderTasksByCrad}</div>

        </>
    )
}
export default connect(
    (state) => {
        return {
            tasks: state.public_reducer.tasks,
            task: state.task_reducer.task
        }
    },
    (dispatch) => {
        return {
            getTasksByCardId: (cardId) => dispatch(actions.getTasksByCardId(cardId))
        }
    }
)(TasksByCard)