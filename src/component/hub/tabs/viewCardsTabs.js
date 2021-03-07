
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action'
import './viewCardsTabs.css'
// import history from '../../../history'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ViewTaskByCradTabs from './viewTaskByCardTabs/viewTaskByCardTabs'
// import ViewDetails from '../../viewDetails/viewDetails'
// import ToastDelete from '../../toastDelete/toastDelete1'
import { event } from 'jquery';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ViewCardsTabs(props) {
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
        const today = new Date()
        const startDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const dueDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 7);
        const dateWithSleshToStart = startDate.split("-")[2] + '/' + startDate.split("-")[1] + '/' + startDate.split("-")[0];
        const dateWithSleshToDue = dueDate.split("-")[2] + '/' + dueDate.split("-")[1] + '/' + dueDate.split("-")[0];

        let task;
        if (inputValue) {
            task = { name: inputValue, description: "", status: "to do", startDate: dateWithSleshToStart, dueDate: dateWithSleshToDue, "card": props.card._id }
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
            // props.setTask(props.task)
        }
    const changeSelectedCard = (event) => {
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
            <div className="col-3 mt-4">
                <div className="view-cards-tabs">
                    <div class="card " >
                        <div class="card-header">
                            {props.cardFromMap.name}<button className="more">. . .</button></div>
                        <div class="card-body">
                            {props.cardFromMap.tasks.map((task) => (
                                <ViewTaskByCradTabs key={task._id} task={task} />
                            ))}
                            <p className="add-task-tabs mt-1">Add Task +</p>
                        </div>
                    </div>

                </div>


            </div >

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
export default connect(mapStateToProps, mapDispatchToProps)(ViewCardsTabs)
