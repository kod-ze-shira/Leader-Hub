import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../../body/body.css';
import ViewDetails from '../../viewDetails/viewDetails';
import ViewProject from '../viewProject/viewProject';
import "./projectsByWorkspace.css";



function ProjectsByWorkspace(props) {
    let { idWorkspace } = useParams();
    const [showProject, setShowProject] = useState(false)
    const [showEditOrShareProject, setShowEditOrShareProject] = useState(false)
    const [valueSearch, setValueSearch] = useState(props.projectName)
    const [addOrEditProject, setAddOrEditProject] = useState(false)
    const [editOrShareProject, setEditOrShareProject] = useState(false)
    const [e, setE] = useState('')

    useEffect(() => {
        // if (props.showViewDitailsProject && e != props.showViewDitailsProject.e) {

        // if (props.showViewDitailsProject) {
        if (props.showViewDitailsProject && e != props.showViewDitailsProject.e) {

            setShowProject(props.showViewDitailsProject.show)
            setAddOrEditProject("newProject")
            setE(props.showViewDitailsProject.e)
            props.showViewDitailsProject.e.stopPropagation()
        } else
            setShowProject(false)

        if (props.valueSearchProject) {
            setValueSearch(props.valueSearchProject)
        } else
            setValueSearch(props.projectName)

    }, [props.workspaces, props.indexOfWorkspace, props.showViewDitailsProject, props.valueSearchProject]);

    function openEditOrShareProject(from) {
        // setAddOrEditProject(from)
        setEditOrShareProject(from)
        // setShowProject(true)
        setShowEditOrShareProject(true)
    }
    // function openEditOrShareProject(from) {
    //     // setAddOrEditProject(from)
    //     setEditOrShareProject(from)
    //     // setShowProject(true)
    //     showEditOrShareProject(true)
    // }

    const viewProjectsByWorkspace = props.workspaces[props.indexOfWorkspace] ?
        props.workspaces[props.indexOfWorkspace].projects.map((project, index) => {
            return project.name.toUpperCase().includes(valueSearch.toUpperCase())
                ? <ViewProject showToast={(obj) => showToast1(obj)}
                    closeViewDetails={false}
                    indexProject={index}
                    myProject={project}
                    editOrShareProject={(editOrShare) => openEditOrShareProject(editOrShare)} />
                : null
        }) : null

    const viewAllProjects = props.workspaces ? props.workspaces.map((workspace) => {
        return workspace.projects.map((project, index) => {
            return project.name.toUpperCase().includes(valueSearch.toUpperCase()) ?
                <ViewProject showToast={(obj) => showToast1(obj)}
                    closeViewDetails={false}
                    myProject={project}
                    indexProject={index}
                    editOrShareProject={(editOrShare) => openEditOrShareProject(editOrShare)}
                    shareProject={openEditOrShareProject} />
                : null
        })
    }) : null


    function showToast1(obj) {
        props.showToast(obj)
    }

    function showToast() {
        props.showToast({ 'type': 'Project', 'object': props.projectToDelete })
    }

    $(window).click(function () {
        setShowProject(false)
        setShowEditOrShareProject(false)
    });
    function stopP(event) {
        event.stopPropagation();
    }

    return (
        <div className='body' >
            <div className='headerProjects'>
                <div className='contentHeaderProjects'>
                    <div className='betweenHeaderProjects'>
                        <div className="titleProjects pt-2 ml-2">Leader Projects</div>
                    </div>
                </div>
            </div>
            <Table responsive className='tableProject' >
                <tbody className="mx-3">
                    {idWorkspace ? viewProjectsByWorkspace : viewAllProjects}
                </tbody>
            </Table>
            { showProject ?
                <div className="closeDet" onClick={(e) => stopP(e)}>
                    <ViewDetails
            
                        closeViewDetails={() => setShowProject(false)}
                        showToast={showToast}
                        from={addOrEditProject} workspaceId={idWorkspace} />
                </div> : null
            }
            {showEditOrShareProject ?
                <div className="closeDet" onClick={(e) => stopP(e)}>
                    <ViewDetails
                        viewToastComplete={props.viewToastComplete}
                        closeViewDetails={() => setShowEditOrShareProject(false)}
                        showToast={showToast}
                        from={editOrShareProject} workspaceId={idWorkspace} />
                </div> : null
            }
        </div>
    )
}

const mapStateToProps = (state) => {

    return {
        projectToDelete: state.project_reducer.project,
        workspaces: state.public_reducer.workspaces,
        indexOfWorkspace: state.public_reducer.indexOfWorkspace,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsByWorkspace)