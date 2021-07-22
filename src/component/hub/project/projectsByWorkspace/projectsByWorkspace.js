import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { actions } from '../../../../redux/actions/action';
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
    const [fromAllproject, setFromAllproject] = useState(false)

    let workspaceName=''
    useEffect(() => {
        if (props.showViewDitailsProject && e != props.showViewDitailsProject.e) {
            if (props.showViewDitailsProject.fromAllProject) {
                setFromAllproject(true)
            }
            setShowProject(props.showViewDitailsProject.show)
            setAddOrEditProject("newProject")
            setE(props.showViewDitailsProject.e)
            props.showViewDitailsProject.e.stopPropagation()
        }
        else
            setShowProject(false)

        if (props.valueSearchProject) {
            setValueSearch(props.valueSearchProject)
        } else
            setValueSearch(props.projectName)
    
    }, [props.workspaces, props.indexOfWorkspace, props.showViewDitailsProject, props.valueSearchProject]);

    if (props.history.location.pathname.includes('allProjects')) {
        workspaceName='All Projects'       
    }
    else{
        workspaceName=props.workspaces[props.indexOfWorkspace]&&props.workspaces[props.indexOfWorkspace].name
    }
    function openEditOrShareProject(from) {
        setEditOrShareProject(from)
        setShowEditOrShareProject(true)
    }

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
    //view projects shared
    const viewSharedProjects =
        props.sharedProjects.map((project, index) => {
            return project.objectId ? project.objectId.name.toUpperCase().includes(valueSearch.toUpperCase())
                ? <ViewProject showToast={(obj) => showToast1(obj)}
                    closeViewDetails={false}
                    indexProject={index}
                    myProject={project.objectId}
                    fromShare='true'
                    editOrShareProject={(editOrShare) => openEditOrShareProject(editOrShare)} />
                : null : null
        })
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
        if (showEditOrShareProject)
            props.editProjectInServer()
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
                        <div className="titleProjects pt-2 ml-2">{workspaceName} projects</div>
                    </div>
                </div>
            </div>
            <Table responsive className='tableProject' >
                <thead className="mx-3">
                    <tr className='projectsTitle'>
                        <th className='nameProjectInList'>
                            <span className='name2ProjectInList'>{workspaceName} projects</span>
                        </th>
                        <th className='widthCellInProject'><span>Due Date</span></th>
                        <th ><span>Cards</span></th>
                        <th ><span >Task</span></th>
                        <th ><span >Complete</span></th>
                        <th className='widthCellInProject'><span>Members</span></th>
                        <th className='widthCellInProject'><span>Last Update</span></th>
                        <th className='actionsProject'><span>Shared Projects</span></th>
                        {/* <th ></th> */}
                    </tr>
                </thead>
                <tbody className="mx-3">
                    {idWorkspace ? viewProjectsByWorkspace : viewAllProjects}
                    {!idWorkspace ? viewSharedProjects : null}
                </tbody>
            </Table>
            {showProject ?
                <div className="closeDet" onClick={(e) => stopP(e)}>
                    <ViewDetails
                        fromAllproject={fromAllproject}
                        viewToastMassege={props.viewToastMassege}
                        closeViewDetails={() => setShowProject(false)}
                        showToast={showToast}
                        from={addOrEditProject} workspaceId={idWorkspace} />
                </div> : null
            }
            {showEditOrShareProject ?
                <div className="closeDet" onClick={(e) => stopP(e)}>
                    <ViewDetails
                        viewToastMassege={props.viewToastMassege}
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
        sharedProjects: state.public_reducer.sharedProjects
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editProjectInServer: () => dispatch(actions.editProjectInServer()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectsByWorkspace))
