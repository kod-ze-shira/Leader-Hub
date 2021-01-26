import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewCards from '../viewCards/viewCards'
import './cardsByProject.css'

function CardsByProject(props) {

    useEffect(() => {

        console.log("projectId", props.projectId)
        props.getCardsByprojectId(props.projectId)

    }, [])

    const viewCardsByProject = props.cards.map((cards) => {
        return <ViewCards cards={cards} />
    })
    return (
        <>
            {/* ${props.projectId} */}
            <div to={`${props.user}/cardsByProject`}>
                {viewCardsByProject}
            </div>
        </>
    )
}


export default connect(
    (state) => {
        return {
            cards: state.public_reducer.cards,
            project: state.project_reducer.project,
            user: state.public_reducer.userName

        }
    },
    (dispatch) => {
        return {
            getCardsByprojectId: (projectId) => dispatch(actions.getCardsByprojectId(projectId))
        }
    }
)(CardsByProject)