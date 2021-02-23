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

    const renderTasksByCrad = props.tasks.map((task) => {
        console.log(task);
        return <ViewTaskByCrad key={task._id} task={task} />


    })
    console.log("props.cardId" + props.cardId)
    return (
        <>
            {/* onDragEnd={alert("hu")} */}
            <div>{renderTasksByCrad}</div>

            {/* <Droppable droppableId={props.cardId}>
                {provided => (
                    <div innerRef={provided.innerRef} {...provided.droppableProps}>
                        {props.tasks.map((task, index) => (
                            <ViewTaskByCrad key={task._id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable> */}
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