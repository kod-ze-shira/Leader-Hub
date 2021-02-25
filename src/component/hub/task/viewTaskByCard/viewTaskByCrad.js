import React, { useState, useEffect } from 'react'
import './ViewTaskByCrad.css'
import CardsByProject from '../../Cards/cardsByProject/cardsByProject'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import { InputGroup, FormControl, Table } from 'react-bootstrap'
// import './viewTaskByCard.css'
// import './viewTaskByCrad.css'
import ViewDetails from '../../viewDetails/viewDetails'
import $ from 'jquery';
import Animation from '../../animation/animation'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function ViewTaskByCrad(props) {
    const [viewDetails, setViewDetails] = useState(false)
    const [showchalalit, setShowChalalit] = useState(false)
    useEffect(() => {

    }, [props.task])
    const showDetails = (event) => {
        setViewDetails(true)
    }
    const closeDetails = (e) => {
        setViewDetails(false)
    }

    function addChalalit() {
        let object, iCard, iTask
        for (iCard = 0; iCard < props.cards.length; iCard++) {
            if (props.cards[iCard]._id == props.task.card) {
                break
            }
        }
        for (iTask = 0; iTask < props.cards[iCard].tasks.length; iTask++) {
            if (props.cards[iCard].tasks[iTask]._id == props.task._id) {
                break
            }
        }
        object = [iCard, iTask]
        props.setTaskStatus(object)
        setShowChalalit(true)
    }
    function deleteTask(task) {
        props.showToast(task)
    }
    return (
        <>
            <Draggable draggableId={props.task._id} index={props.index}>
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // innerRef={provided.innerRef}
                        ref={provided.innerRef}
                    >

                        <div className="show-task row mx-4 border-bottom">
                            <label className="check-task ml-3 py-2 pl-4.5 col-3">{props.task.name}
                                <input type="checkbox" />
                                <span className="checkmark " onClick={() => addChalalit()}></span>
                            </label>
                            <label className="check-task py-2  px-2 col-4 "><button onClick={(e) => showDetails(e)}>view details +</button>
                            </label>
                            <label className="check-task border-left  py-2  px-2 col ">{props.task.status}
                            </label>
                            <label className="check-task border-left  py-2  px-2 col " ><div className={(props.task.status) == "in progress" ? 'status-task-in-progress' : props.task.status == "done" ? 'status-task-done' : 'status-task-to-do'}>{props.task.status}</div>
                            </label>
                            <label className="check-task border-left  py-2  px-2 col">{props.task.startDate}
                            </label>
                            <button onClick={(e) => deleteTask(props.task)}>
                                <img src={require('../../../img/bin.png')}></img>
                            </button>
                            {viewDetails ?
                                <div className="closeDet" onClick={(e) => closeDetails(e)}>
                                    <ViewDetails from={"viewTaskByCard"} task={props.task}> </ViewDetails>
                                </div> : null}
                        </div>
                    </div>
                )}
            </Draggable>
            {showchalalit ? <div className="animation"><Animation /> </div> : null}

        </>
    )
}
const mapStateToProps = (state) => {

    return {
        tasks: state.public_reducer.tasks,
        cards: state.public_reducer.cards
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setTaskStatus: (index) => dispatch(actions.setTaskStatus(index)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskByCrad)
