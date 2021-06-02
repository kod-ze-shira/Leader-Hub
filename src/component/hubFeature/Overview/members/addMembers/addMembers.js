import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../../redux/actions/action'
import './addMembers.css'


function AddMembers(props) {
    // useEffect(() => {
    //     props.getMembersByProjectId()
    // }, [])

    const members = props.members;

    
    return (
        <>
            <div className="row pt-3 px-3"  >
                <div className="d-flex alighn-items-center addMembers"  >
                    <div className="fontAddMembers" data-tip data-for="add_w">+
                              {/* <img src="../../../../../img/ID.png" alt="plus"/> */}
                    </div>
                </div>
                <b className="mt-4 ml-2 MembersFont">Add Members</b>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(AddMembers);