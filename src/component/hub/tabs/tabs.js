import React, { useState, useEffect, useParams } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import CardsByProject from '../Cards/cardsByProject/cardsByProject';
// import './projectPlatform.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ToastDelete from '../toastDelete/toastDelete1';
import viewCards from '../Cards/viewCards/viewCards';
import ViewCardsTabs from './viewCardsTabs';


function Tabs(props) {

    useEffect(() => {
        {

        };
    }, [props.projectId]);


    return (
        <>
            <div className="body container-fluid">

                {props.cards.map((card, index) => {
                    return <ViewCardsTabs  key={card._id} card={card}  />
                })}
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        cards: state.public_reducer.cards,


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
        getCardsOfProject: (projectId) => dispatch(actions.getCardsOfProject(projectId)),

    }


}
export default connect(mapStateToProps, mapDispatchToProps)(Tabs)


