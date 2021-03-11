import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewProject from '../viewProject/viewProject'
import { Table } from 'react-bootstrap';
import "./projectsByWorkspace.css";
import HeaderBody from '../../headerBody/headerBody'
import { useParams } from 'react-router-dom';
import '../../body/body.css'
import { workspace } from '../../../warps/configurator/workspace/workspace';
import ViewDetails from '../../viewDetails/viewDetails'

function ProjectsByWorkspace(props) {

    function getWorkspacesAwait(result) {
        return new Promise((resolve, reject) => {
            props.getAllWorkspaces()
            resolve(true)

        })
    }

    let { idWorkspace } = useParams();
    let [flug, setFlug] = useState(false)
    const [showProject, setShowProject] = useState(false)

    const [addOrEditProject, setAddOrEditProject] = useState(false)

    useEffect(() => {
        if (props.projects.length == 0)
            props.getProjectsByWorkspaceId(idWorkspace)
        if (!flug) {
            if (!props.workspaces.length) {
                props.getAllWorkspaces()
                setFlug(true)
            }
        }
    }, [props.workspaces]);

    if (window.location.href.indexOf('workspace') != -1) {
        // props.getProjectsByWorkspaceId(idWorkspace)
        let w = props.workspaces.find(w => w._id == idWorkspace)
        props.setWorkspace(w)

    } else {
        if (window.location.href.indexOf('allWorkspace') != -1) {
            let allProjects = []
            for (let index = 0; index < props.workspaces.length; index++) {
                for (let j = 0; j < props.workspaces[index].projects.length; j++) {
                    allProjects.push(props.workspaces[index].projects[j])
                }
            }
        }
    }

    const viewProjectsByWorkspace =
        props.projects.map((project) => {
            return <ViewProject myProject={project} editProject={openEditProject} />
        })


    function openEditProject() {
        setAddOrEditProject("editProject")
        // setProject(props.project)
        setShowProject(true)

    }

    function openViewDitailsAddProject() {
        setAddOrEditProject("newProject")
        setShowProject(true)
    }
    return (
        <>

            <div className='body' >
                {/* <HeaderBody nameWorkspace={props.workspaces.find(w => w._id == idWorkspace).name} /> */}

                <Table responsive className='tableProject' >
                    <>

                        <tbody>
                            {viewProjectsByWorkspace}
                        </tbody>
                    </>
                </Table>

                <button onClick={() => openViewDitailsAddProject()}>New Project</button>

                {
                    showProject ? <ViewDetails closeViewDetails={() => setShowProject(false)} from={addOrEditProject} workspaceId={idWorkspace} />
                        : null
                }
            </div>
        </>
    )
}

const mapStateToProps = (state) => {

    return {
        projects: state.public_reducer.projects,
        project: state.project_reducer.project,
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
        setProject: (p) => dispatch(actions.setProject(p)),
        setWorkspace: (w) => dispatch(actions.setWorkspace(w)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsByWorkspace)