import React, { useState } from 'react'
import { connect } from 'react-redux';

import { actions } from '../../../redux/actions/action'
import ViewProject from '../project/viewProjectNew/viewProjectNew'
import './projectPlatform.css'
import { workspace } from '../../warps/configurator/workspace/workspace';
import ProjectsList from './projectsList/projectsList'
import { Link } from 'react-router-dom';
import CardsByProject from '../Cards/cardsByProject/cardsByProject';
import TasksByCard from '../task/tasksByCard/tasksByCard'

// import projectsByWorkspace from '../project/projectsByWorkspace/projectsByWorkspace';
import Logo from '../logo/logo'

function projectPlatform(props) {
    const [projectId, setProjectId] = useState(0)

    return (
        <>
            {/* <Link to={`${props.user}/projectPlatform`} > */}
            <div className="body container-fluid">
                <Logo className="logo-workspace" nameWorkspace='Leader hub' />
                < ProjectsList />
                {/* <CardsByProject projectId={props.project._id}></CardsByProject> */}

                <CardsByProject projectId={"600fe82b609f055838b967ff"} />
                <TasksByCard cardId={"6006061269370dacf7af0609"} />
                <div className="add-new-btn ">+</div>

            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        projects: state.project_reducer.project,
        user: state.public_reducer.userName

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspace(idWorkspace))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(projectPlatform)




