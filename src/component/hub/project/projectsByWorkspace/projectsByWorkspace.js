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
// import EditProject from '../editProject'

function ProjectsByWorkspace(props, getAllWorkspaces) {
    let { idWorkspace } = useParams();
    let [flug, setFlug] = useState(false)
    let [newProjet, setNewProjet] = useState(false);
    let [editProjet, setEditProjet] = useState(false);

    useEffect(() => {


        // if (window.performance) {
        // if (performance.navigation.type == 1) {
        // alert("This page is reloaded");
        // props.getAllWorkspaces()

        // }
        // }
        // if (props.worksapces)
        if (props.workspaces)
            if (window.location.href.indexOf('workspace') != -1) {
                props.getProjectsByWorkspaceId(idWorkspace)
                // let w = props.workspaces.find(w => w._id == idWorkspace)
                // props.setWorkspace(w)

            } else {
                // if (window.location.href.indexOf('allWorkspace') != -1) {
                let allProjects = []
                for (let index = 0; index < props.workspaces.length; index++) {
                    for (let j = 0; j < props.workspaces[index].projects.length; j++) {
                        allProjects.push(props.workspaces[index].projects[j])
                    }
                }
                // props.workspaces.map((myWorkspace) => )
                props.setProjects(allProjects)
            }

        // setFlug(true)
        // }

    }, []);


    // let myWorkspace = props.workspaces.find(w => w._id == idWorkspace)  
    // props.workspaces.find(w => w._id == idWorkspace)

    const viewProjectsByWorkspace =
        props.projects.map((project) => {
            return <ViewProject myProject={project} />
        })
    // const viewAllProjectsByWorkspace = props.workspaces.map((w) =>
    //     w.projects.map((project) => {
    //         return <ViewProject myProject={project} />
    //     })
    // )

    function openVeiwDetils() {
        setNewProjet(true)
    }

    return (
        <>
            <div className='body' >
                {/* <HeaderBody nameWorkspace={props.workspaces.find(w => w._id == idWorkspace).name} /> */}
                <HeaderBody nameWorkspace={props.workspace.name} />
                <Table responsive className='tableProject' >
                    <>
                        {/* <thead>
                            <tr><th colspan="7" style={{ 'border-top': 'white' }}></th></tr>
                        </thead> */}
                        <tbody>
                            {/* {allWorkspace ? viewAllProjectsByWorkspace : */}
                            {viewProjectsByWorkspace}
                            {/* } */}
                        </tbody>
                    </>
                </Table>
                <button onClick={() => openVeiwDetils()}>new project</button>
                {newProjet ? <ViewDetails from="newProject" workspaceId={idWorkspace}>
                </ViewDetails> : null}
                {/* {props.editProjet ? <EditProject from="editProject" workspaceId={idWorkspace}>
                </EditProject> : null} */}

            </div>
        </>
    )
}

const mapStateToProps = (state) => {

    return {
        projects: state.public_reducer.projects,
        user: state.public_reducer.userName,
        workspaces: state.public_reducer.worksapces,
        workspace: state.workspace_reducer.workspace,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        getProjectsByWorkspaceId: (id) => dispatch(actions.getProjectsByWorkspaceId(id)),
        setProjects: (p) => dispatch(actions.setProjects(p)),
        setWorkspace: (w) => dispatch(actions.setWorkspace(w)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsByWorkspace)