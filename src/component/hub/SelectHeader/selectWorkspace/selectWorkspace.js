import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import Select from 'react-select';


function SelectWorkspace(props) {


    useEffect(() => {
        
    }, [])

    //to chang the workspace that user selected
    let myWorkspace = props.worksapce;
    const changeSelectedWorkspace = (id) => {

        myWorkspace = props.workspaces.find(p => p._id == id.value)
        props.setWorkspace(myWorkspace)
        console.log(myWorkspace)
        if (myWorkspace.projects.length > 0)
            props.setProject(myWorkspace.projects[0])

        else
            props.setProjectName("No Projects")
    }

    const viewWorkspacesList = props.workspaces.map((workspace) => (
        { value: workspace._id, label: workspace.name }
    ))
    return (
        <>
            <div className="react-select">

                <Select
                    classNamePrefix="select"
                    onChange={(e) => changeSelectedWorkspace(e)}
                    name="color"
                    options={viewWorkspacesList}
                    placeholder={props.workspace.name}
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




