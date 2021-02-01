import React, { useState } from 'react'
import './ViewTaskByCrad.css'
import CardsByProject from '../../Cards/cardsByProject/cardsByProject'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import { InputGroup, FormControl } from 'react-bootstrap'
// import './viewTaskByCard.css'
// import './viewTaskByCrad.css'





function ViewTaskByCrad(props) {

    return (
        <>
            <div className="container" >
                <div className="row">
                    <div className="col  ">
                        <div>
                            <label class="container pl-5 my-2 ml-5">{props.task.description}
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>

                        </div>

                    </div>
                </div>
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
