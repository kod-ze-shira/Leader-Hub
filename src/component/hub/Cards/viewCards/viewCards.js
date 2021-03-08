import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import './viewCards.css'
import $ from 'jquery'
import history from '../../../history'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ViewTaskByCrad from '../../task/viewTaskByCard/viewTaskByCrad'
import ViewDetails from '../../viewDetails/viewDetails'
import ToastDelete from '../../toastDelete/toastDelete1'
import { event } from 'jquery';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ViewCards(props) {
    useEffect(() => {

    }, [props.flag])

    const [flag, setFlag] = useState(false)
    const [flagFromSelect, setFlagFromSelect] = useState(true)
    const [cardId, setCardId] = useState("")
    const [viewDetails, setViewDetails] = useState(false)
    const [addTaskInInput, setAddTaskInInput] = useState(false)
    const [inputValue, setInputValue] = useState()
    const [editCardName, setEditCardName] = useState(props.cardFromMap.name)

    const updateInputValue = (evt) => {
        setInputValue(evt.target.value)
    }
    const newTask = () => {
        // const today = new Date()
        // const startDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        // const dueDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 7);
        // const dateWithSleshToStart = startDate.split("-")[2] + '/' + startDate.split("-")[1] + '/' + startDate.split("-")[0];
        // const dateWithSleshToDue = dueDate.split("-")[2] + '/' + dueDate.split("-")[1] + '/' + dueDate.split("-")[0];
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        const yyyy = today.getFullYear()
        today = (dd <= 9 ? '0' + dd : dd) + '/' + (mm <= 9 ? '0' + mm : mm) + '/' + yyyy;
        let task;
        if (inputValue) {
            task = { name: inputValue, description: "", status: "to do", startDate: today, dueDate: today, "card": props.card._id }
            props.newTask(task)
        }
        setInputValue("")
        setAddTaskInInput(!addTaskInInput)
    }

    const addTask = () => {
        setAddTaskInInput(!addTaskInInput)
        if (props.cardFromMap.tasks.length)
            if (!(props.flag == props.cardFromMap._id && flagFromSelect) && !flag) {
                changeSelectedCard()
            }
    }
    const updateCardName = (event) => {
        setEditCardName(event.target.value)

    }
    const deleteCard = () => {
        props.showToastDelete(props.cardFromMap)
        // props.removeCardById(props.cardFromMap._id)
    }
    const editCard = (event) => {
        let card = { "_id": props.cardFromMap._id, "name": editCardName, "project": props.project._id }
        console.log("edut-card", card)
        props.EditCard(card);
    }
    const showDetails =
        (event) => {
            setViewDetails(true)
            setCardId(props.cardFromMap._id)
        }
    const triangleSide = () => {
        if ($(".base-triangle").hasClass("triangle")) {
            $(".base-triangle").removeClass("triangle")
            $(".base-triangle").addClass("newTriangle")
        }
        else {
            $(".base-triangle").removeClass("newTriangle")
            $(".base-triangle").addClass("triangle")
        }

    }
    const changeSelectedCard = (event) => {
        triangleSide()
        props.setCard(props.cardFromMap)
        if (props.flag == props.cardFromMap._id && flagFromSelect == true) {
            setFlagFromSelect(false)
            setAddTaskInInput(false)

        }
        else
            if (!flag && props.cardFromMap.tasks[0]) {
                setFlag(true)
            }
            else {
                console.log(props.cardFromMap.tasks[0])
                setFlag(false)
                setAddTaskInInput(false)
            }

    }

    return (
        <>
            <div className=" row justify-content-start card-name  mx-4 mt-4 pb-0">
                <div className=" col-3  mr-3 ">
                    <div className="triangle base-triangle" onClick={(e) => changeSelectedCard(e)} ></div>

                    {/* <div className="title-card col-3 mr-4">
                    <div className={props.cardFromMap.tasks && props.cardFromMap.tasks.length ? "triangle  show-card-pressure" : "triangle  show-card-no-pressure"} onClick={(e) => changeSelectedCard(e)} ></div> */}
                    <input
                        className="ml-3 show-card mb-2"
                        value={editCardName}
                        onChange={updateCardName}
                        // onBlur={editCard}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                editCard()
                            }
                        }}
                    >
                    </input>
                    {/* <button onClick={deleteCard}>delete card</button> */}
                    {/* <FontAwesomeIcon className=" mt-2 "
                        icon={['fas', 'ellipsis-v']}
                    ></FontAwesomeIcon> */}
                    <a href="#input-task">
                        <button className="new-task" onClick={addTask}>+</button>
                    </a>
                </div>
                <p className=" col-4 "></p>
                <p className="border-left  col">Team</p>
                <p className="border-left col">Label</p>
                <p className="border-left col">Due Date
                </p>
                {/* <p className="  border-left pb-1 " ><button className="ml-2 new-task" onClick={(e) => showDetails(e)}>+</button></p> */}
            </div >
            {
                props.flag == props.cardFromMap._id && flagFromSelect || flag ?
                    <Droppable droppableId={props.cardFromMap._id} >
                        {provided => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                {props.cardFromMap.tasks.map((task, index) => (
                                    <ViewTaskByCrad showToast={(task) => props.showToastDelete(task)} key={task._id} task={task} index={index} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable> : null
            }
            {
                addTaskInInput ?
                    <input type="text" class="form-control scroll-container mt-2 w-50 ml-4" placeholder="Add Task" id="input-task"
                        value={inputValue} onChange={updateInputValue} onKeyPress={event => {
                            if (event.key === 'Enter') {
                                newTask()
                            }
                        }}
                    />
                    : null
            }

            {
                viewDetails ?
                    <div className="closeDet">
                        <ViewDetails closeViewDetails={() => setViewDetails(false)} cardId={cardId} from={"addTask"}> </ViewDetails>
                    </div>
                    : null
            }
        </>
    )
}
const mapStateToProps = (state) => {

    return {
        project: state.project_reducer.project,
        card: state.card_reducer.card,
        task: state.task_reducer.task,
        tasks: state.public_reducer.tasks,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCard: (card) => dispatch(actions.setCard(card)),
        newTask: (task) => dispatch(actions.newTask(task)),
        getTasksByCardId: (id) => dispatch(actions.getTasksByCardId(id)),
        EditCard: (card) => dispatch(actions.editCard(card))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCards)
