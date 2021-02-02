import React, { useState } from 'react'
import './ViewTaskByCrad.css'
import CardsByProject from '../../Cards/cardsByProject/cardsByProject'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import { InputGroup, FormControl,Table } from 'react-bootstrap'
// import './viewTaskByCard.css'
// import './viewTaskByCrad.css'

function ViewTaskByCrad(props) {

    return (
        <>
            {/* <div className="container-fluid" > */}
                <div className="show-task row mx-5 border-bottom">
                            <label className="check-task ml-4   my-2 p-2 col-3">{props.task.description}
                                <input type="checkbox" />
                                <span className="checkmark "></span>
                            </label>
                            <label className="check-task border-left my-2 p-2 col ">{props.task.status}
                            </label>
                            <label className="check-task border-left  my-2 p-2 col "><div className="w-75 status-task py-1">{props.task.status}</div>
                            </label>
                            <label className="check-task border-left my-2 p-2 col">{props.task.startDate}
                            </label>
                            <label className="check-task border-left my-2 p-2 col ">view details +
                            </label>
                            
                        {/* </div> */}
                {/* <Table className="container-fluid"  >

                    <tbody  >
                        <tr className="row mx-5 ">
                            <td className="check-task ml-2 pl-5 my-2  col-3">{props.task.description}
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                            </td>
                            <td className="check-task  my-2 col ">{props.task.status}</td>
                            <td className="check-task  my-2 col ">{props.task.status}</td>
                            <td className="check-task  my-2 col ">{props.task.startDate}</td>
                            <td className="check-task  my-2 col ">view details +</td>

                        </tr>

                    </tbody>
                    </Table> */}

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
