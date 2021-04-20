
import React, { useEffect, useState } from 'react'
import "./letterLogo.css";
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom';
import { actions } from '../../../redux/actions/action'

function LetterLogo(props) {

    let { idWorkspace, idProject } = useParams();
    useEffect(() => {
        if (props.workspaces) {
            if (window.location.href.indexOf('workspace') != -1) {
                // props.getProjectsByWorkspaceId(idWorkspace)
                let w = props.workspaces.find(w => w._id == idWorkspace)
                props.setWorkspace(w)
            }
            else
                if (window.location.href.indexOf('allProjects') != -1)
                    props.setWorkspace(props.workspaces[0])
                else
                    if (window.location.href.indexOf('projectPlatform') != -1) {

                        for (let index = 0; index < props.workspaces.length; index++) {
                            for (let j = 0; j < props.workspaces[index].projects.length; j++) {
                                if (idProject == props.workspaces[index].projects[j]._id) {
                                    props.setWorkspace(props.workspaces[index])
                                    props.setProject(props.workspaces[index].projects[j])
                                    //sssssssss
                                    // props.getCardsByProjectId(props.workspaces[index].projects[j]._id)
                                }
                            }
                        }
                    }
        }
    }, [props.workspace])

    return (
        <>

            {props.workspace ?
                <span className='logoW' style={{ "backgroundColor": props.workspace.color }} >
                    {props.workspace.name ?
                        props.workspace.name[0].toUpperCase() : null}
                    {
                        props.workspace.name && props.workspace.name.indexOf(" ") && props.workspace.name.indexOf(" ") + 1 ?
                            props.workspace.name[props.workspace.name.indexOf(" ") + 1].toUpperCase() : null
                    }
                </span>
                : null}

        </>)

}


const mapStateToProps = (state) => {

    return {
        workspaces: state.public_reducer.workspaces,
        workspace: state.workspace_reducer.workspace,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setWorkspace: (workspaceId) => dispatch(actions.setWorkspace(workspaceId)),
        setProject: (project) => dispatch(actions.setProject(project)),
        getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LetterLogo)