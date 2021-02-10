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
            <div className=" row justify-content-start card-name  mx-5 mt-4 pb-0">

                <div className="triangle ml-1 mt-3"></div>
                <button onClick={(e) => changeSelectedCard(e)} className="ml-2 p-2 show-card col-3 border-right">{props.card.name}</button>

                <p className="p-2 col ">Team</p>
                <p className=" p-2 border-left col">Label</p>
                <p className="p-2  border-left col">Due Date</p>
                <p className="p-2  border-left col"></p>
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
