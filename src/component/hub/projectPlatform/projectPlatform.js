import React from 'react';
import { connect } from 'react-redux';

import { actions } from './../../../redux/actions/action'
import ViewProject from '../project/viewProject/viewProject'
import './projectPlatform.css'
import CardsByProject from '../Cards/cardsByProject/cardsByProject';
import TasksByCard from '../task/tasksByCard/tasksByCard'

// import projectsByWorkspace from '../project/projectsByWorkspace/projectsByWorkspace';
// import Logo from '../../logo/logo'

const mapStateToProps = (state) => {
    return {
        project: state.project_reducer.project,
        user: state.public_reducer.userName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getProjetsByWorkspaceById: () => dispatch(action.getProjetsByWorkspaceById())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(function ProjectPlatform(props) {
    // const viewProjectsByWorkspace = props.projects.map((project) => {
    //     return <ViewProject key={project._id} project={project} />
    // })


    return (
        <>
            <div className="body" to={`${props.user}/projectPlatform`} >
                {/* <CardsByProject projectId={props.project._id}></CardsByProject> */}
                {/* <Logo nameWorkspace='Leader hub' /> */}
                
                <CardsByProject projectId={"600fe82b609f055838b967ff"}></CardsByProject>
                {/* <TasksByCard cardId={"6006061269370dacf7af0609"}></TasksByCard> */}

            </div>
        </>
    )
})