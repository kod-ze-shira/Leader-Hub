// import React, { useState, useEffect, useParams } from 'react'
// import { connect } from 'react-redux'
// import { actions } from '../../../redux/actions/action'
// import CardsByProject from '../Cards/cardsByProject/cardsByProject';
// // import './projectPlatform.css'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import ToastDelete from '../toastDelete/toastDelete1';
// import viewCards from '../Cards/viewCards/viewCards';
// import ViewCardsTabs from './viewCardsTabs';


// function Tabs(props) {

//     useEffect(() => {
//         {

//         };
//     });


//     return (
//         <>

//                 {/* {props.cards.map((card, index) => { */}
//                 {/* key={card._id} card={card} */}
//                   <ViewCardsTabs />
//                 {/* // })} */}
//         </>
//     )
// }
// const mapStateToProps = (state) => {
//     return {
//         cards: state.public_reducer.cards,


//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
//         getCardsOfProject: (projectId) => dispatch(actions.getCardsOfProject(projectId)),

//     }


// }
// export default connect(mapStateToProps, mapDispatchToProps)(Tabs)

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import ViewCardsTabs from './viewCardsTabs'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function Tabs(props) {

    useEffect(() => {

    }, [props.projectId])


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

    function onDragEndׂ(e) {
        let iSourse, iDestination
        console.log(e.destination.droppableId)
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

    };
    function onDragEndׂCard(e) {
        console.log(e)
    }
    return (
        <>
            <DragDropContext onDragEnd={(e) => onDragEndׂCard(e)}>
                <Droppable droppableId={props.cards[0]._id} >
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <div className="body">
                                <div className="row mx-3">
                                    {props.cards.length ?
                                        <DragDropContext onDragEnd={(e) => onDragEndׂ(e)}>
                                            {props.cards.map((card, index) => {
                                                return <ViewCardsTabs key={card._id} cardFromMap={card} index={index} />
                                            })}
                                        </DragDropContext>
                                        : null
                                    }
                                </div>
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

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
)(Tabs)
