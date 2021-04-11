

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import ViewCardsTabs from './viewCardsTabs'
import ViewDetails from '../viewDetails/viewDetails'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './tabs.css'
import $ from "jquery"
import taskDetails from '../task/taskDetails/taskDetails'
function Tabs(props) {

    useEffect(() => {

    }, [props.projectId])

    const [showInput, setShowInput] = useState(false)
    const [inputValue, setInputValue] = useState()
    const [showHeader, setShowHeader] = useState(false)
    const [viewDetails, setViewDetails] = useState(false)
    const [taskToDetails, setTaskToDetails] = useState("")


    function onDragEndׂ(e) {
        if (e.source.droppableId && e.destination) {
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
        // let headerHeight = document.getElementsByClassName("add-card").style.height
        // let headerHeight =  $("#add-card").height()
        // console.log(headerHeight)
        setShowInput(!showInput)
        setShowHeader(!showHeader)
        // document.getElementById('newCardInput').style.display = 'block'
        $('#newCardInput').removeClass('noneNewCard')
        $('#newCardInput').addClass('blockNewCard')


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
    const openViewDetails = (task) => {
        setViewDetails(true)
        setTaskToDetails(task)
    }
    return (
        <><div className="body">
            {/* לא מגיע אל הפונקציה הזאת בדרופ */}
            {props.cards.length ?
                <DragDropContext onDragEndׂ={(e) => onDragEndׂCard(e)}>
                    <Droppable droppableId={props.cards[0]._id} >
                        {provided => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                <div className="wraperr-tabs">
                                    <div className="row row mx-3">
                                        <DragDropContext onDragEnd={(e) => onDragEndׂ(e)}>
                                            {props.cards.map((card, index) => {
                                                return <ViewCardsTabs openViewDetails={(task) => openViewDetails(task)}
                                                    showToast={(obj) => props.showToast(obj)}
                                                    key={card._id} cardFromMap={card} index={index} />
                                            })}
                                        </DragDropContext>
                                        <div className="col-3 mt-4" >
                                            <div className="view-cards-tabs mt-1" >
                                                <div class="card " >
                                                    <div id='newCardInput' class="container noneNewCard" >
                                                        {showInput ?
                                                            <div
                                                                class="card-header row">
                                                                <input autoFocus="true" placeholder={"New Card"} value={inputValue} onChange={updateInputValue} className="form-control " onKeyPress={event => {
                                                                    if (event.key === 'Enter') {
                                                                        newCard()
                                                                    }
                                                                }}></input>
                                                            </div>
                                                            : null}
                                                    </div>
                                                    <div className="card-body " id={!showInput ? "add-card" : ""}>
                                                        <a className="add-card-tabs" onClick={showInputToAddCard}>Add Card+</a>

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
                : null
            }
            {viewDetails ?
                <div className="closeDet" >
                    <ViewDetails closeViewDetails={() => setViewDetails(false)}
                        from={"viewTaskByCard"} task={taskToDetails} open={true}> </ViewDetails>
                </div>
                : null}
        </div>

        </>
    )
}



export default connect(
    (state) => {
        return {
            cards: state.public_reducer.cards,
            projects: state.project_reducer.projects,
            user: state.public_reducer.userName,
            workspaces: state.public_reducer.workspaces,
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
