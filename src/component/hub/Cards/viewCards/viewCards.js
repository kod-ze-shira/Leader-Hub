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
                <h1>ViewCards</h1>
                <div className="row" onClick={() => setViewCards(!ViewCards)}>
                    <div className="col">
                        <div>name:</div>
                    </div>
                </div>
                <div>
                    {ViewCards ? <CardsByProject projectId={props.project._id} /> : null}
                    <button onClick={() => { props.getCardsByprojectId() }}>getCardsByprojectId</button>

                </div>
            </div>


        </>
    )
}
const mapStateToProps = (state) => {

    return {
        project: state.project_reducer.project,
        card: state.card_reducer.card

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCardsByprojectId: () => dispatch(actions.getCardsByprojectId()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCards)
