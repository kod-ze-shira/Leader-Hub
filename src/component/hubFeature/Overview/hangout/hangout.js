import React, { useState } from "react";
import { connect } from 'react-redux';
import { actions } from "../../../../redux/actions/action";
import './hangout.css'
function Hangout(props) {
    const { userName } = props;
    const chatId = props.workspaces[props.workspaceIndex]?.projects[props.projectIndex]?.chatId;
    return (
        <iframe className="iframeHangout"
            src={`https://chat.leader.codes/${userName}/hangout/${chatId}`}
            // src={`https://chat.leader.codes/${userName}/hangout/609d014e5cad310a76d861a8`}
            title="hangout">
        </iframe>
    )
}
const mapStateToProps = (state) => {
    return {
        workspaces: state.public_reducer.workspaces,
        workspaceIndex: state.public_reducer.indexOfWorkspace,
        projectIndex: state.public_reducer.indexCurrentProject,
        userName: state.public_reducer.userName
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // newChat: () => dispatch(actions.newChat()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Hangout)