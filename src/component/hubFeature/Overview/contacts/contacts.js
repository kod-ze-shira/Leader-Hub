import React, { useState } from 'react'
import $ from 'jquery'
import './contacts.css'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip';



function Contacts(props) {
    const [contacts, setContacts] = useState(['mina', 'tzippy', 'racheli','dvory','dasy','yael','tamar'])
    return (
        <>
            {contacts.length ?
                <div className='container'>
                    <div className='row'>
                        {contacts.map(c =>

                            <div  className='col-4 d-flex justify-content-center'>
                                {c}
                            </div>

                        )}
                    </div>
                </div> :
                null
            }
        </>
    )


}
export default connect(
    (state) => {
        return {
            contacts: state.public_reducer.contacts,
        }
    }
    // (dispatch) => {
    //     return {
    //         getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
    //         getCardsOfProject: (projectId) => dispatch(actions.getCardsOfProject(projectId)),
    //         changeTaskplace: (obj) => dispatch(actions.changeTaskplace(obj)),
    //         moveTaskBetweenCards: (taskAndCard) => dispatch(actions.moveTaskBetweenCards(taskAndCard)),

    //     }
    // }
)(Contacts)
