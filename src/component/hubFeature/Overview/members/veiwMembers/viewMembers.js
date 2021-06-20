import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../../redux/actions/action'

import './viewMembers.css'

function ViewMembers(props) {
    useEffect(() => {
        props.getMembersByProjectId()
        
    }, [])



    const members = props.members;

    return (
        <>


            <div className="pt-3">
                {members?.length ?
                    members.map(m => {
                        return <>
                            {/* <div className="mb-2"> */}
                                {/* <div className="row ml-4"> */}
                                    <div className="col-4">
                                        <div className="col-2 d-flex align-items-center">
                                            <img referrerpolicy="no-referrer" src={m.thumbnail} className="thumbnail-contact imgMembers" />
                                        </div>
                                        <div className="col-6 ml-2">
                                            <b className="name-contact nameMembers">{m.name} </b>
                                            <p className="email-contact emailMembers ml-2">{m.email} </p>
                                        </div>
                                    </div>
                                {/* </div> */}
                            {/* </div> */}
                        </>
                    })
                    : null
                }
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
        members: state.overview_reducer.members,
        workspacesIndex: state.public_reducer.indexOfWorkspace,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewMembers);