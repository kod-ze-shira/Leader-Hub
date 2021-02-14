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

        console.log("my project  "+props.workspace)
        // if (myProject.cards[0]) {
        //     props.setProject(myProject.cards[0])
        //     // alert("hi ")
        // }
        // else {
        //     props.setProjectName("No Projects")
        //     // alert("else")
        // }

    }
   
    const dot = (color = '#ccc') => ({
        alignItems: 'center',
        display: 'flex',
        color: props.project.color,

        ':before': {
            backgroundColor: props.project.color,
            borderRadius: 10,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 10,
            width: 10,
        },
        
    });

    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { isDisabled, isFocused, isSelected }) => {
            const color = props.project.color;
            return {
                ...styles,
                backgroundColor: isDisabled,

                // color:props.project.color  ? props.project.color : "red"
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
    };


    const viewProjectsList = props.workspace.projects.map((project) => (
        { value: project._id, label: project.name }
    ))
    return (
        <>
            <div className="react-select">

                <Select
                    className="select-project"
                    classNamePrefix="select"
                    onChange={(e) => changeSelectedProject(e)}
                    name="color"
                    options={viewProjectsList}
                    placeholder={props.project.name}
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




