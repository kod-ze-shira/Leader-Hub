import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select, { components } from "react-select";
import { actions } from '../../../../redux/actions/action';
import { useParams } from 'react-router-dom';

// import Select from 'react-select';
import LetterLogo from '../../logo/letterLogo';
import './selectWorkspace.css';
import Background from '../../../../assets/img/down-arrow.svg';

const Input = props => <components.Input {...props} maxLength={5} />;

function SelectWorkspace(props) {
    let { idWorkspace, idProject } = useParams();
    useEffect(() => {
        if (props.workspaces) {
            if (idWorkspace == undefined) {
                //לבדוק מקרי מקצה
                idWorkspace = window.location.pathname.split('/')[4]
            }
            if (window.location.href.indexOf('workspace') != -1) {
                // props.getProjectsByWorkspaceId(idWorkspace)
                let w 
                // = props.workspaces.find(w => w._id === idWorkspace)
                // props.setWorkspace(w)
                w = props.workspaces.findIndex(w => w._id == idWorkspace)
                // if (w != -1)
                props.saveIndexOfWorkspaceInRedux(w)

            }
            else
                if (window.location.href.indexOf('allProjects') !== -1) {
                    props.saveIndexOfWorkspaceInRedux(0)
                }
                else
                    if (window.location.href.indexOf('projectPlatform') !== -1) {

                        for (let index = 0; index < props.workspaces.length; index++) {
                            for (let j = 0; j < props.workspaces[index].projects.length; j++) {
                                if (idProject === props.workspaces[index].projects[j]._id) {
                                    props.saveIndexOfWorkspaceInRedux(index)

                                    // props.setWorkspace(props.workspaces[index])
                                    // props.setProject(props.workspaces[index].projects[j])
                                    // props.getCardsByProjectId(props.workspaces[index].projects[j]._id)
                                }
                            }
                        }
                    }
        }
    }, [props.workspace, props.indexOfWorkspace])
    // useEffect(() => {
    //     // console.log("props.workspaces", props.workspaces);
    // }, [props.workspaces])

    //to change the workspace that user selected
    const changeSelectedWorkspace = (workspace) => {

        props.saveIndexOfWorkspaceInRedux(workspace.workspaceIndex)
        props.history.push("/" + props.user + "/hub/workspace/" + workspace.value)



    }


    const viewWorkspacesList = props.workspaces.map((workspace, index) => (
        {
            value: workspace._id,
            label: <div className="d-flex flex-row" >
                <div>
                    <div className=" logo-w-little header-w-select"
                        style={{ backgroundColor: workspace.color, display: 'inline-block', textAlign: 'center' }}
                    >
                        {workspace.name ? workspace.name[0].toUpperCase() : null}
                    </div>
                </div>
                <div className="select-not-belong header-w-name">
                    {workspace.name}
                </div>
            </div >,
            title: workspace.name,
            workspaceIndex: index
        }
    ))
    const placeholderWorkspace = props.workspaces[props.indexOfWorkspace] ?
        <div className="d-flex flex-row" >
            <div>
                <div className="  logo-w-little header-w-select "
                    style={{ backgroundColor: props.workspaces[props.indexOfWorkspace].color, display: 'inline-block', textAlign: 'center' }}
                >
                    {props.workspaces[props.indexOfWorkspace].name ? props.workspaces[props.indexOfWorkspace].name[0].toUpperCase() : null}
                </div>
            </div>
            <div className="select-not-belong header-w-name">
                {props.workspaces[props.indexOfWorkspace].name}
            </div>
        </div >

        : null
    // const viewWorkspacesList = props.workspaces.map((workspace, index) => (
    //     {
    //         value: workspace._id,
    //         label: workspace.name,
    //         title: workspace.name,
    //         workspaceIndex: index
    //     }
    // ))



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
                backgroundColor: state.isFocused ? 'transparent' : 'transparent',
            }
        })


    };

    return (
        <>
            <div className="react-select">
                {/* <LetterLogo className="workspace-logo"

                    nameWorkspace={props.workspaces[props.indexOfWorkspace] ? props.workspaces[props.indexOfWorkspace] : null} /> */}
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
                    placeholder={placeholderWorkspace}
                    // placeholder={props.workspaces[props.indexOfWorkspace] ? props.workspaces[props.indexOfWorkspace].name : null}
                    styles={style}
                    components={{ Input }}
                />
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        projects: state.public_reducer.projects,
        workspaces: state.public_reducer.workspaces,
        cards: state.public_reducer.cards,
        user: state.public_reducer.userName,
        indexOfWorkspace: state.public_reducer.indexOfWorkspace

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveIndexOfWorkspaceInRedux: (indexWorkspace) => dispatch(actions.saveIndexOfWorkspaceInRedux(indexWorkspace)),
        setCards: (c) => dispatch(actions.setCards(c)),
        setProjects: (project) => dispatch(actions.setProjects(project)),
        getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
        getProjectByIdInServer: (idProject) => dispatch(actions.getProjectByIdInServer(idProject)),
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectWorkspace))
