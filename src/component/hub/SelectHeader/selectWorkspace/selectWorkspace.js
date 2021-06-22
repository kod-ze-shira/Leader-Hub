import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select, { components } from "react-select";
import { actions } from '../../../../redux/actions/action';
// import Select from 'react-select';
import LetterLogo from '../../logo/letterLogo';
import './selectWorkspace.css';
import Background from '../../../img/down-arrow.svg';

const Input = props => <components.Input {...props} maxLength={5} />;

function SelectWorkspace(props) {


    useEffect(() => {
        // console.log("props.workspaces", props.workspaces);
    }, [props.workspaces])

    //to change the workspace that user selected
    const changeSelectedWorkspace = (id) => {

        props.saveIndexOfWorkspaceInRedux(id.workspaceIndex)


        // if (myWorkspace.projects[0]) {
        props.history.push("/" + props.user + "/hub/workspace/" + props.workspaces[props.indexOfWorkspace]._id)

        // }
        // else {
        //     props.setProjectName("No Projects")
        // }

    }

    const viewWorkspacesList = props.workspaces.map((workspace, index) => (
        { value: workspace._id, label: workspace.name, title: workspace.name, workspaceIndex: index }
    ))



    const style = {
        control: (base, state) => ({
            ...base,
            backgroundSize: '10px 10px',
            backgroundPosition: '90%',
            backgroundImage: `url(${Background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: state.isFocused ? '#eeeeee' : 'white',
            border: 0,
            // This line disable the blue border
            boxShadow: 0,
            "&:hover": {
                border: 0,
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
                    theme={theme => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary25: '#68c7cb1a',
                            primary: '#68C7CB',
                            primary50: '#68C7CB',
                        },
                    })}
                    className="select-workspace selectInHeader"
                    classNamePrefix="select"
                    onChange={(e) => changeSelectedWorkspace(e)}
                    name="color"
                    options={viewWorkspacesList}
                    // placeholder={placeholder}
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
        getProjectByIdInServer: (idProject) => dispatch(actions.getProjectByIdInServer(idProject)),
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectWorkspace))
