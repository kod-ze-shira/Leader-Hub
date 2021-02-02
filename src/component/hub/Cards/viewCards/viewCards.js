import React, { useState } from 'react'
import CardsByProject from '../../Cards/cardsByProject/cardsByProject'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import './viewCards.css'
import history from '../../../history'
import TasksByCard from '../../task/tasksByCard/tasksByCard'

function ViewCards(props) {

    const [flag, setFlag] = useState(true)

    const changeSelectedCard = (event) => {
        setFlag(!flag)
        props.changeCard(props.card._id, flag)

    }

    return (
        <>
            <div className=" row justify-content-start card-name  mx-5 mt-4 pb-0">

                <div className="triangle ml-1 mt-3"></div>
                <button onClick={(e) => changeSelectedCard(e)} className="ml-2 p-2 show-card col-3 border-right">{props.card.name}</button>

                <p className="p-2 col ">Team</p>
                <p className=" p-2 border-left col">Label</p>
                <p className="p-2  border-left col">Due Date</p>
                <p className="p-2  border-left col"></p>
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
