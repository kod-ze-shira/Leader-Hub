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


function ViewTaskByCrad(props) {
    const [viewDetails, setViewDetails] = useState(false)
    const [showchalalit, setShowChalalit] = useState(false)

    const showDetails = (event) => {
        setViewDetails(true)
        props.setTask(props.task)
    }
    const closeDetails = (e) => {
        setViewDetails(false)

    }
    function addChalalit() {
        setShowChalalit(true)
    }

    return (
        <>
            <div className="show-task row mx-5 border-bottom">
                <label className="check-task ml-4 p-2 col-3">{props.task.name}
                    <input type="checkbox" />
                    <span className="checkmark " onClick={() => addChalalit()}></span>
                </label>
                <label className="check-task py-1  px-2 col-4 "><button onClick={(e) => showDetails(e)}>view details +</button>
                </label>
                <label className="check-task border-left  py-1  px-2 col ">{props.task.status}
                </label>
                <label className="check-task border-left  py-1  px-2 col " ><div className={(props.task.status) == "in progress" ? 'status-task-in-progress' : props.task.status == "done" ? 'status-task-done' : 'status-task-to-do'}>{props.task.status}</div>
                </label>

                <label className="check-task border-left  py-1  px-2 col">{props.task.startDate}
                </label>

                {viewDetails ?
                    <div className="closeDet" onClick={(e) => closeDetails(e)}>
                        <ViewDetails from={"viewTaskByCard"} task={props.task}> </ViewDetails>
                    </div>: null}
            </div>
            
            {showchalalit ? <div className="animation"><Animation/> </div>: null}

        </>
    )
}
const mapStateToProps = (state) => {

    return {
        // tasks: state.public_reducer.tasks,
        // card: state.card_reducer.card

        // task:state.task_reducer.task

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setTask:(task)=>dispatch(actions.setTask(task))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskByCrad)
