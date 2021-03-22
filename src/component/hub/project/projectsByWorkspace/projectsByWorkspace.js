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

function ProjectsByWorkspace(props) {
    let { idWorkspace } = useParams();
    let [flug, setFlug] = useState(false)
    const [showProject, setShowProject] = useState(false)

    const [addOrEditProject, setAddOrEditProject] = useState(false)

    function getWorkspacesAwait(result) {
        return new Promise((resolve, reject) => {
            props.getAllWorkspaces()
            resolve(true)

        })
    }


    useEffect(() => {
        props.getAllWorkspaces()

        if (props.projects.length == 0) {
            props.getProjectsByWorkspaceId(idWorkspace)
            // let w = props.workspaces.find(w => w._id == idWorkspace)
            // props.setWorkspace(w)
            // props.setProjects(props.workspace.projectList)
        }
        // props.setProjects(props.workspaces.)
        if (!flug) {
            if (props.workspaces.length == 0) {
                // if (props.workspaces.length)
                // alert('hhh')
                if (window.location.href.indexOf('workspace') != -1) {
                    // props.getProjectsByWorkspaceId(idWorkspace)
                    let w = props.workspaces.find(w => w._id == idWorkspace)
                    // props.setWorkspace(w)
                    // props.setProjects(props.workspace.projectList)
                    // let p=props.workspace.find(p=>p)

                } else {
                    if (window.location.href.indexOf('allProjects') != -1) {
                        // props.getFullWorkspacesForUser()
                        let allProjects = []
                        for (let index = 0; index < props.workspaces.length; index++) {
                            for (let j = 0; j < props.workspaces[index].projects.length; j++) {
                                allProjects.projects.push(props.workspaces[index].projects[j])
                            }
                        }
                        // props.workspaces.map((myWorkspace) => )
                        props.setProjects(allProjects)
                    }
                }

                setFlug(true)
            }
        }
    }, []);




    function openEditProject() {
        setAddOrEditProject("editProject")
        setShowProject(true)
    }

    function openViewDitailsAddProject() {
        setAddOrEditProject("newProject")
        setShowProject(true)
    }

    const viewProjectsByWorkspace = props.projects ?
        props.projects.map((project) => {
            return <ViewProject showToast={(obj) => showToast1(obj)}
                closeViewDetails={false} myProject={project} editProject={openEditProject} />
        }) : null


    const viewAllProjects = props.workspaces ? props.workspaces.map((workspace) => {
        return workspace.projectList.map((project) => {
            return <ViewProject showToast={(obj) => showToast1(obj)}
                closeViewDetails={false} myProject={project} editProject={openEditProject} />
        })
    }) : null

    // function viewProjectsByWorkspace() {
    //     let componentProject = {}
    //     props.projects.map((project) => {
    //         componentProject += <ViewProject
    //             myProject={project} editProject={openEditProject} />
    //     })

    //     return componentProject
    // }
    function showToast1(obj) {
        props.showToast(obj)
    }

    function showToast() {
        props.showToast({ 'type': 'Project', 'object': props.projectToDelete })
    }

    return (
        <>

            <div className='body' >
                {/* <HeaderBody nameWorkspace={props.workspaces.find(w => w._id == idWorkspace).name} /> */}

                <Table responsive className='tableProject' >
                    <>

                        <tbody>
                            {idWorkspace ? viewProjectsByWorkspace : viewAllProjects}
                        </tbody>
                    </>
                </Table>

                <button type="button" class="btn btn-outline-primary" onClick={() => openViewDitailsAddProject()}
                >New Project</button>

                {
                    showProject ? <ViewDetails closeViewDetails={() => setShowProject(false)}
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
        projects: state.public_reducer.projects,
        projectToDelete: state.project_reducer.project,
        user: state.public_reducer.userName,
        workspaces: state.public_reducer.workspaces,
        workspace: state.workspace_reducer.workspace,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        getFullWorkspacesForUser: () => dispatch(actions.getFullWorkspacesForUser()),
        getProjectsByWorkspaceId: (id) => dispatch(actions.getProjectsByWorkspaceId(id)),
        setProjects: (p) => dispatch(actions.setProjects(p)),
        setWorkspace: (w) => dispatch(actions.setWorkspace(w)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsByWorkspace)