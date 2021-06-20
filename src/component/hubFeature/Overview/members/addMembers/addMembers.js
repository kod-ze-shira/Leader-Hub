import React, { useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../../redux/actions/action'
import './addMembers.css'
import ListMembers from '../listMembers/listMembers'


function AddMembers(props) {

console.log('memberListInAddMembers',props.membersList);
    return (
        <>
            <div className="divAddMembers col-4 pt-3 ml-2 d-flex align-items-center" onClick={e => props.setMembersList(!props.membersList)}  >
                <div className="col-2">
                    <div className="addMembers"  >
                        <div className="fontAddMembers d-flex align-items-center justify-content-center">+
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <b className="ml-2 membersFont">Add Members</b>
                </div>
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