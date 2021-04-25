import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import CardsByProject from '../Cards/cardsByProject/cardsByProject';
import './projectPlatform.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ToastDelete from '../toastDelete/toastDelete1';
import $ from 'jquery'

function ProjectPlatform(props) {
    const [showInput, setShowInput] = useState(false)
    const [showToastDelete, setShowToastDelete] = useState(false)
    const [taskOrCard, setTaskOrCard] = useState()

    useEffect(() => {

    }, [props.focusInputCard]);
    if (!showInput) {
        if (props.focusInputCard) {
            setShowInput(true)
        }
    }


    const [inputValue, setInputValue] = useState()
    const textInput = useRef(null);


    const updateInputValue = (evt) => {
        setInputValue(evt.target.value)
    }
    function showInputToAddCard() {
        setShowInput(!showInput)
        // $('.add-card-btn').click(function () {
        //     $('.add-card').focus()
        // })

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
    //show toast delete to true and save the sask that shold be deleted
    const showToastToDeleteTask = (taskOrCard) => {
        setTaskOrCard(taskOrCard)
        props.showToast(taskOrCard)
    }

    const deleteTaskOrCard = () => {
        setShowToastDelete(false)
        if (props.cards.find(card => card._id == taskOrCard._id)) {
            props.removeCardById(taskOrCard._id)
        }
        else
            props.removeTaskById(taskOrCard._id)
    }
    return (
        <>
            <div className=" body container-fluid">
                <div className="cards">
                    <CardsByProject showToast={(obj) => showToastToDeleteTask(obj)} projectId={props.project._id} flag={props.flag} />
                    <div className="add-new-pop-up ">
                        <a >New Workspace</a><br></br>
                        <a>New Project</a><br></br>
                        <a>New Card</a><br></br>
                        <a>New Task</a><br></br>
                    </div>
                    {showInput ?
                        <input
                            autoFocus="true"
                            id="input-card"
                            ref={textInput}
                            placeholder={"New Card"}
                            value={inputValue}
                            onChange={updateInputValue}
                            className="form-control mt-2 col-6 ml-4"
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    newCard()
                                }
                            }}></input>
                        : null}
                    <a className="ml-4 mx-5 add-card-btn" onClick={showInputToAddCard}>Add Card+</a>
                </div>
                {showToastDelete ?
                    <ToastDelete
                        toOnClose={deleteTaskOrCard}
                        toSetShowToastDelete={() => { setShowToastDelete(false) }}
                        name={taskOrCard.name} /> : null}
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        cards: state.public_reducer.cards,
        projects: state.project_reducer.projects,
        user: state.public_reducer.userName,
        workspaces: state.public_reducer.workspaces,
        workspace: state.workspace_reducer.worksapce,
        project: state.project_reducer.project,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // removeCardById: (cardId) => dispatch(actions.removeCardById(cardId)),
        // removeTaskById: (taskId) => dispatch(actions.removeTaskById(taskId)),
        // getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace)),
        // getAllWorkspacesFromServer: () => dispatch(actions.getAllWorkspacesFromServer()),
        // getAllWorkspaces: () => dispatch(actions.getAllWorkspaces()),
        newCard: (cardname) => dispatch(actions.newCard(cardname)),
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectPlatform)