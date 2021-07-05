import React, { useState, useRef, useEffect } from "react";
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import "./description.css";
import QuillProjectBubble from "../../../hub/project/myQuill/quillProjectBubble";

function Description(props) {
    const projectName = props.workspaces[props.workspaceIndex]?.projects[props.projectIndex]?.name;
    const [projectBeforeChanges] = useState({ ...props.workspaces[props.workspaceIndex].projects[props.projectIndex] })
    let description = props.workspaces[props.workspaceIndex]?.projects[props.projectIndex]?.description

    return (
        <div >
            <div className="row  pt-3 ml-4 mt-3">
                <h4>{projectName}</h4>
            </div>
            <QuillProjectBubble text={description || ''} projectBeforeChanges={projectBeforeChanges} />
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

const mapDispatchToProps = (dispatch) => {
    return {
        setProjectByFiledFromWorkspace: (p) => dispatch(actions.setProjectByFiledFromWorkspace(p))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Description)