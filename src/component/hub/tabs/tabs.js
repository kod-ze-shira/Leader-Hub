

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import ViewCardsTabs from './viewCardsTabs'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './tabs.css'
function Tabs(props) {

    useEffect(() => {

    }, [props.projectId])
    const [projectId, setProjectId] = useState()
    const [viewCardsByProject, setViewCardsByProject] = useState(false)
    const [workspaceId, setWorkspaceId] = useState()
    const [showInput, setShowInput] = useState(false)
    const [showToastDelete, setShowToastDelete] = useState(false)
    const [taskDeleted, setTaskDeleted] = useState()
    const [cardDeleted, setCardDeleted] = useState()
    const [taskOrCard, setTaskOrCard] = useState()
    const [showDetails, setShowDetails] = useState(false)
    const [inputValue, setInputValue] = useState()
    const [showHeader, setShowHeader] = useState(false)

    function onDragEndׂ(e) {
        if (props.cards.find(card => card._id == e.draggableId))
            onDragEndׂCard(e)
        else {
            let iSourse, iDestination
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
    function onDragEndׂCard(e) {
        let icard
        for (icard = 0; icard < props.cards.length; icard++)
            if (props.cards[icard]._id == e.destination.droppableId)
                break
        const replace = [e.source.index, icard]
        props.changeCardPlace(replace)
    }

    const updateInputValue = (evt) => {
        setInputValue(evt.target.value)
    }
    const showInputToAddCard = () => {
        setShowInput(!showInput)
        setShowHeader(!showHeader)

    }
    const newCard = () => {
        let card;
        if (inputValue) {
            card = { "project": props.project._id, name: inputValue }
            props.newCard(card)
        }
        setInputValue("")
        setShowInput(false)
    }
    return (
        <>
            {/* לא מגיע אל הפונקציה הזאת בדרופ */}

            <DragDropContext onDragEndׂ={(e) => onDragEndׂCard(e)}>
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
                                    <div className="col-3 mt-4">
                                        <div className="view-cards-tabs">
                                            <div class="card " >
                                                <div class="container">
                                                    <div class="card-header row">
                                                        {showInput ?
                                                            <input placeholder={"New Card"} value={inputValue} onChange={updateInputValue} className="form-control " onKeyPress={event => {
                                                                if (event.key === 'Enter') {
                                                                    newCard()
                                                                }
                                                            }}></input>
                                                            : null
                                                        }
                                                    </div>
                                                </div>

                                                <div class="card-body">
                                                    <a className="add-card-btn" onClick={showInputToAddCard}>Add Card+</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
            projects: state.project_reducer.projects,
            user: state.public_reducer.userName,
            workspaces: state.public_reducer.worksapces,
            workspace: state.workspace_reducer.worksapce,
            project: state.project_reducer.project,
        }
    },
    (dispatch) => {
        return {
            getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
            getCardsOfProject: (projectId) => dispatch(actions.getCardsOfProject(projectId)),
            changeTaskplace: (obj) => dispatch(actions.changeTaskplace(obj)),
            changeCardPlace: (obj) => dispatch(actions.changeCardPlace(obj)),
            removeCardById: (cardId) => dispatch(actions.removeCardById(cardId)),
            removeTaskById: (taskId) => dispatch(actions.removeTaskById(taskId)),
            getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace)),
            getAllWorkspacesFromServer: () => dispatch(actions.getAllWorkspacesFromServer()),
            getAllWorkspaces: () => dispatch(actions.getAllWorkspaces()),
            newCard: (cardname) => dispatch(actions.newCard(cardname)),

        }
    }
)(Tabs)
