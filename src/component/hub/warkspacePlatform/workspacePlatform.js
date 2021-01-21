import React from 'react';
import { connect } from 'react-redux';

import { actions } from '../../../redux/actions/action'
import { ViewWorkspaceName } from '../../warps/configurator/viewWorkspaceName/viewWorkspaceName'
import './workspacePlatform.css'

const mapStateToProps = (state) => {
    return {
        workspaces: state.public_reducer.worksapces,
        user: state.public_reducer.userName

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(function NewTasck(props) {
    const renderedWorkspacesName = props.workspaces.map(todo => {
        return <ViewWorkspaceName key={todo._id} workspace={todo} />
    })

    return (
        <div className="warkspace-platform " to="/workspacePlatform" >
            <div className="container-fluid">
                <button className="warkspace-paltform-show pt-5 pl-5 row" onClick={() => props.getAllWorkspaces()}
                >
                    <div class="arrow-down mt-3 mr-3 ml-5"></div>
                Recent workspace
                </button>
                <div className="border-bottom row mx-5 mt-3"></div>

                <div className="aa">{renderedWorkspacesName}</div>
            </div>
        </div>
    )
})




