
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import { ViewWorkspace } from '../viewWorkspace/viewWorkspace'

// let workspace;


function allWorkspaces(props) {

    // useEffect(() => {

    // }

    // , [props]);
    // useEffect(() => {
    //     // props.getAllWorkspaces();
    // }

    //     , [props]);

    // props.worksapces.forEach(element => {
    //     <wor ghg={element}>element</wor>
    // })
    const renderedListWorkspaces = props.workspaces.map(todo => {
        return <ViewWorkspace key={todo._id} workspace={todo} />
    })
    return (
        <>
            <button onClick={() => props.getAllWorkspaces()}>get all worksapaces</button>
            <div>{renderedListWorkspaces}</div>
        </>
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