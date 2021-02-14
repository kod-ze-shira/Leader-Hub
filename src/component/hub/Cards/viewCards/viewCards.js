import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import './viewCards.css'
import history from '../../../history'
import TasksByCard from '../../task/tasksByCard/tasksByCard'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import tasksByCard from '../../task/tasksByCard/tasksByCard';


function ViewCards(props) {
    useEffect(() => {

    }, [])
    const [flag, setFlag] = useState(true)
    console.log("flag" + flag)
    const [cardId, setCardId] = useState("")

    const changeSelectedCard = (event) => {
        setCardId(props.cardFromMap._id)
        props.setCard(props.cardFromMap)
        if ( flag)
            setFlag(false)
        else
            setFlag(true)

    }

    console.log("reducer card " + props.card.name + " map card " + props.cardFromMap.name)
    return (
        <>
            <div className=" row justify-content-start card-name  mx-5 mt-4 pb-0">
                <button className=" show-card col-3 ml-2 mr-3" onClick={(e) => changeSelectedCard(e)}>
                    <div className="triangle mb-1"></div>
                    <div className="pl-2">{props.cardFromMap.name}</div>
                </button>
                <p className="p-2 col "></p>
                <p className=" p-2 border-left  col">Team</p>
                <p className="p-2  border-left col">Label</p>
                <p className="p-2  border-left col">Due Date</p>
            </div>
            <DragDropContext>
                <Droppable droppableId="characters">
                    {(provided) => (
                        /* ul */
                        props.card.name == props.cardFromMap.name  ? <TasksByCard className="characters" cardId={cardId}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            //   {...provided.droppableProps} 
                            ref={provided.innerRef} /> : null
                    )}
                </Droppable>
            </DragDropContext>

            {/* {flag ? <TasksByCard className="characters" cardId={cardId} /> : null} */}
        </>
    )
}
const mapStateToProps = (state) => {

    return {
        project: state.project_reducer.project,
        card: state.card_reducer.card,
        task: state.task_reducer.task
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCard: (card) => dispatch(actions.setCard(card))

        // getCardsByProjectId: () => dispatch(actions.getCardsByProjectId()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCards)
