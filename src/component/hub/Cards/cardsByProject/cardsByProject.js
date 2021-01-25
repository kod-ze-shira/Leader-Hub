import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewCards from '../viewCards/viewCards'
import './cardsByProject.css'

function CardsByProject(props, projectId) {

    useEffect(() => {
       
        console.log("projectId", props.projectId)
        props.getCardsByprojectId(props.projectId)

    }, [])

    const viewCardsByProject = props.cards.map((cards) => {
        return <ViewCards cards={cards} />
    })
    return (
        <>
            <div to="/cardsByProject">
                {viewCardsByProject}
            </div>
        </>
    )
}


export default connect(
    (state) => {
        return {
            cards: state.public_reducer.cards,
            project:state.project_reducer.project
        }
    },
    (dispatch) => {
        return {
            getCardsByprojectId: (projectId) => dispatch(actions.getCardsByprojectId(projectId))
        }
    }
)(CardsByProject)