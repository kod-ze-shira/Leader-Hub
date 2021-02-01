import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewCards from '../viewCards/viewCards'
import './cardsByProject.css'
import TasksByCard from '../../task/tasksByCard/tasksByCard'

function CardsByProject(props) {

    useEffect(() => {

        console.log("projectIdInCards", props.projectId)
        props.getCardsByProjectId(props.projectId)
        // console.log(props.cards);

    }, [props.projectId])

    const [viewTasksByCard, setViewTasksByCard] = useState(false)
    const [cardId, setCardId] = useState("")

    const changeCardId = (value) => {
        setCardId(value)
        setViewTasksByCard(true)
    }
    const viewCardsByProject = props.cards.map((card) => {
        // console.log(card._id);
        return <ViewCards changeCard={changeCardId} key={card._id} card={card} />
    })

    return (
        <>
            {viewCardsByProject}
              {
                viewTasksByCard? <TasksByCard cardId={cardId} />:
                null
            }  
           

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