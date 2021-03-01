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

    // const viewCardsByProject = props.cards.map((card) => {
    //     return <ViewCards key={card._id} cardFromMap={card} flag={props.flag} />
    // })

    function onDragEndׂ(e) {
        let i
        for (i = 0; i < props.cards.length; i++) {
            if (props.cards[i]._id == e.source.droppableId)
                break
        }
        console.log(e.source.index, e.destination.index, " ", i)
        const replace = [e.source.index, e.destination.index, i]
        props.changeTaskplace(replace)

    };
    return (
        <>
            {props.cards ?
                <DragDropContext onDragEnd={(e) => onDragEndׂ(e)}>
                    {props.cards.map((card, index) => {
                        return <ViewCards showToastDelete={(task) => props.showToast(task)} key={card._id} cardFromMap={card} flag={props.flag} index={index} />
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