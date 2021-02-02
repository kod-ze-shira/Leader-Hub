import React, { useState } from 'react'
import CardsByProject from '../../Cards/cardsByProject/cardsByProject'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import './viewCards.css'
import history from '../../../history'
import TasksByCard from '../../task/tasksByCard/tasksByCard'

function ViewCards(props) {

    // const [ViewCards, setViewCards] = useState(false)

    const changeSelectedCard = (event) => {
        props.changeCard(props.card._id)

    }

    return (
        <>
                    <div className=" row justify-content-start card-name border-bottom mx-5 mt-4 pb-0">
                        <div className="triangle mt-4"></div>
                        <button onClick={(e) => changeSelectedCard(e)} className="ml-3 show-card">{props.card.name}</button>
                        <p>Team</p>
                        <p>Label</p>
                        <p>Due Date</p>
                    </div>
        </>
    )
}
const mapStateToProps = (state) => {

    return {
        project: state.project_reducer.project,
        // card: state.card_reducer.card

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // getCardsByProjectId: () => dispatch(actions.getCardsByProjectId()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCards)
