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

function ProjectsByWorkspace(props, getAllWorkspaces) {
    let { idWorkspace } = useParams();
    let [flug, setFlug] = useState(false)

    useEffect(() => {
        // debugger
        if (!flug) {
            props.getAllWorkspaces()
            // if (props.worksapces)
            // props.getProjectsByWorkspaceId(idWorkspace)
            if (window.location.href.indexOf('workspace') != -1) {
                props.getProjectsByWorkspaceId(idWorkspace)

            }
            setFlug(true)
        }

    }, []);


    if (window.location.href.indexOf('workspace') == -1) {
        let allProjects = []

        for (let index = 0; index < props.workspaces.length; index++) {
            allProjects.push(props.workspaces[index].projects)
        }
        // props.workspaces.map((myWorkspace) => )
        props.setProjects(allProjects)
    }

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
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsByWorkspace)