import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ContactList from '../../../../hub/contact/contactList'
import { actions } from '../../../../../redux/actions/action'
import './addMembers.css'


function AddMembers(props) {

    const members = props.members;
    function clickAddMembers() {
        document.getElementsByClassName('addMembersList')[0].style.display = 'block'

    }

    return (
        <>
            <div className="divAddMembers row pt-3 px-2 d-flex align-items-center" onClick={clickAddMembers} >
                <div className="col-2">
                    <div className="addMembers "  >
                        <div className="fontAddMembers">+
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <b className="ml-2 membersFont">Add Members</b>
                </div>
            </div>
            <div className="addMembersList">
                <ContactList />
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