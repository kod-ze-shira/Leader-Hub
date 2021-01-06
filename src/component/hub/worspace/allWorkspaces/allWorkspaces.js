
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'

// let workspace;


function allWorkspaces(props) {
    // useEffect(() => {
    //     // props.getAllWorkspaces();
    // }

    //     , [props]);

    // props.worksapces.forEach(element => {
    //     <wor ghg={element}>element</wor>
    // })
    const getAllWorkspaces = () => {
        props.getAllWorkspaces();
    }
    return (
        <>
            <button onClick={getAllWorkspaces}>get all worksapaces</button>
        </>
    )
}

const mapStateToProps = (state) => {
    // workspace = state.public_reducer.worksapces
    return {
        workpaces: state.public_reducer.worksapces
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer())
        //GET_ALL_WORKSPACES_FROM_SERVER

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(allWorkspaces)