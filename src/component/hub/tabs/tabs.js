

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
import { useParams } from 'react-router-dom';
import { dragTask } from '../../../redux/middleware/taskCrud'

function Tabs(props) {

    const { idProject } = useParams();
    const [showInput, setShowInput] = useState(false)
    const [inputValue, setInputValue] = useState()
    const [viewDetails, setViewDetails] = useState(false)
    const [taskToDetails, setTaskToDetails] = useState("")
    const [openInputTask, setOpenInputTask] = useState(false)
    const [downloadFile, setDownloadFile] = useState(false)
    const [flag, setFlag] = useState(true)
    const [ifAnimation, setIfAnimation] = useState(true)

    useEffect(() => {

    }, [props.projectId, props.focusInputCard, props.cards])

    useEffect(() => {
        // if (props.workspaces.length == 0)
        //     props.getAllWorkspaces()
        for (let i = 0; i < props.workspaces.length; i++) {
            let workspace = props.workspaces[i].projects.find((p) => p._id == idProject)
            if (workspace) {
                props.indexOfWorkspace(i)
                props.getAllStatusesTaskForWorkspace()
            }
        }
    }, [props.workspaces])

    useEffect(() => {
        // if (props.cards.length) {
        if (props.cards.length || props.cardsEmpty == true) {
            setIfAnimation(false)
        }
    }, [props.cards.length, props.cardsEmpty])
    const [dragTask, setDragTask] = useState(false)
    useEffect(() => {

    }, [dragTask])

    function onDragStart(e) {
        let card = props.cards.find(card => card._id == e.draggableId)
        if (!card) {
            setDragTaskF()

            let b = dragTask
            // alert("true")
        }
    }
    function setDragTaskF() {
        setDragTask(true)
    }
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
                let replace = [e.source.index, e.destination.index, iSourse, iDestination]
                props.changeTaskplace(replace)

                const replaceIServer = [e.draggableId, iCardFrom, iCardTo, iSourse, iDestination]
                if (replace[2] == replace[3])
                    props.dragTask(iSourse)
                else
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
        props.dragCard()
    }

    const updateInputValue = (evt) => {
        setInputValue(evt.target.value)
    }

    const newCard = () => {
        console.log("cardsssssssss", props.cards);
        let card;
        if (inputValue) {
            card = { "project": props.project._id, name: inputValue }
            props.newCard(card)

        }
        setInputValue("")
        setShowInput(false)
        props.setCurrentIndexCard(props.cards.length)
        setOpenInputTask(true)
    }
    const openViewDetails = (task) => {
        setViewDetails(true)
        setTaskToDetails(task)
    }
    const setFocousCardFunc = (e) => {
        document.getElementById("add-new-card").focus();
    }
    // $(window).click(function () {
    //     setViewDetails(false)
    // });
    $(window).on("click", function () {
        if (flag) {
            if (downloadFile) {
                setViewDetails(true)
                setFlag(false)
                setTimeout(() => {
                    setFlag(true)
                    setDownloadFile(false)
                }, 1000);
            }
            else {
                if (viewDetails) {
                    setViewDetails(false)
                    props.EditTask(props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask])
                }

            }
        }
    })

    function stopP(event) {
        event.stopPropagation();
    }


    return (
        <><div className="body-cards ">
            {/* לא מגיע אל הפונקציה הזאת בדרופ */}
            {/* droppableId   לכאורה צריך להוסיף א הפונ' שבעת לקיחה של האוביקט הוא שם את האי די של כרד ב */}
            {/* ואז זה יעבור תקין */}
            {props.cards[props.indexCurrentCard] ?
                <DragDropContext onDragEndׂ={(e) => onDragEndׂCard(e)}>
                    <Droppable
                        // droppableId={props.cards[props.indexCurrentCard] ? props.cards[props.indexCurrentCard]._id : null}
                        // droppableId={dragTask ? null : props.cards[props.indexCurrentCard]._id}
                        droppableId={props.cards[props.cards.length - 1]._id}
                    >
                        {provided => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                <div className="wraperr-tabs">
                                    <div className="row row mx-3">
                                        {props.cards.length ?
                                            <DragDropContext
                                                // onDragStart={(e) => onDragStart(e)}
                                                onDragEnd={(e) => onDragEndׂ(e)} >

                                                {props.cards.map((card, index) => {
                                                    return <ViewCardsTabs openViewDetails={(task) => openViewDetails(task)}
                                                        openInputTask={openInputTask}
                                                        viewToastComplete={props.viewToastComplete}
                                                        viewContactList={props.viewContactList}
                                                        showRocketShip={props.showRocketShip}
                                                        showToast={(obj) => props.showToast(obj)}
                                                        key={card._id} cardFromMap={card} indexCard={index}

                                                    />
                                                })}
                                            </DragDropContext>
                                            : null}
                                        {/* {!props.cards.length ? */}

                                        {/* <> */}
                                        {ifAnimation ?
                                            <div className="logoGif d-flex justify-content-center">
                                                <img className="LampAnimation" src={require('../../../assets/img/hub.gif')} />
                                            </div>
                                            :
                                            <div className="col-md-3 col-sm-10 px-2 mt-4" >
                                                <div className="view-cards-tabs  mt-1" >
                                                    <div class="card new-card mt-1" >
                                                        <div id='newCardInput' class="container" >
                                                            <div
                                                                class="card-header row" data-tip data-for="add_c"
                                                            >
                                                                <input
                                                                    id="add-new-card"
                                                                    className="form-control "
                                                                    placeholder={""} value={inputValue}
                                                                    onChange={updateInputValue}
                                                                    // onBlur={(e) => newCard()}
                                                                    onKeyPress={event => {
                                                                        if (event.key === 'Enter') {
                                                                            newCard()
                                                                        }
                                                                    }}></input>
                                                                <button
                                                                    className='buttonNewCard mt-3'
                                                                    onClick={(e) => setFocousCardFunc(e)}
                                                                >+ Add Card</button>
                                                            </div>
                                                        </div>
                                                        <div className="card-body " id={!showInput ? "add-card" : ""}>
                                                            {/* <a className="add-card-tabs" onClick={() => showInputToAddCard()}>Add Card+</a> */}

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>}
                                    </div>
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                : null}
            {viewDetails ?
                <div className="closeDet" onClick={(e) => stopP(e)} >
                    <ViewDetails
                        showToast={(obj) => props.showToast(obj)}
                        closeViewDetails={() => setViewDetails(false)}
                        from={"viewTaskByCard"}
                        task={taskToDetails}
                        viewToastComplete={props.viewToastComplete}
                        setDownloadFile={(e) => setDownloadFile(e)}
                        open={true}>
                    </ViewDetails>
                </div>
                : null}

        </div>

        </>
    )
}



export default connect(
    (state) => {
        return {
            indexCurrentCard: state.public_reducer.indexCurrentCard,
            indexCurrentTask: state.public_reducer.indexCurrentTask,
            project: state.project_reducer.project,
            cards: state.public_reducer.cards,
            projects: state.project_reducer.projects,
            user: state.public_reducer.userName,
            workspaces: state.public_reducer.workspaces,
            indexCurrentProject: state.public_reducer.indexCurrentProject,
            indexOfWorkspace: state.public_reducer.indexOfWorkspace,
            statuses: state.public_reducer.statuses,
            cardsEmpty: state.public_reducer.cardsEmpty,

        }
    },
    (dispatch) => {
        return {
            dragTask: (cardOfTask) => dispatch(actions.dragTask(cardOfTask)),
            setCurrentIndexCard: (index) => dispatch(actions.saveCurrentIndexOfCardInRedux(index)),
            indexOfWorkspace: (index) => dispatch(actions.indexOfWorkspace(index)),
            dragCard: () => dispatch(actions.dragCard()),
            moveTaskBetweenCards: (taskAndCard) => dispatch(actions.moveTaskBetweenCards(taskAndCard)),
            getAllStatusesTaskForWorkspace: () => dispatch(actions.getAllStatusesTaskForWorkspace()),
            getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
            getCardsOfProject: (projectId) => dispatch(actions.getCardsOfProject(projectId)),
            changeTaskplace: (obj) => dispatch(actions.changeTaskplace(obj)),
            changeCardPlace: (obj) => dispatch(actions.changeCardPlace(obj)),
            removeCardById: (cardId) => dispatch(actions.removeCardById(cardId)),
            removeTaskById: (taskId) => dispatch(actions.removeTaskById(taskId)),
            getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace)),
            getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
            newCard: (cardname) => dispatch(actions.newCard(cardname)),
            EditTask: (task) => dispatch(actions.editTask(task)),

        }
    }
)(Tabs)
