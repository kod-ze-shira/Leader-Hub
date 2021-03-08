import React, { useState, useEffect, useRef } from 'react'
import CardsByProject from '../../Cards/cardsByProject/cardsByProject'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import { InputGroup, FormControl, Table } from 'react-bootstrap'
import $ from 'jquery';
import Animation from '../../animation/animation'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ViewTaskByCradTabs(props) {


    useEffect(() => {

    }, [props.task])

    return (
        <>


            {/* <div className="color-task mb-2 ml-2" ></div> */}
            <Draggable draggableId={props.task._id} index={props.index}>
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="task-card mt-2 ">
                            <div className="container">
                                <div className="row">
                                    <div className={(props.task.status) == "in progress" ? 'color-task col-5 mt-3 ml-2  status-task-in-progress' : props.task.status == "done" ? 'color-task col-5 mt-3 ml-2  status-task-done' : 'color-task col-5 mt-3 ml-2  status-task-to-do'} ></div>
                                    <button className="more col-4 mr-0">. . .</button>
                                </div>
                                <p className="">{props.task.name}</p>

                            </div>
                        </div>
                    </div>
                )}
            </Draggable>

        </>
    )
}
const mapStateToProps = (state) => {

    return {
        tasks: state.public_reducer.tasks,
        cards: state.public_reducer.cards,
        card: state.card_reducer.card
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        EditTask: (task) => dispatch(actions.editTask(task)),
        setTaskStatus: (index) => dispatch(actions.setTaskStatus(index)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskByCradTabs)
