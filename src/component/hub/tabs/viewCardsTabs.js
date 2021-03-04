import React, { useState, useEffect, useParams } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import CardsByProject from '../Cards/cardsByProject/cardsByProject';
// import './projectPlatform.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ToastDelete from '../toastDelete/toastDelete1';
import viewCards from '../Cards/viewCards/viewCards';


function ViewCardsTabs(props) {

    useEffect(() => {
    }, [props.card])


    return (
        <>
            <div className="body container-fluid">
                <div class="card" style="width: 18rem;">
                    <div class="card-header">
                        {props.card.name}
                    </div>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        cards: state.public_reducer.cards,
        project: state.project_reducer.project,
        card: state.card_reducer.card,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
        getCardsOfProject: (projectId) => dispatch(actions.getCardsOfProject(projectId)),

    }


}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCardsTabs)