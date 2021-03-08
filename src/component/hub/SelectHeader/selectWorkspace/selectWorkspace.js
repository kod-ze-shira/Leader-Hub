import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import Select from 'react-select';
import LetterLogo from '../../logo/letterLogo'
import './selectWorkspace.css'

function SelectWorkspace(props) {


    useEffect(() => {

    }, [])

    //to change the workspace that user selected
    let myWorkspace = props.workspace;

    const changeSelectedWorkspace = (id) => {
        myWorkspace = props.workspaces.find(p => p.workspace._id == id.value)
        props.setWorkspace(myWorkspace)
        if (myWorkspace.projectList[0]) {
            props.setProject(myWorkspace.projectList[0])
            props.getCardsByProjectId(myWorkspace.projectList[0]._id)
        }
        else {
            props.setProjectName("No Projects")
            props.setCards({});
        }

    }

    const viewWorkspacesList = props.workspaces.map((workspace) => (
        { value: workspace.workspace._id, label: workspace.workspace.name }
    ))
    const style = {
        control: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#eeeeee' : 'white',
            border: state.isFocused ? 0 : 0,
            // This line disable the blue border
            boxShadow: state.isFocused ? 0 : 0,
            "&:hover": {
                border: state.isFocused ? 0 : 0,
                backgroundColor: state.isFocused ? '#eeeeee' : 'white',
            }
        })
    };

    return (
        <>
            <div className="react-select">
                <LetterLogo className="workspace-logo" nameWorkspace={props.workspace.workspace.name} />
                <Select
                    className="select-workspace"
                    classNamePrefix="select"
                    onChange={(e) => changeSelectedWorkspace(e)}
                    name="color"
                    options={viewWorkspacesList}
                    placeholder={props.workspace.workspace.name}
                    styles={style}
                />
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        projects: state.public_reducer.projects,
        project: state.project_reducer.project,
        workspaces: state.public_reducer.worksapces,
        workspace: state.workspace_reducer.workspace,
        cards: state.public_reducer.cards


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCards: (c) => dispatch(actions.setCards(c)),
        setProjectName: (projectName) => dispatch(actions.setProjectName(projectName)),
        setProject: (project) => dispatch(actions.setProject(project)),
        getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
        setWorkspace: (workspace) => dispatch(actions.setWorkspace(workspace)),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        getProjectByIdInServer: (idProject) => dispatch(actions.getProjectByIdInServer(idProject)),
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(SelectWorkspace)




