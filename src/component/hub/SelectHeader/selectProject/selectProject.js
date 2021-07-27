import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import Select from 'react-select';
import { actions } from '../../../../redux/actions/action';
import CreatableSelect from 'react-select/creatable';
import Background from '../../../../assets/img/down-arrow.svg';
import { ProjectStyleLabel } from '../../project/projectStyle.style'

function SelectProject(props) {
    debugger
    const { idProject } = useParams();
    let [project, setProject] = useState()
    useEffect(() => {
        setProject(props.workspaces[props.indexWorkspace].projects[props.indexProject]);

    }, [props.indexWorkspace])
    //to chang the project that user selected
    const changeSelectedProject = (id) => {
        debugger
        props.setCurrentIndexProject(id.projectIndex)
        project = props.workspaces[props.indexWorkspace].projects.find(p => p._id === id.value)
        props.getCardsByProjectId(project._id)
        props.history.push("/" + props.user + "/hub/projectPlatform/" + project._id)
    }

    const dot = (color = '#ccc') => ({
        alignItems: 'center',
        display: 'flex',
        color: props.workspaces[props.indexWorkspace].projects[props.indexProject] ? props.workspaces[props.indexWorkspace].projects[props.indexProject].color : null,

        ':before': {
            backgroundColor: props.workspaces[props.indexWorkspace].projects[props.indexProject] ? props.workspaces[props.indexWorkspace].projects[props.indexProject].color : null,
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
            backgroundColor: state.isFocused ? 'transparent' : 'transparent',
            border: state.isFocused ? 0 : 0,
            // This line disable the blue border
            boxShadow: state.isFocused ? 0 : 0,
            "&:hover": {
                border: state.isFocused ? 0 : 0,
                backgroundColor: state.isFocused ? 'transparent' : 'transparent',

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
            project.name ? {
                value: project._id, label:
                    <div className="d-flex flex-row" style={{ color: project.color }}>
                        {/* <span className="dot dotProject "
                    style={{ 'background-color': project.color }} >
                </span> */}
                        <div style={{ marginTop: '0.5px' }}>
                            <ProjectStyleLabel color={project.color}></ProjectStyleLabel>
                        </div>
                        <span className="select-not-belong project-select-not-belong">{project.name}</span>
                    </div >,
                projectIndex: index
            } : null
        )) : null
    const placeholder = props.workspaces[props.indexWorkspace]?.projects[props.indexProject]?.name ?
        <div className="d-flex flex-row" style={{ color: project && project.color }}>
            <div style={{ marginTop: '0.5px' }}>
                <ProjectStyleLabel color={project && project.color}></ProjectStyleLabel>
            </div>
            <span className="select-not-belong project-select-not-belong">{project && project.name}</span>
        </div >
        : "All Projects"

    // props.workspaces[props.indexWorkspace].projects[props.indexProject].name : "All Projects"
    const style = {
        control: (base, state) => ({
            ...base,
            backgroundSize: '10px 10px',
            backgroundPosition: '90%',
            backgroundImage: `url(${Background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: state.isFocused ? 'transparent' : 'transparent',
            border: 0,
            // This line disable the blue border
            boxShadow: 0,
            "&:hover": {
                border: 0,
                backgroundColor: 'transparent',
            }
        })
    };
    return (
        <>
            <div className="react-select">
                <CreatableSelect
                    theme={theme => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary25: '#68c7cb1a',
                            primary: '#68C7CB',
                            primary50: '#68C7CB',
                        },
                    })}
                    onChange={(e) => changeSelectedProject(e)}
                    className="select-project"
                    placeholder={placeholder}
                    name="color"
                    options={viewProjectsList}
                    // placeholder={props.workspaces[props.indexWorkspace].projects[props.indexProject] ?
                    //     props.workspaces[props.indexWorkspace].projects[props.indexProject].name : "All Projects"}
                    styles={style}

                />

            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.public_reducer.userName,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectProject))




