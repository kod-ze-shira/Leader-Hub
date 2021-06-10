import React from 'react';
import {connect} from 'react-redux';

function Logs(props) {
    // const { members } = props.members
    return (
        <>
            <div className="container backgroundWhiteAndBorderRadius">
            </div>
        </>

    )

}
const mapDispatchToProps = (dispatch) => {
}

const mapStateToProps = (state) => {
    return {
        indexOfWorkspace:state.public_reducer.indexOfWorkspace,
        indexCurrentProject:state.public_reducer.indexCurrentProject,
        workspaces:state.public_reducer.workspaces
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logs);