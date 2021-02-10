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

    }, [props.project.workspace])

    //to chang the project that user selected
    let myProject = props.project;

    const changeSelectedProject = (id) => {
        props.getProjectByIdInServer(id.value)
        $(document).ready(function () {
            $(".project-select").css("color", props.project.color)
        })
        // setSelectedOption(id.value)
        myProject = props.projects.find(p => p._id == id.value)

        props.setProject(myProject)
    }

    const [selectedOption, setSelectedOption] = useState(props.project.name)
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
                    placeholder={props.project.name}
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
export default connect(mapStateToProps, mapDispatchToProps)(SelectProject)




