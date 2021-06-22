import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../../redux/actions/action'

import './viewMembers.css'

function ViewMembers(props) {

    const { workspaces, projectIndex, workspacesIndex } = props
    const [members, setMembers] = useState(workspaces[workspacesIndex].projects[projectIndex].members)

    // useEffect(() => {
    //     setMembers(workspaces[workspacesIndex].projects[projectIndex].members)
    // }, [members])
    console.log('mmm', members);

    return (
        <>
            {members.length !== 0 ?
                members.map(m => {
                    let mc = m.contact;
                    return (
                        mc ? <>
                            <div className="col-4 pt-3">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-2 d-flex align-items-center">
                                            <img referrerpolicy="no-referrer" src={mc.thumbnail} className="thumbnail-contact imgMembers" />
                                        </div>
                                        <div className="col-6 ml-2">
                                            <b className="name-contact nameMembers">{mc.name} </b>
                                            <p className="email-contact emailMembers ml-2">{mc.email} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </> : null)
                })
                : null
            }


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
        // members: state.overview_reducer.members,
        workspacesIndex: state.public_reducer.indexOfWorkspace,
        workspaces: state.public_reducer.workspaces,
        projectIndex: state.public_reducer.indexCurrentProject
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewMembers);