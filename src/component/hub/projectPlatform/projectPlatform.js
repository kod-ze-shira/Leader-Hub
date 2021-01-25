import React from 'react';
import { connect } from 'react-redux';

import { actions } from './../../../redux/actions/action'
import ViewProject from '../project/viewProject/viewProject'
import './projectPlatform.css'
// import projectsByWorkspace from '../project/projectsByWorkspace/projectsByWorkspace';

const mapStateToProps = (state) => {
    return {
        project: state.project_reducer.name,
        // user: state.public_reducer.userName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getProjetsByWorkspaceById: () => dispatch(action.getProjetsByWorkspaceById())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(function NewTasck(props) {
    // const viewProjectsByWorkspace = props.projects.map((project) => {
    //     return <ViewProject key={project._id} project={project} />
    // })


    return (
        <>
            <div to={`${props.user}/projectPlatform`} >
            <div></div>
        <h1>hyush</h1>

            </div>
        </>
    )
})