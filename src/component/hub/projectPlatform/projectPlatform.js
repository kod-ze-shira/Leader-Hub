import React, { useState, useEffect, useParams } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import CardsByProject from '../Cards/cardsByProject/cardsByProject';
import './projectPlatform.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ToastDelete from '../toastDelete/toastDelete1';


function ProjectPlatform(props) {
    const [projectId, setProjectId] = useState()
    const [viewCardsByProject, setViewCardsByProject] = useState(false)
    const [workspaceId, setWorkspaceId] = useState()
    const [showInput, setShowInput] = useState(false)
    const [showToastDelete, setShowToastDelete] = useState(false)
    const [taskDeleted, setTaskDeleted] = useState()

    useEffect(() => {
        {

        };
    }, []);

    const changeProjectId = () => {
        // setProjectId(value)
        setViewCardsByProject(true)
    }
    const [showDetails, setShowDetails] = useState(false)
    const [inputValue, setInputValue] = useState()

    // $(function () {
    //     $('.add-new-btn').hover(function () {
    //         $('.add-new-pop-up').css('display', 'block')
    //     }, function () {
    //         // on mouseout, reset the background colour
    //         $('.add-new-pop-up').css('display', 'none');
    //     });
    // });
    const updateInputValue = (evt) => {
        setInputValue(evt.target.value)
    }
    const showInputToAddCard = () => {
        setShowInput(true)

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
    const showToastToDeleteTask = (task) => {
        setTaskDeleted(task)
        setShowToastDelete(true)
    }
    const deleteTask = () => {
        setShowToastDelete(false)
        props.removeTaskById(taskDeleted._id)

    }
    return (
        <>

            <div className="body container-fluid">
                <CardsByProject showToast={(task) => showToastToDeleteTask(task)} projectId={props.project._id} flag={props.flag} />
                <div className="add-new-pop-up ">
                    <a >New Workspace</a><br></br>
                    <a>New Project</a><br></br>
                    <a>New Card</a><br></br>
                    <a>New Task</a><br></br>
                </div>
                {showInput ?
                    <input placeholder={"New Card"} value={inputValue} onChange={updateInputValue} className="col-7 ml-4 mt-2 input-group-prepend" onKeyPress={event => {
                        if (event.key === 'Enter') {
                            newCard()
                        }
                    }}></input>
                    : null}
                <a className="ml-4 mt-2 add-card-btn" onClick={showInputToAddCard}>Add Card+</a>
                <div className="add-new-btn">+</div>
                {showToastDelete ?
                    <ToastDelete
                        toOnClose={deleteTask}
                        toSetShowToastDelete={() => { setShowToastDelete(false) }}
                        name={taskDeleted.name} /> : null}
            </div>

        </>
    )
}
const mapStateToProps = (state) => {
    return {
        projects: state.project_reducer.projects,
        user: state.public_reducer.userName,
        workspaces: state.public_reducer.worksapces,
        workspace: state.workspace_reducer.worksapce,
        project: state.project_reducer.project,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeTaskById: (taskId) => dispatch(actions.removeTaskById(taskId)),
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace)),
        getAllWorkspacesFromServer: () => dispatch(actions.getAllWorkspacesFromServer()),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspaces()),
        newCard: (cardname) => dispatch(actions.newCard(cardname)),

    }


}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectPlatform)