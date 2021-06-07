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

            <div className="divAddMembers row pt-3 px-2 d-flex align-items-center" >
                <div className="col-2">
                    <div className=" addMembers d-flex align-items-center"  >
                        <div className="fontAddMembers d-flex justify-content-center " data-tip data-for="add_w">+
                        {/* <img className="imgPlus" src={require('../../../../img/ID.png')} alt='+'/> */}
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