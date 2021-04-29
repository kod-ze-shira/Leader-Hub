import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import { withRouter } from 'react-router-dom';
// import Select from 'react-select';
import LetterLogo from '../../logo/letterLogo'
import './selectWorkspace.css'
import Select, { components } from "react-select";

const Input = props => <components.Input {...props} maxLength={5} />;
const maxLength = 5;

function SelectWorkspace(props) {


    useEffect(() => {
        console.log("Input", Input);
    }, [props.workspaces])

    //to change the workspace that user selected
    let myWorkspace = props.workspace;
    const changeSelectedWorkspace = (id) => {
        props.saveIndexOfWorkspaceInRedux(id.workspaceIndex)

        if (myWorkspace.projects[0]) {

            // props.setProjects(myWorkspace.projects)
            // props.setProject(myWorkspace.projects[0])
            //ssssssssssssss
            // props.getCardsByProjectId(myWorkspace.projects[0]._id)
            // if (props.projectPage == true)

            props.history.push("/" + props.user + "/workspace/" + props.workspaces[props.indexOfWorkspace]._id)

        }
        else {
            props.setProjectName("No Projects")
        }

    }

    const viewWorkspacesList = props.workspaces.map((workspace, index) => (
        { value: workspace._id, label: workspace.name, title: workspace.name, workspaceIndex: index }
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
                <LetterLogo className="workspace-logo"
                    nameWorkspace={props.workspaces[props.indexOfWorkspace] ? props.workspaces[props.indexOfWorkspace] : null} />
                <Select
                    className="select-workspace selectInHeader"
                    classNamePrefix="select"
                    onChange={(e) => changeSelectedWorkspace(e)}
                    name="color"
                    options={viewWorkspacesList}
                    placeholder={props.workspaces[props.indexOfWorkspace] ? props.workspaces[props.indexOfWorkspace].name : null}
                    styles={style}
                    components={{ Input }}
                // onInputChange={inputValue =>
                //     (inputValue.length <= maxLength ? inputValue : inputValue.substr(0, maxLength))
                // }
                />
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        projects: state.public_reducer.projects,
        project: state.project_reducer.project,
        workspaces: state.public_reducer.workspaces,
        workspace: state.workspace_reducer.workspace,
        cards: state.public_reducer.cards,
        user: state.public_reducer.userName,
        indexOfWorkspace: state.public_reducer.indexOfWorkspace

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveIndexOfWorkspaceInRedux: (indexWorkspace) => dispatch(actions.saveIndexOfWorkspaceInRedux(indexWorkspace)),
        setCards: (c) => dispatch(actions.setCards(c)),
        setProjectName: (projectName) => dispatch(actions.setProjectName(projectName)),
        setProject: (project) => dispatch(actions.setProject(project)),
        setProjects: (project) => dispatch(actions.setProjects(project)),
        getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
        setWorkspace: (workspace) => dispatch(actions.setWorkspace(workspace)),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        getProjectByIdInServer: (idProject) => dispatch(actions.getProjectByIdInServer(idProject)),
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectWorkspace))
