import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import Select from 'react-select';


function SelectProject(props) {

    const { idProject } = useParams();

    useEffect(() => {
        props.getProjectByIdInServer(idProject)
        props.getProjectsByWorkspaceId(props.project.workspace)
        console.log("project" + props.projects)
    }, [])


    //to chang the project that user selected
    let myProject = props.project;

    const changeSelectedProject = (id) => {

        myProject = props.workspace.projects.find(p => p._id == id.value)
        props.setProject(myProject)
        console.log(myProject)

    }

    const viewProjectsList = props.workspace.projects.map((project) => (
        { value: project._id, label: project.name }
    ))
    return (
        <>
            <div className="react-select">

                <Select
                    classNamePrefix="select"
                    onChange={(e) => changeSelectedProject(e)}
                    name="color"
                    options={viewProjectsList}
                    placeholder={props.project.name}
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
        setCard: (card) => dispatch(actions.setCard(card)),
        setProject: (project) => dispatch(actions.setProject(project)),
        setCardName: (cardName) => dispatch(actions.setCardName(cardName)),
        getProjectByIdInServer: (idProject) => dispatch(actions.getProjectByIdInServer(idProject)),
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(SelectProject)




