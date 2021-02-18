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
    let [allWorkspace, setAllWorkspace] = useState(false)
    useEffect(() => {
        props.getAllWorkspaces()
        // if (props.worksapces)
        //     if (!flug) {
        //         if (window.location.href.indexOf("/workspace") != -1) {
        //             alert('/workspace')
        //             props.setProjects(props.workspace.projects)

        //         }
        //         else {
        //             alert('/allWorkspace')
        //             setAllWorkspace(true)
        //             let allProjects = []
        //             props.workspaces.map((myWorkspace) => allProjects.push(myWorkspace.projects))
        //             props.setProjects(allProjects)

        //         }
        //         setFlug(true)
        //     }


    }, [props.worksapces]);




    // let myWorkspace = props.workspaces.find(w => w._id == idWorkspace)
    const viewProjectsByWorkspace =
        props.workspaces.find(w => w._id == idWorkspace).projects.map((project) => {
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
                {/* <HeaderBody nameWorkspace={props.workspace.name} /> */}
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
        setProjects: (p) => dispatch(actions.setProjects(p)),
        // getAllWorkspacesFromServer: () => dispatch(actions.getAllWorkspacesFromServer()),

        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsByWorkspace)