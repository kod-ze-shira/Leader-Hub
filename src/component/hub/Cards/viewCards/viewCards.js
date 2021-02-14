import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import './viewCards.css'
import history from '../../../history'
import TasksByCard from '../../task/tasksByCard/tasksByCard'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function ViewCards(props) {

    const [flag, setFlag] = useState(false)
    const [cardId, setCardId] = useState("")

    const changeSelectedCard = (event) => {
        setFlag(!flag)
        setCardId(props.card._id)

    }

    return (
        <>
            <div className=" row justify-content-start card-name  mx-2 mt-4 pb-0 ">
                <button className=" show-card col-3 ml-2 mr-3 pb-1" onClick={(e) => changeSelectedCard(e)}>
                    <div className="ml-2 triangle mb-1"></div>
                    <div className="pl-4">{props.card.name}</div>
                </button>
                <p className=" col-4 "></p>
                <p className=" border-left  col pb-1">Team</p>
                <p className="  border-left col pb-1">Label</p>
                <p className="  border-left col pb-1">Due Date</p>
            </div>
            <DragDropContext>
                <Droppable droppableId="characters">
                    {(provided) => (
                        /* ul */
                        flag ? <TasksByCard className="characters" cardId={cardId}
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
        // card: state.card_reducer.card

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // getCardsByProjectId: () => dispatch(actions.getCardsByProjectId()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCards)
