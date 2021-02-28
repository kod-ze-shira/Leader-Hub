import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import './viewCards.css'
import history from '../../../history'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ViewTaskByCrad from '../../task/viewTaskByCard/viewTaskByCrad'
import ViewDetails from '../../viewDetails/viewDetails'
import ToastDelete from '../../toastDelete/toastDelete1'

function ViewCards(props) {
    useEffect(() => {

    }, [props.flag])

    const [flag, setFlag] = useState(false)
    const [flagFromSelect, setFlagFromSelect] = useState(true)
    const [cardId, setCardId] = useState("")
    const [viewDetails, setViewDetails] = useState(false)
    const [addTaskInInput, setAddTaskInInput] = useState(false)
    const [inputValue, setInputValue] = useState()

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
        setAddTaskInInput(false)
    }
    const addTask = () => {
        if (flag)
            setAddTaskInInput(!addTaskInInput)
    }
    const showDetails =
        (event) => {
            setViewDetails(true)
            setCardId(props.cardFromMap._id)
            // props.setTask(props.task)
        }
    const changeSelectedCard = (event) => {
        // setCardId(props.cardFromMap._id)
        props.setCard(props.cardFromMap)
        if (props.flag == props.cardFromMap._id && flagFromSelect == true) {
            setFlagFromSelect(false)
        }
        else
            if (!flag && props.cardFromMap.tasks[0]) {
                setFlag(true)
            }
            else {
                console.log(props.cardFromMap.tasks[0])
                setFlag(false)
            }
    }

    return (
        <>
            <div className=" row justify-content-start card-name  mx-4 mt-4 pb-0">
                <div className=" col-3  mr-3">
                    <button className=" show-card" onClick={(e) => changeSelectedCard(e)}>
                        <div className="triangle mb-1"></div>
                        <div className="pl-2">{props.cardFromMap.name}</div>
                    </button>
                    <button className=" ml-3 new-task" onClick={addTask}> +</button>
                </div>
                <p className=" col-4 "></p>
                <p className=" border-left  col pb-1">Team</p>
                <p className="  border-left col pb-1">Label</p>
                <p className="  border-left col pb-1">Due Date
                </p>
                <p className="  border-left pb-1 " ><button className="ml-2 new-task" onClick={(e) => showDetails(e)}>+</button></p>
            </div>
            { props.flag == props.cardFromMap._id && flagFromSelect || flag ?
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
                </Droppable> : null}
            {addTaskInInput ?
                <input type="text" class="form-control mt-2 w-50 ml-4" placeholder="Add Task"
                    value={inputValue} onChange={updateInputValue} onKeyPress={event => {
                        if (event.key === 'Enter') {
                            newTask()
                        }
                    }}
                />
                : null}

            {viewDetails ?
                <div className="closeDet">
                    <ViewDetails setViewDetailsToClose={() => setViewDetails(false)} cardId={cardId} from={"addTask"}> </ViewDetails>
                </div>
                : null}
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCards)
