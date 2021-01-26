import React, { useState } from 'react'
import CardsByProject from '../../Cards/cardsByProject/cardsByProject'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
// import './viewCards.css'

function ViewTaskByCrad(props) {

    return (
        <>
            <div className="container" >
                <div className="row">
                    <div className="col ">
                        <div>{props.task}</div>
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
export default connect(mapStateToProps, mapDispatchToProps)( ViewTaskByCrad)
