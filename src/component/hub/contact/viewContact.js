import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import './contact.css'

function ViewContact(props) {
    useEffect(() => {


    }, [])
    const colors = ["#C967B6", "#8D18AD", "#4D2AC9", "#6A67C9", "#2B79C2", "#32AABA", "#34A38B", "#53A118", "#91A118", "#BDAA1C",
        "#C48E1A", "#C46F1A", "#C43C1A", "#BF2E63", "#C9676F",
        "#FD80E5", "#B620E0", "#6236FC", "#8580FD", "#3598F4", "#40D9ED", "#44D7B6", "#6DD41F", "#BFD41", "#F0D923",
        "#F8B520", "#F88C20", "#F84A20", "#F13B7F", "#FD808B",
        "#FCB3EE", "#CA79E0", "#8868FC", "#B6B3FC", "#67B0F5", "#6FDEED", "#6FD6C0", "#86D44A", "#C4D44A", "#F0DE54",
        "#F7C352", "#F7A452", "#F77352", "#F26B9C", "#FCB3B9"
    ]
    return (
        <>
            <div className="option-contact row mb-2">
                {props.contact.thumbnail ? <img referrerpolicy="no-referrer" src={props.contact.thumbnail} className="thumbnail-contact ml-2" />
                    : <div className="logo-contact ml-2" style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}>{props.contact.name ? props.contact.name[0] : null}</div>}
                <p className="name-contact ">{props.contact.name} </p>   <p className="email-contact ">{props.contact.email} </p></div>
        </>

    )

}
const mapStateToProps = (state) => {

    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }


}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContact)