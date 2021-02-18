import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import './viewCards.css'
import history from '../../../history'
import TasksByCard from '../../task/tasksByCard/tasksByCard'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import tasksByCard from '../../task/tasksByCard/tasksByCard';
import ViewTaskByCrad from '../../task/viewTaskByCard/viewTaskByCrad'

function ViewCards(props) {
    useEffect(() => {
        props.getTasksByCardId(props.cardFromMap._id)

    }, [props.flag])

    const [flag, setFlag] = useState(false)
    const [flagFromSelect, setFlagFromSelect] = useState(true)
    const [cardId, setCardId] = useState("")

    const changeSelectedCard = (event) => {
        setCardId(props.cardFromMap._id)

        // props.setCard(props.cardFromMap)
        // props.setTasks(props.card.tasks)
        // alert(props.flag + "  " + props.cardFromMap._id)

        if (props.flag == props.cardFromMap._id && flagFromSelect == true) {
            setFlagFromSelect(false)
        }
        else
            if (!flag && props.cardFromMap.tasks[0]) {
                setFlag(true)
                // alert("hi")
            }

            else {
                console.log(props.cardFromMap.tasks[0])
                setFlag(false)
            }
    }

    // alert("cardd task " + props.cardFromMap._id)
    return (
        <>
            <div className=" row justify-content-start card-name  mx-4 mt-4 pb-0">
                <button className=" show-card col-3  mr-3" onClick={(e) => changeSelectedCard(e)}>
                    <div className="triangle mb-1"></div>
                    <div className="pl-2">{props.cardFromMap.name}</div>
                </button>
                <p className=" col-4 "></p>
                <p className=" border-left  col pb-1">Team</p>
                <p className="  border-left col pb-1">Label</p>
                <p className="  border-left col pb-1">Due Date</p>
            </div>
            { props.flag == props.cardFromMap._id && flagFromSelect || flag ?
                <Droppable droppableId={props.card._id}>
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            {/* {props.cards.tasks.map() */}
                            {props.tasks.map((task, index) => (
                                <ViewTaskByCrad key={task._id} task={task} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable> : null}

            {/* { props.flag == props.cardFromMap._id && flagFromSelect || flag ?

                <TasksByCard className="characters" cardId={cardId} />
                : null
            } */}
        </>
    )
}
const mapStateToProps = (state) => {

    return {
        project: state.project_reducer.project,
        card: state.card_reducer.card,
        task: state.task_reducer.task,
        tasks: state.public_reducer.tasks,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setTasks: (task) => dispatch(actions.setTasks(task)),
        setCard: (card) => dispatch(actions.setCard(card)),
        getTasksByCardId: (cardId) => dispatch(actions.getTasksByCardId(cardId))

        // getCardsByProjectId: () => dispatch(actions.getCardsByProjectId()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCards)
