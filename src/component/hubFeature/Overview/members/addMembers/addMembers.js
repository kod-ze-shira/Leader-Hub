import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../../redux/actions/action'
import './addMembers.css'
import $ from 'jquery'


function AddMembers(props) {

    return (
        <>
            <div className="divAddMembers col-lg-4 col-sm-6 col-xs-12 pt-3" onClick={(e) => { props.setMembersList(!props.membersList); e.stopPropagation() }}>
                <div className="container ">
                    <div className="row d-flex align-items-center ">
                        <div className="col-1 col-sm-2  px-0 ">
                            <div className="addMembers d-flex justify-content-center">
                                <div className="fontAddMembers d-flex align-items-center justify-content-center">+</div>
                            </div>
                        </div>
                        <div className="col">
                            <b className="ml-2 membersFont">Add Members</b>
                        </div>
                    </div>
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