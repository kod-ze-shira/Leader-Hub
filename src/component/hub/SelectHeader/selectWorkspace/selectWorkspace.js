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
    let myWorkspace = props.worksapce;
    const changeSelectedWorkspace = (id) => {

        myWorkspace = props.workspaces.find(p => p._id == id.value)
        props.setWorkspace(myWorkspace)
        if (myWorkspace.projects[0]) {
            props.setProject(myWorkspace.projects[0])
            console.log("hi " + props.project)
        }
        else
            props.setProjectName("No Projects")
    }

    const viewWorkspacesList = props.workspaces.map((workspace) => (
        { value: workspace._id, label: workspace.name }
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
                <LetterLogo className="workspace-logo" nameWorkspace={props.workspace.name} />
                <Select
                    className="select-workspace"
                    classNamePrefix="select"
                    onChange={(e) => changeSelectedWorkspace(e)}
                    name="color"
                    options={viewWorkspacesList}
                    placeholder={props.workspace.name}
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
        workspace: state.workspace_reducer.workspace


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setProjectName: (projectName) => dispatch(actions.setProjectName(projectName)),
        setProject: (project) => dispatch(actions.setProject(project)),
        setWorkspace: (workspace) => dispatch(actions.setWorkspace(workspace)),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        getProjectByIdInServer: (idProject) => dispatch(actions.getProjectByIdInServer(idProject)),
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(SelectWorkspace)




