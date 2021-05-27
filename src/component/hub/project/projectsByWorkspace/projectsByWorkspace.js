import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewProject from '../viewProject/viewProject'
import { Table } from 'react-bootstrap';
import "./projectsByWorkspace.css";
// import HeaderBody from '../../headerBody/headerBody'
import { useParams } from 'react-router-dom';
import '../../body/body.css'
import ViewDetails from '../../viewDetails/viewDetails'
import $ from 'jquery'
import ReactTooltip from 'react-tooltip';
import title from '../../../../Data/title.json'



function ProjectsByWorkspace(props) {

    let { idWorkspace } = useParams();
    const [showProject, setShowProject] = useState(false)
    const [valueSearch, setValueSearch] = useState(props.projectName)
    const [addOrEditProject, setAddOrEditProject] = useState(false)




    useEffect(() => {

        // }, [props.workspaces]);
    }, [props.workspaces, props.indexOfWorkspace]);




    function openEditOrShareProject(from) {
        setAddOrEditProject(from)
        setShowProject(true)
    }

    function openViewDitailsAddProject(e) {
        setAddOrEditProject("newProject")
        setShowProject(true)
        e.stopPropagation()
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

    function searchProject() {
        setValueSearch(document.getElementById('inputSearchProjects').value)
    }

    $(window).click(function () {
        setShowProject(false)
    });
    function stopP(event) {
        event.stopPropagation();
    }

    return (
        <>
            <div className='body' >
                <div className='headerProjects'>
                    <div className='betweenHeaderProjects'>
                        {/* <div className="titleProjects pt-2 ml-2">Leader Projects</div> */}
                        <div class="show-task row mx-4 mt-3 headerTableTask">
                            <label class="ml-4 pl-6 labelAllTask mt-2"> Leader Projects </label></div>
                        <div id=''>
                            <span id='searchProject' >
                                <input type='text' id='inputSearchProjects' className='inputSearchProjects'
                                    onChange={() => searchProject()}
                                    placeholder='Search project...'
                                />
                            </span>
                            {window.location.href.indexOf('workspace') != -1 ? <button className='buttonNewProject'
                                data-tip data-for="add_p"
                                onClick={(e) => openViewDitailsAddProject(e)}
                            >+ New Project</button> : null}
                            <ReactTooltip data-tip id="add_p" place="top" effect="solid">
                                {title.title_add_project}
                            </ReactTooltip>

                        </div>
                    </div>

                </div>

                <Table responsive className='tableProject ' >
                    <>
                        <tbody className="mx-3">
                            {idWorkspace ? viewProjectsByWorkspace : viewAllProjects}
                        </tbody>
                    </>
                </Table>


                {
                    showProject ?
                        <div className="closeDet" onClick={(e) => stopP(e)}>
                            <ViewDetails
                                closeViewDetails={() => setShowProject(false)}
                                showToast={showToast}
                                from={addOrEditProject} workspaceId={idWorkspace} />
                        </div> : null
                }

            </div>
        </>
    )
}

const mapStateToProps = (state) => {

    return {
        projectToDelete: state.project_reducer.project,
        user: state.public_reducer.userName,
        workspaces: state.public_reducer.workspaces,
        indexCurrentProject: state.public_reducer.indexCurrentProject,
        indexOfWorkspace: state.public_reducer.indexOfWorkspace,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        getProjectsByWorkspaceId: (id) => dispatch(actions.getProjectsByWorkspaceId(id)),
        setProjects: (p) => dispatch(actions.setProjects(p)),
        setProject: (project) => dispatch(actions.setProject(project)),
        setWorkspace: (w) => dispatch(actions.setWorkspace(w)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsByWorkspace)