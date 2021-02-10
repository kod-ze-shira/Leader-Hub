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


function ViewTaskByCrad(props) {
    const [viewDetails, setViewDetails] = useState(false)

    const showDetails = (event) => {
        setViewDetails(true)
    }
    const closeDetails = (e) => {
        setViewDetails(false)

    }
    return (
        <>
            <div className="show-task row mx-5 border-bottom">
                <label className="check-task ml-4 p-2 col-3">{props.task.description}
                    <input type="checkbox" />
                    <span className="checkmark "></span>
                </label>
                <label className="check-task border-left  p-2 col ">{props.task.status}
                </label>
                <label className="check-task border-left  p-2 col " ><div className={(props.task.status) == "in progress" ? 'status-task-in-progress' : props.task.status == "done" ? 'status-task-done' : 'status-task-to-do'}>{props.task.status}</div>
                </label>

                <label className="check-task border-left  p-2 col">{props.task.startDate}
                </label>
                <label className="check-task border-left p-2 col "><button onClick={(e) => showDetails(e)}>view details +</button>
                </label>
                {viewDetails ?
                    <div className="close-details" onClick={(e) => closeDetails(e)}>
                        <ViewDetails > </ViewDetails>
                    </div>
                    : null}

            </div>

        </>
    )
}
const mapStateToProps = (state) => {

    return {
        // tasks: state.public_reducer.tasks,
        // card: state.card_reducer.card

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // getTasksByCard: (cardId) => dispatch(actions.getTasksByCard(cardId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskByCrad)
