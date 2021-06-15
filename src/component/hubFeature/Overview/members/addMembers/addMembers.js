import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../../redux/actions/action'
import './addMembers.css'


function AddMembers(props) {


    const members = props.members;

    const clickAddMembers = () => {
        console.log('clickAddMembers');
        // document.getElementsByClassName('viewMembersList')[0].style.display = 'block';
    }
    return (
        <>

            <div className="divAddMembers row pt-3 ml-2 d-flex align-items-center" onClick={clickAddMembers}  >
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
            {/* <div  className="viewMembersList">
                <ContactList hub={true}/>
            </div> */}

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