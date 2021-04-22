import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewCards from '../viewCards/viewCards'
import './cardsByProject.css'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function CardsByProject(props) {

    useEffect(() => {
        // props.getCardsByProjectId(props.projectId)

    }, [props.projectId])


    function onDragEndׂ(e) {
        let iSourse, iDestination
        if (e.destination) {
            console.log(e.destination.droppableId, e.source.droppableId)
            for (iSourse = 0; iSourse < props.cards.length; iSourse++) {
                if (props.cards[iSourse]._id == e.source.droppableId)
                    break
            }
            for (iDestination = 0; iDestination < props.cards.length; iDestination++) {
                if (props.cards[iDestination]._id == e.destination.droppableId)
                    break
            }
            console.log(e.source.index, e.destination.index, " ", iSourse, iDestination)
            const replace = [e.source.index, e.destination.index, iSourse, iDestination]
            props.changeTaskplace(replace)
        }

    };
    return (
        <>
            {props.cards.length ?
                <DragDropContext onDragEnd={(e) => onDragEndׂ(e)}>
                    {props.cards.map((card, index) => {
                        return <ViewCards showToastDelete={(object) => props.showToast(object)} key={card._id} 
                        cardFromMap={card} flag={props.flag} indexCard={index} />
                    })}
                </DragDropContext>
                : null}
        </>
    )
}



export default connect(
    (state) => {
        return {
            cards: state.public_reducer.cards,
        }
    },
    (dispatch) => {
        return {
            getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
            getCardsOfProject: (projectId) => dispatch(actions.getCardsOfProject(projectId)),
            changeTaskplace: (obj) => dispatch(actions.changeTaskplace(obj))
        }
    }
)(CardsByProject)