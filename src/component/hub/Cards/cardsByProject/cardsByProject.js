import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewCards from '../viewCards/viewCards'
import './cardsByProject.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function CardsByProject(props) {

    useEffect(() => {

    }, [props.projectId, props.cards])

    const viewCardsByProject = props.cards.map((card) => {
        return <ViewCards key={card._id} cardFromMap={card} flag={props.flag} />
    })
    function onDragEndׂ(e) {
        const replace = [e.source.index, e.destination.index]
        props.changeTaskplace(replace)

    };
    // function onDragStart(e) {
    //     console.log(e)
    // };
    return (
        <>

            <DragDropContext onDragEnd={(e) => onDragEndׂ(e)}
            // onDragStart={(e) => onDragStart(e)}
            >
                {props.cards.map(card => {
                    return <ViewCards key={card._id} cardFromMap={card} flag={props.flag} />
                })}
            </DragDropContext>
            {/* {viewCardsByProject} */}
        </>
    )
}



export default connect(
    (state) => {
        return {

            cards: state.public_reducer.cards,
            // project: state.project_reducer.project,
            // user: state.public_reducer.userName
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