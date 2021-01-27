import React, { useState } from 'react'
import CardsByProject from '../../Cards/cardsByProject/cardsByProject'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import './viewCards.css'

function ViewCards(props) {

    const [ViewCards, setViewCards] = useState(false)
    return (
        <>
            <div className="container" >
                <div className="row" onClick={() => setViewCards(!ViewCards)}>
                    <div className="col card-name border-bottom mx-5 mt-5 pb-2">
                        <div>{props.card.name}</div>
                    </div>
                </div>
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
