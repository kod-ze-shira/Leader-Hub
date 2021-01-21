
import React, { useEffect } from 'react'
import './allWorkspace.css'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import { ViewWorkspace } from '../viewWorkspace/viewWorkspace'

// let workspace;



function allWorkspaces(props) {

    function componentDidMount() {

        this.props.getAllWorkspaces();

    }

    const renderedListWorkspaces = props.workspaces.map(todo => {
        return <ViewWorkspace key={todo._id} workspace={todo} />
    })



    return (

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
                <button onClick={() => props.getAllWorkspaces()}>get all worksapaces</button>
                <div className="row">
                    <div className="col-1"></div>

                    {renderedListWorkspaces}
                </div>





            </div>

        </div>


    )
}

const mapStateToProps = (state) => {

    return {
        workspaces: state.public_reducer.worksapces
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(allWorkspaces)
