import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import './viewCards.css'
import history from '../../../history'
import TasksByCard from '../../task/tasksByCard/tasksByCard'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import tasksByCard from '../../task/tasksByCard/tasksByCard';
import ViewDetails from '../../viewDetails/viewDetails'



function ViewCards(props) {
    useEffect(() => {

    }, [props.flag])

    const [flag, setFlag] = useState(false)
    const [flagFromSelect, setFlagFromSelect] = useState(true)
    const [cardId, setCardId] = useState("")
    const [viewDetails, setViewDetails] = useState(false)
    const showDetails = (event) => {
        setViewDetails(true)
        // props.setTask(props.task)
    }
    const closeDetails = (e) => {
        // setViewDetails(false)

    }
    
    const changeSelectedCard = (event) => {
        setCardId(props.cardFromMap._id)
        props.setCard(props.cardFromMap)
        // alert(props.flag + "  " + props.cardFromMap._id)

        if (props.flag == props.cardFromMap._id && flagFromSelect == true) {
            setFlagFromSelect(false)
        }
        else
            if (!flag && props.cardFromMap.tasks[0])
                setFlag(true)
            else {
                setFlag(false)
                // setFlagFromSelect(true)
            }
        // setFlag(false)


        // props.flag = !(props.flag)
        // if (flag)
        //     setFlag(false)
        // else
        //     setFlag(true)
    }
    const newTask = () => {
        let task;
        alert("new task");
        task = { name: "mami!", description: "to do", status: "to do", startDate: "18/02/2021", updateDates: "18/02/2021", "card": props.card._id }
        props.newTask(task)
        console.log(task);
        console.log("add task:" + props.card.tasks)
    }

    return (
        <>
            <div className=" row justify-content-start card-name  mx-4 mt-4 pb-0">
                <button className=" show-card col-3  mr-3" onClick={(e) => changeSelectedCard(e)}>
                    <div className="triangle mb-1"></div>
                    <div className="pl-2">{props.cardFromMap.name}</div>
                </button>
                <p className=" col-4 "></p>
                <p className=" border-left  col pb-1">Team</p>
                <p className="  border-left col pb-1">Label</p>
                <p className="  border-left col pb-1">Due Date<button className="ml-2 new-task" onClick={(e) => showDetails(e)}>+</button>
                </p>
            </div>
              {viewDetails ?
                    <div className="closeDet" onClick={(e) => closeDetails(e)}>
                        <ViewDetails from={"editTaskToCard"}> </ViewDetails>
                    </div> : null}
            <DragDropContext>
                <Droppable droppableId="characters">
                    {(provided) => (
                        /* ul */
                        props.flag == props.cardFromMap._id && flagFromSelect || flag ?
                            <TasksByCard className="characters" cardId={cardId}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                //   {...provided.droppableProps} 
                                ref={provided.innerRef} />
                            : null
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}
const mapStateToProps = (state) => {

    return {
        project: state.project_reducer.project,
        card: state.card_reducer.card,
        task: state.task_reducer.task,
        // tasks:state.task_reducer.tasks,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCard: (card) => dispatch(actions.setCard(card)),
        newTask: (task) => dispatch(actions.newTask(task)),

        // getCardsByProjectId: () => dispatch(actions.getCardsByProjectId()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCards)
