import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import Select from 'react-select';


function SelectProject(props) {

    const { idProject } = useParams();

    useEffect(() => {
        // props.getProjectByIdInServer(idProject)
        // if (!props.workspaces[props.indexWorkspace].projects[props.indexProject])
        //     props.getProjectsByWorkspaceId(props.workspaces[props.indexWorkspace].projects[props.indexProject].workspace)
    }, [props.workspaces])

    //to chang the project that user selected
    // let project = props.workspaces[props.indexWorkspace].projects[props.indexProject];
    let project = props.workspaces[props.indexWorkspace].projects[props.indexProject];

    const changeSelectedProject = (id) => {
        props.setCurrentIndexProject(id.projectIndex)
        project = props.workspaces[props.indexWorkspace].projects.find(p => p._id == id.value)
        // props.setProject(project)
        // console.log(project)
        props.getCardsByProjectId(project._id)
        // console.log("my project  " + props.workspace)
    }

    const dot = (color = '#ccc') => ({
        alignItems: 'center',
        display: 'flex',
        color: props.workspaces[props.indexWorkspace].projects[props.indexProject].color,

        ':before': {
            backgroundColor: props.workspaces[props.indexWorkspace].projects[props.indexProject].color,
            borderRadius: 10,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 10,
            width: 10,
        },
    });

    const colourStyles = {
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
        }),
        option: (styles, { isDisabled, isFocused, isSelected }) => {
            const color = props.workspaces[props.indexWorkspace].projects[props.indexProject].color;
            return {
                ...styles,
                backgroundColor: isDisabled,

                // color:props.workspaces[props.indexWorkspace].projects[props.indexProject].color  ? props.workspaces[props.indexWorkspace].projects[props.indexProject].color : "red"
                //     ? null
                //     : isSelected
                //         ? color
                //         : isFocused
                //             ? "white"
                //             : null,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? color > 2
                            ? 'white'
                            : 'black'
                        : "black",
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    color:
                        !isDisabled && (isSelected ? color : "black"),
                },
            };
        },
        input: styles => ({ ...styles, ...dot() }),
        placeholder: styles => ({ ...styles, ...dot() }),
        singleValue: (styles, { color }) => ({ ...styles, ...dot(color) }),
        // option:(styles, { color }) => ({ ...styles, ...dot(color) }),

    };

    const viewProjectsList = props.workspaces[props.indexWorkspace].projects ?
        props.workspaces[props.indexWorkspace].projects.map((project, index) => (
            { value: project._id, label: project.name, projectIndex: index }
        )) : null
    return (
        <>
            <div className="react-select">
                <Select
                    className="select-project"
                    classNamePrefix="select"
                    onChange={(e) => changeSelectedProject(e)}
                    name="color"
                    options={viewProjectsList}
                    placeholder={props.workspaces[props.indexWorkspace].projects[props.indexProject].name ?
                        props.workspaces[props.indexWorkspace].projects[props.indexProject].name : "All Projects"}
                    styles={colourStyles}

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
        indexProject: state.public_reducer.indexCurrentProject,
        indexWorkspace: state.public_reducer.indexOfWorkspace
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentIndexProject: (indexProject) => dispatch(actions.setCurrentIndexProject(indexProject)),
        saveIndexOfWorkspaceInRedux: (indexWorkspace) => dispatch(actions.saveIndexOfWorkspaceInRedux(indexWorkspace)),
        setCard: (card) => dispatch(actions.setCard(card)),
        setCards: (cards) => dispatch(actions.setCards(cards)),
        setProject: (project) => dispatch(actions.setProject(project)),
        setCardName: (cardName) => dispatch(actions.setCardName(cardName)),
        getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
        getProjectByIdInServer: (idProject) => dispatch(actions.getProjectByIdInServer(idProject)),
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(SelectProject)




