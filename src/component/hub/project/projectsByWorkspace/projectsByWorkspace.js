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


function ProjectsByWorkspace(props) {

    // useEffect(() => {
    //     console.log(props.workspace.projectList)
    // }, [props.workspace])

    let { idWorkspace } = useParams();
    let [flug, setFlug] = useState(false)
    const [showProject, setShowProject] = useState(false)
    const [valueSearch, setValueSearch] = useState(props.projectName)

    const [addOrEditProject, setAddOrEditProject] = useState(false)

    function getWorkspacesAwait(result) {
        return new Promise((resolve, reject) => {
            props.getAllWorkspaces()
            resolve(true)

        })
    }


    useEffect(() => {

        // if (props.projects)
        // if (props.projects.length == 0) {
        //     props.getProjectsByWorkspaceId(idWorkspace)
        // }
        if (!flug) {
            if (props.workspaces.length == 0) {

                if (window.location.href.indexOf('workspace') != -1) {
                    let w = props.workspaces.find(w => w._id == idWorkspace)

                } else {
                    if (window.location.href.indexOf('allProjects') != -1) {
                        props.getAllWorkspaces()
                        let allProjects = []
                        for (let index = 0; index < props.workspaces.length; index++) {
                            for (let j = 0; j < props.workspaces[index].projects.length; j++) {
                                allProjects.projects.push(props.workspaces[index].projects[j])
                            }
                        }
                        // props.setWorkspace(props.workspaces[0])
                        // props.setProjects(allProjects)
                    }
                }

                setFlug(true)
            }
        }
    }, [props.workspaces]);



    const [currentProject, setCurrentProject] = useState()

    function openEditProject(project) {
        setCurrentProject(project)
        props.setProject(project)
        setAddOrEditProject("editProject")
        setShowProject(true)
    }

    function openViewDitailsAddProject() {
        setAddOrEditProject("newProject")
        setShowProject(true)
    }

    const viewProjectsByWorkspace = props.workspaces.find(workspace => workspace.workspace._id == idWorkspace) ?
        props.workspaces.find(workspace => workspace.workspace._id == idWorkspace).projectList.map((project) => {
            return project.project.name.toUpperCase().includes(valueSearch.toUpperCase())
                ? <ViewProject showToast={(obj) => showToast1(obj)}
                    closeViewDetails={false} myProject={project} editProject={openEditProject} />
                : null
        }) : null

    const viewAllProjects = props.workspaces ? props.workspaces.map((workspace) => {
        return workspace.projectList.map((project) => {
            return project.project.name.toUpperCase().includes(valueSearch.toUpperCase()) ? <ViewProject showToast={(obj) => showToast1(obj)}
                closeViewDetails={false} myProject={project} editProject={openEditProject} />
                : null
        })
    }) : null


    function showToast1(obj) {
        props.showToast(obj)
    }

    function showToast() {
        props.showToast({ 'type': 'Project', 'object': props.projectToDelete })
    }

    function openSearchProject() {
        document.getElementById('inputSearchProjects').value = valueSearch

    }
    function searchProject() {
        setValueSearch(document.getElementById('inputSearchProjects').value)
    }
    function closeInputSearch() {
        // $("#inputSearchProjects").trigger("focusout");

        setTimeout(() => {
            if (!valueSearch)
                document.getElementById('inputSearchProjects').value = ''
        }, 1700);

    }




    return (
        <>



            <div className='body' >
                <div className='headerProjects'>
                    <div className='betweenHeaderProjects'>
                        <div className="titleProjects pt-2 ml-2">Leader Projects</div>

                        <div id=''>
                            <span id='searchProject' >
                                <input type='text' id='inputSearchProjects' className='inputSearchProjects'
                                    onMouseLeave={() => closeInputSearch()}
                                    onChange={() => searchProject()}
                                    onMouseOver={() => openSearchProject()}
                                    style={valueSearch ? { 'width': '400px' } : null}

                                />
                            </span>


                            <button className='buttonNewProject'
                                onClick={() => openViewDitailsAddProject()}
                            >+ New Project</button>
                        </div>
                    </div>

                </div>

                <Table responsive className='tableProject ' >
                    <>
                        <tbody>
                            {idWorkspace ? viewProjectsByWorkspace : viewAllProjects}
                        </tbody>
                    </>
                </Table>


                {
                    showProject ? <ViewDetails
                        closeViewDetails={() => setShowProject(false)}
                        project={currentProject}
                        showToast={showToast}
                        from={addOrEditProject} workspaceId={idWorkspace} />
                        : null
                }

            </div>
        </>
    )
}

const mapStateToProps = (state) => {

    return {
        // projects: state.public_reducer.projects,
        projectToDelete: state.project_reducer.project,
        user: state.public_reducer.userName,
        workspaces: state.public_reducer.workspaces,
        // workspace: state.workspace_reducer.workspace,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        getProjectsByWorkspaceId: (id) => dispatch(actions.getProjectsByWorkspaceId(id)),
        setProjects: (p) => dispatch(actions.setProjects(p)),
        setProject: (project) => dispatch(actions.setProject(project)),
        setWorkspace: (w) => dispatch(actions.setWorkspace(w)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsByWorkspace)