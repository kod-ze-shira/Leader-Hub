import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import './contact.css'
import $ from 'jquery'
import { actions } from '../../../redux/actions/action'


function ViewContact(props) {
    const [admin, setAdmin] = useState(false)
    useEffect(() => {


    }, [])

    const colors = ["#C967B6", "#8D18AD", "#4D2AC9", "#6A67C9", "#2B79C2", "#32AABA", "#34A38B", "#53A118", "#91A118", "#BDAA1C",
        "#C48E1A", "#C46F1A", "#C43C1A", "#BF2E63", "#C9676F",
        "#FD80E5", "#B620E0", "#6236FC", "#8580FD", "#3598F4", "#40D9ED", "#44D7B6", "#6DD41F", "#BFD41", "#F0D923",
        "#F8B520", "#F88C20", "#F84A20", "#F13B7F", "#FD808B",
        "#FCB3EE", "#CA79E0", "#8868FC", "#B6B3FC", "#67B0F5", "#6FDEED", "#6FD6C0", "#86D44A", "#C4D44A", "#F0DE54",
        "#F7C352", "#F7A452", "#F77352", "#F26B9C", "#FCB3B9"
    ]
    const [findMember, setFindMember] = useState(false)
    const [contactId, setContactId] = useState()


    const assingTaskToContact = (email) => {
        let member
        let assign = props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].assignTo1
        let isExistContactInList = false
        let i
        for (i = 0; i < assign.length; i++) {

            if (assign[i].contact._id == props.contact._id)
                isExistContactInList = true

        }
        if (!isExistContactInList) {
            if (admin && props.contact._id == contactId)
                member = { "email": email, "level": "admin" }
            else
                member = { "email": email }
            props.assingToMany(member)
            // props.viewToastMassege({ show: true, massege: 'Task assign!!' })

        }
    }
    const markAsAdmin = (contactId) => {
        setAdmin(true)
        setContactId(contactId)
    }
    return (
        <>
            <div className="option-contact row mb-2" onClick={() => assingTaskToContact(props.contact.email)}>
                {props.contact.thumbnail ? <img referrerpolicy="no-referrer" src={props.contact.thumbnail} className="thumbnail-contact ml-3" />
                    : <div className="logo-contact ml-3" style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}>{props.contact.name ? props.contact.name[0] : null}</div>}
                <p className="name-contact ">{props.contact.name} </p>   <p className="email-contact ">{props.contact.email} </p>
                <input type="radio" onClick={(e) => e.stopPropagation()} onChange={() => markAsAdmin(props.contact._id)}></input>
            </div>
        </>

    )

}
const mapStateToProps = (state) => {

    return {
        cards: state.public_reducer.cards,
        indexCurrentCard: state.public_reducer.indexCurrentCard,
        indexCurrentTask: state.public_reducer.indexCurrentTask,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        assingTo: (emailOfContact) => dispatch(actions.assingTo(emailOfContact)),
        assingToMany: (member) => dispatch(actions.assingToMany(member)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContact)
