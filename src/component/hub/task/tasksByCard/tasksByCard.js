import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
// import  ViewTask  from '../viewTask/viewTask'
import ViewTaskByCrad from '../viewTaskByCard/viewTaskByCrad'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function TasksByCard(props) {
    useEffect(() => {

        console.log("cardId", props.cardId);
        props.getTasksByCardId(props.cardId)
        console.log("tasks", props.task);

    }, [props.cardId])

    const renderTasksByCrad = props.tasks.map((task, index) => {
        console.log(task);
        return <Draggable key={task._id} draggableId={task._id} index={index}>
            {(provided) => (
                    <ViewTaskByCrad  key={task._id} task={task} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} />
            )}
        </Draggable>
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