import React, { useState, useRef, useEffect } from "react";
import { connect } from 'react-redux';
import "./description.css";
function Description(props) {
    // dangerouslySetInnerHTML={{ __html: this.props.objMagazine.logoQuill }}‏‏

    const projectName = props.workspaces[props.workspaceIndex]?.projects[props.projectIndex]?.name;
    const projectDescription = props.workspaces[props.workspaceIndex]?.projects[props.projectIndex]?.description;
    let description = useRef()
    useEffect(() => {
        description.current.innerHTML = props.workspaces[props.indexWorkspace]?.projects[props.indexProject]?.description
<<<<<<< HEAD
        // description.current.innerHTML ? description.current.innerHTML : ''
=======
        if( description.current.innerHTML==='undefined'){
            description.current.innerHTML='No description'
        }
>>>>>>> dev
    }, [props.workspaces])

    return (
        <div >
            <div className="row  pt-3 ml-4 mt-3">
                <h4>{projectName}</h4>
            </div>
            <p className="pt-3 pb-4 ml-4 des-overview"
                ref={description}
            // dangerouslySetInnerHTML={{ __html: props.workspaces[props.indexWorkspace]?.projects[props.indexProject]?.description }}
            > </p>
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