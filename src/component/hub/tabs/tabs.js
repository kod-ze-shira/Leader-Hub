

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import ViewCardsTabs from './viewCardsTabs'
import ViewDetails from '../viewDetails/viewDetails'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './tabs.css'
import $ from "jquery"
import taskDetails from '../task/taskDetails/taskDetails'
import ReactTooltip from 'react-tooltip';
import title from '../../../Data/title.json'
function Tabs(props) {

    const [showGif, setShowGif] = useState(true)

    useEffect(() => {
    }, [props.projectId, props.focusInputCard, props.cards])

    const [showInput, setShowInput] = useState(false)
    const [inputValue, setInputValue] = useState()
    const [showHeader, setShowHeader] = useState(false)
    const [viewDetails, setViewDetails] = useState(false)
    const [taskToDetails, setTaskToDetails] = useState("")

    function onDragEndׂ(e) {
        if (e.source.droppableId && e.destination) {
            if (props.cards.find(card => card._id == e.draggableId)) {
                onDragEndׂCard(e)
            }
            else {

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
                // console.log(e.source.index, e.destination.index, iSourse, iDestination)
                const replace = [e.source.index, e.destination.index, iSourse, iDestination]
                // const replace = [iSourse, iDestination]
                // /: taskId/:cardId/dragTaskFromCardToCard‏
                props.changeTaskplace(replace)
                const replaceIServer = [e.draggableId, iCardFrom, iCardTo, iSourse, iDestination]
                props.moveTaskBetweenCards(replaceIServer)

            }
        }
    };
    function onDragEndׂCard(e) {
        let indexDest, indexSource
        for (let index = 0; index < props.cards.length; index++)
            if (props.cards[index]._id == e.destination.droppableId) {
                indexDest = index
                break
            }
        for (let index = 0; index < props.cards.length; index++) {
            if (props.cards[index]._id == e.draggableId) {
                indexSource = index
            }
        }
        const replace = [indexSource, indexDest]
        props.changeCardPlace(replace)
        props.moveCards()
    }

    const updateInputValue = (evt) => {
        setInputValue(evt.target.value)
    }

    function showInputToAddCard() {
        setShowInput(!showInput)
        setShowHeader(!showHeader)
    }
    const newCard = () => {
        let card;
        if (inputValue) {
            card = { "project": props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject]._id, name: inputValue }
            props.newCard(card)
        }
        setInputValue("")
        setShowInput(false)
    }
    const openViewDetails = (task) => {
        setViewDetails(true)
        setTaskToDetails(task)

    }
    $(window).click(function () {
        setViewDetails(false)
    });

    function stopP(event) {
        event.stopPropagation();
    }
    return (
        <><div className="body">
            {/* לא מגיע אל הפונקציה הזאת בדרופ */}
            {/* droppableId   לכאורה צריך להוסיף א הפונ' שבעת לקיחה של האוביקט הוא שם את האי די של כרד ב */}
            {/* ואז זה יעבור תקין */}
            {props.cards.length ?
                <DragDropContext onDragEndׂ={(e) => onDragEndׂCard(e)}>
                    <Droppable
                        droppableId={props.cards[0]._id}
                    >
                        {provided => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                <div className="wraperr-tabs">
                                    <div className="row row mx-3">
                                        <DragDropContext
                                            onDragEnd={(e) => onDragEndׂ(e)}>
                                            {props.cards.map((card, index) => {
                                                return <ViewCardsTabs openViewDetails={(task) => openViewDetails(task)}
                                                    // setTask={(task) => setTaskToDetails(task)}
                                                    viewToastComplete={props.viewToastComplete}
                                                    showToast={(obj) => props.showToast(obj)}
                                                    key={card._id} cardFromMap={card} indexCard={index} />
                                            })}
                                        </DragDropContext>
                                        <div className="col-3 mt-4" >
                                            <div className="view-cards-tabs mt-1" >
                                                <div class="card " >
                                                    <div id='newCardInput' class="container" >
                                                        <div
                                                            class="card-header row" data-tip data-for="add_c"
                                                        >
                                                            <input placeholder={"New Card"} value={inputValue} onChange={updateInputValue} className="form-control " onKeyPress={event => {
                                                                if (event.key === 'Enter') {
                                                                    newCard()
                                                                }
                                                            }}></input>
                                                            <ReactTooltip data-tip id="add_c" place="top" effect="solid">
                                                                {title.title_add_card}
                                                            </ReactTooltip>
                                                        </div>
                                                    </div>
                                                    <div className="card-body " id={!showInput ? "add-card" : ""}>
                                                        {/* <a className="add-card-tabs" onClick={() => showInputToAddCard()}>Add Card+</a> */}

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
                :
                <div className="logoGifInCards ml-5 pl-5 logoGif"><img src={require('../../img/animation.gif')} /></div>}

            {viewDetails ?
                <div className="closeDet" onClick={(e) => stopP(e)} >
                    <ViewDetails
                        showToast={(obj) => props.showToast(obj)}
                        closeViewDetails={() => setViewDetails(false)}
                        from={"viewTaskByCard"}
                        task={taskToDetails}
                        open={true}> </ViewDetails>
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
            // workspace: state.workspace_reducer.worksapce,
            // project: state.project_reducer.project,
            indexCurrentProject: state.public_reducer.indexCurrentProject,
            indexOfWorkspace: state.public_reducer.indexOfWorkspace,
            statuses: state.public_reducer.statuses
        }
    },
    (dispatch) => {
        return {
            moveCards: () => dispatch(actions.moveCards()),
            moveTaskBetweenCards: (taskAndCard) => dispatch(actions.moveTaskBetweenCards(taskAndCard)),
            getAllStatusesTaskForUser: () => dispatch(actions.getAllStatusesTaskForUser()),
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
