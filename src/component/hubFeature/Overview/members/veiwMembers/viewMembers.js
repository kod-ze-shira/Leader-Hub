import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../../redux/actions/action'
import AddMembers from '../addMembers/addMembers';

import './viewMembers.css'

function ViewMembers(props) {
    useEffect(() => {
        props.getMembersByProjectId()
    }, [])

    const members = props.members;
    const colors = ["#C967B6", "#8D18AD", "#4D2AC9", "#6A67C9", "#2B79C2", "#32AABA", "#34A38B", "#53A118", "#91A118", "#BDAA1C",
        "#C48E1A", "#C46F1A", "#C43C1A", "#BF2E63", "#C9676F",
        "#FD80E5", "#B620E0", "#6236FC", "#8580FD", "#3598F4", "#40D9ED", "#44D7B6", "#6DD41F", "#BFD41", "#F0D923",
        "#F8B520", "#F88C20", "#F84A20", "#F13B7F", "#FD808B",
        "#FCB3EE", "#CA79E0", "#8868FC", "#B6B3FC", "#67B0F5", "#6FDEED", "#6FD6C0", "#86D44A", "#C4D44A", "#F0DE54",
        "#F7C352", "#F7A452", "#F77352", "#F26B9C", "#FCB3B9"
    ]

    return (
        <>

            <div className="container-fluid px-0">

                <div className="row divProjectMembers d-flex alight-items-cenetr px-4">
                    <h3>Project Members</h3>
                </div>
                <div className="scrollbarMembers px-4">

                    <AddMembers />

                    <div className="row">
                        {members?.length ?
                            members.map(m => {
                                return <>
                                    <div className="option-contact col-12 mb-2">
                                            {m.thumbnail ?
                                                <img referrerpolicy="no-referrer" src={m.thumbnail} className="thumbnail-contact imgMembers ml-2" />
                                                : <div className="logo-contact imgMembers ml-2" style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}>
                                                    {m.name ? m.name[0] : null}</div>}
                                            <b className="name-contact">{m.name} </b>
                                            <p className="email-contact emailMembers">{m.email} </p>
                                    </div>
                                </>
                            })
                            : null
                        }
                    </div>
                </div>
            </div >


        </>

    )

}
const mapDispatchToProps = (dispatch) => {
    return {
        getMembersByProjectId: () => dispatch(actions.getMembersByProjectId())
    }
}

const mapStateToProps = (state) => {
    return {
        members: state.public_reducer.members
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewMembers);