import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewCards from '../viewCards/viewCards'
import './cardsByProject.css'

function CardsByProject(props) {

    useEffect(() => {

        props.getCardsByProjectId(props.projectId)

    }, [props.projectId])

    const viewCardsByProject = props.cards.map((card) => {
        return <ViewCards key={card._id} cardFromMap={card} flag={props.flag}/>
    })
    console.log("cards" + props.cards)
    return (
        <>
            {viewCardsByProject}

        </>
    )
}


export default connect(
    (state) => {
        return {

            cards: state.public_reducer.cards,
            // project: state.project_reducer.project,
            // user: state.public_reducer.userName
        }
    },
    (dispatch) => {
        return {
            getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId))
        }
    }
)(CardsByProject)