
import React, { useEffect } from 'react'
import './allWorkspace.css'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
<<<<<<< HEAD
import ViewWorkspace from '../viewWorkspace/viewWorkspace'
=======
import { ViewWorkspace } from '../viewWorkspace/viewWorkspace';
import './allWorkspace.css';
>>>>>>> dev

// let workspace;



function allWorkspaces(props) {

<<<<<<< HEAD


=======
    function componentDidMount() {

        this.props.getAllWorkspaces();

    }
>>>>>>> dev

    const renderedListWorkspaces = props.workspaces.map(todo => {
        return <ViewWorkspace key={todo._id} workspace={todo} />
    })



    return (
<<<<<<< HEAD

        <div >


            <div className="row mt-5"></div>
            <div className="row mt-5"></div>
            <div className="row mt-5">
                <div className="col-1"></div>
                <div className="col-6 MyWorkspace">My Workspace</div>
                <div className="col-3"></div>
                <div className="col-2 Edit">Edit</div>
                <div className="row mt-2">
                    <div className="col-1"></div>
                    <div className="col-4"><hr></hr></div>

                </div>
                <h1>
                    {props.isConfiguratorOpenWorkspace}
                </h1>


                <div className="col-1" style={{ marginRight: '4px' }}></div>
                <button onClick={() => props.getAllWorkspaces()}>get all worksapaces</button>
                <div className="col-3"></div>
                {renderedListWorkspaces}










            </div>

        </div>


=======
        <>
            <button onClick={() => props.getAllWorkspaces()}>get all worksapaces</button>
            <div className='row allWorkspaces'>{renderedListWorkspaces}</div>
        </>
>>>>>>> dev
    )
}

const mapStateToProps = (state) => {

    return {
        workspaces: state.public_reducer.worksapces,
        isConfiguratorOpenWorkspace: state.workspace_reducer.isConfiguratorOpenWorkspace
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        getWorkspaceByIdFromServer: () => dispatch(actions.getWorkspaceByIdFromServer()),
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(allWorkspaces)
