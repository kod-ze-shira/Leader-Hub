import React, { useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewCards from '../viewCards/viewCards'
import './cardsByProject.css'

function CardsByProject(props) {

    useEffect(() => {
        // props.getCardsByProjectId(props.projectId)

    }, [props.projectId])
    useEffect(() => {
        // props.getCardsByProjectId(props.projectId)
    }, [])

    // function onDragEndׂ(e) {
    //     let iSourse, iDestination
    //     if (e.destination) {
    //         console.log(e.destination.droppableId, e.source.droppableId)
    //         for (iSourse = 0; iSourse < props.cards.length; iSourse++) {
    //             if (props.cards[iSourse]._id == e.source.droppableId)
    //                 break
    //         }
    //         for (iDestination = 0; iDestination < props.cards.length; iDestination++) {
    //             if (props.cards[iDestination]._id == e.destination.droppableId)
    //                 break
    //         }
    //         console.log(e.source.index, e.destination.index, " ", iSourse, iDestination)
    //         const replace = [e.source.index, e.destination.index, iSourse, iDestination]
    //         props.changeTaskplace(replace)
    //     }

    // };

    // function onDragEndׂ(e) {
    //     if (e.source.droppableId && e.destination) {


    //         let iSourse, iDestination
    //         let iCardTo, iCardFrom;
    //         for (iSourse = 0; iSourse < props.cards.length; iSourse++) {
    //             if (props.cards[iSourse]._id == e.source.droppableId) {
    //                 iCardFrom = props.cards[iSourse]._id;
    //                 break
    //             }
    //         }
    //         for (iDestination = 0; iDestination < props.cards.length; iDestination++) {
    //             if (props.cards[iDestination]._id == e.destination.droppableId) {
    //                 iCardTo = props.cards[iDestination]._id;
    //                 break

    //             }
    //         }
    //         // console.log(e.source.index, e.destination.index, iSourse, iDestination)
    //         const replace = [e.source.index, e.destination.index, iSourse, iDestination]
    //         // const replace = [iSourse, iDestination]
    //         // /: taskId/:cardId/dragTaskFromCardToCard‏
    //         props.changeTaskplace(replace)
    //         const replaceIServer = [e.draggableId, iCardFrom, iCardTo]
    //         props.moveTaskBetweenCards(replaceIServer)

    //         // }
    //     }
    // };

    function onDragEndׂ(e) {

        if (e.source.droppableId && e.destination) {
            // if (props.cards.find(card => card._id == e.draggableId)) {
            //     onDragEndׂCard(e)
            // }
            // else {

            let iSourse, iDestination
            let iCardTo, iCardFrom;
            for (iSourse = 0; iSourse < props.cards.length; iSourse++) {
                if (props.cards[iSourse]._id == e.source.droppableId) {
                    iCardFrom = props.cards[iSourse]._id;
                    break
                }
            }
            for (iDestination = 0; iDestination < props.cards.length; iDestination++) {
                if (props.cards[iDestination]._id == e.destination.droppableId) {
                    iCardTo = props.cards[iDestination]._id;
                    break
                }
            }
            let replace = [e.source.index, e.destination.index, iSourse, iDestination]
            props.changeTaskplace(replace)

            const replaceIServer = [e.draggableId, iCardFrom, iCardTo, iSourse, iDestination]
            if (replace[2] == replace[3])
                props.dragTask(iSourse)
            else
                props.moveTaskBetweenCards(replaceIServer)
            // }
        }
    };
    return (
        <>
            {props.cards.length ?
                <DragDropContext onDragEnd={(e) => onDragEndׂ(e)}>
                    {props.cards.map((card, index) => {
                        return <ViewCards
                            viewToastComplete={props.viewToastComplete}
                            showToastDelete={(object) => props.showToast(object)}
                            viewContactList={props.viewContactList}
                            key={card._id}
                            cardFromMap={card} flag={props.flag} indexCard={index} />
                    })}
                </DragDropContext>
                :
                <div className="logoGif"><img src={require('../../../img/hub.gif')} /></div>}
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
            changeTaskplace: (obj) => dispatch(actions.changeTaskplace(obj)),
            dragTask: (cardOfTask) => dispatch(actions.dragTask(cardOfTask)),
            moveTaskBetweenCards: (taskAndCard) => dispatch(actions.moveTaskBetweenCards(taskAndCard)),

        }
    }
)(CardsByProject)