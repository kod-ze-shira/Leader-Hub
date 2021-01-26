import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { actions } from './../../../redux/actions/action'
import ViewProject from '../project/viewProjectNew/viewProjectNew'
import './projectPlatform.css'
import { workspace } from '../../warps/configurator/workspace/workspace';
import ProjectsList from './projectsList/projectsList'
import { Link } from 'react-router-dom';

function projectPlatform(props) {

    return (
        <>
            {/* <Link to={`${props.user}/projectPlatform`} > */}
            <div className="body container-fluid">
                <div className="row justify-content-center">
                    < ProjectsList />
                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        projects: state.project_reducer.project,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspace(idWorkspace))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(projectPlatform)




