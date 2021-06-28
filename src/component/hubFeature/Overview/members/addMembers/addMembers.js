import React, { useState ,useRef} from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../../redux/actions/action'
import './addMembers.css'
// import ListMembers from '../listMembers/listMembers'


function AddMembers(props) {
const divAddMembers =useRef()
// divAddMembers.current.removeEventListener("click");
    return (
        <>
            <div className="divAddMembers col-md-4  col-sm-12 pt-3  "  ref={divAddMembers} onClick={(e) =>{ props.setMembersList(!props.membersList); e.stopPropagation()}}>
                <div className="container">
                    <div className="row d-flex align-items-center">
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