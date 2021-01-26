import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
// import  ViewTask  from '../viewTask/viewTask'
import ViewTaskByCrad from '../viewTaskByCard/viewTaskByCrad'

function TasksByCard(props) {
    useEffect(() => {
      
            console.log( "cardId",props.cardId);
            props.getTasksByCard(props.cardId)
            console.log(props.tasks);
        
    })
    const renderTasksByCrad = props.tasks.map((task) => {
        console.log(task);
        return <ViewTaskByCrad key={task._id} task={task}></ViewTaskByCrad>
    })
    return (
        <>
            <h1>hi</h1>
            <div>{renderTasksByCrad}</div>
        </>
    )
}
export default connect(
    (state) => {
        return {
            tasks: state.public_reducer.tasks,
            // task:state.task_reducer.task
        }
    },
    (dispatch) => {
        return {
            getTasksByCard: (cardId) => dispatch(actions.getTasksByCard(cardId))
        }
    }
)(TasksByCard)