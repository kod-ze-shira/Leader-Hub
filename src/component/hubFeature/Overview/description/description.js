import React, { useState, useRef } from "react";
import { connect } from 'react-redux';
import  "./description.css";
function Description(props) {
    const projectName = props.workspaces[props.workspaceIndex]?.projects[props.projectIndex]?.name;
    const projectDescription = props.workspaces[props.workspaceIndex]?.projects[props.projectIndex]?.description;
    return (
        <div >
            <div className="row  pt-3 ml-4 mt-3">
                <h4>{projectName}</h4>
            </div>
            <p className="pt-3 pb-4 ml-4 des-overview">{projectDescription}</p>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        workspaces: state.public_reducer.workspaces,
        workspaceIndex: state.public_reducer.indexOfWorkspace,
        projectIndex: state.public_reducer.indexCurrentProject,
    }
}

export default connect(mapStateToProps)(Description)