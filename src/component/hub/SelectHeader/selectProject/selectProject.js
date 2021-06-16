import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import Select from 'react-select';
import { actions } from '../../../../redux/actions/action';
import ProjectStyle from '../../project/projectStyle'
import CreatableSelect from 'react-select/creatable';

function SelectProject(props) {

    const { idProject } = useParams();

    useEffect(() => {

    }, [props.workspaces])

    //to chang the project that user selected
    let project = props.workspaces[props.indexWorkspace].projects[props.indexProject];
    const changeSelectedProject = (id) => {
        props.setCurrentIndexProject(id.projectIndex)
        project = props.workspaces[props.indexWorkspace].projects.find(p => p._id == id.value)
        props.getCardsByProjectId(project._id)
        props.history.push("/" + props.user + "/hub/projectPlatform/" + project._id)
    }
   

    const viewProjectsList = props.workspaces[props.indexWorkspace].projects ?
        props.workspaces[props.indexWorkspace].projects.map((project, index) => (
            project.name ?  {
                value: project._id, label:
                <div className="d-flex flex-row" style={{ color: project.color }}>
                {/* <span className="dot dotProject "
                    style={{ 'background-color': project.color }} >
                </span> */}
                <div style={{marginTop:'0.5px'}}>
                    <ProjectStyle color={project.color}></ProjectStyle>
                </div>
                <span className="select-not-belong project-select-not-belong">{project.name}</span>
            </div >,
                projectIndex: index
            }: null
        )) : null
        const placeholder=props.workspaces[props.indexWorkspace]?.projects[props.indexProject]?.name ?
            <div className="d-flex flex-row" style={{ color: project.color }}>
            <div style={{marginTop:'0.5px'}}>
                <ProjectStyle color={project.color}></ProjectStyle>
            </div>
            <span className="select-not-belong project-select-not-belong">{project.name}</span>
        </div >
       :"All Projects"
  
        // props.workspaces[props.indexWorkspace].projects[props.indexProject].name : "All Projects"
        const style = {
            control: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? '#eeeeee' : 'white',
                border: 0,
                // This line disable the blue border
                boxShadow: 0,
                "&:hover": {
                    border:  0,
                    backgroundColor:'#eeeeee' ,    
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




