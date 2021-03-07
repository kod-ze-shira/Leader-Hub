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
    return (
        <>
            <div className="body">
                <div className="row mx-3">
                    {props.cards.length ?
                        props.cards.map((card) => {

                            return <ViewCardsTabs key={card._id} cardFromMap={card} />
                        })
                        : null
                    }
                </div>
            </div>
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
