import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import Select from 'react-select';


function SelectWorkspace(props) {

    const { idProject } = useParams();

    useEffect(() => {
        // props.getProjectByIdInServer(idProject)
        // props.getProjectsByWorkspaceId(props.project.workspace)
        // console.log("project" + props.projects)

    }, [props.workspace])

    //to chang the project that user selected
    let myProject = props.project;

    console.log("workspace  " + props.workspace)

    const changeSelectedProject = (id) => {

        // setSelectedOption(id.value)
        myProject = props.projects.find(p => p._id == id.value)

        props.setProject(myProject)
    }

    const [selectedOption, setSelectedOption] = useState("")

    const viewProjectsList = props.projects.map((project) => (
        { value: project._id, label: project.name }
    ))
    return (
        <>
            <div className="react-select">

                <Select
                    // className="basic-single "
                    classNamePrefix="select"
                    onChange={(e) => changeSelectedProject(e)}
                    defaultValue={selectedOption}
                    name="color"
                    value={selectedOption}
                    options={viewProjectsList}
                    placeholder={"my workspace"}
                // selectedValue={props.project.name}
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
        workspace: state.workspace_reducer.worksapce,


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setProject: (project) => dispatch(actions.setProject(project)),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        getProjectByIdInServer: (idProject) => dispatch(actions.getProjectByIdInServer(idProject)),
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(SelectWorkspace)




