import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewProject from '../viewProject/viewProject'
import { Table } from 'react-bootstrap';
import "./projectsByWorkspace.css";
import HeaderBody from '../../headerBody/headerBody'
import { useParams } from 'react-router-dom';
import '../../body/body.css'

function ProjectsByWorkspace(props) {
    const { idWorkspace } = useParams();
    let myWorkspace;
    if (props.workspaces.length)
        myWorkspace = props.workspaces.find(w => w._id == idWorkspace)
    else {
        props.getAllWorkspaces();
    }
    useEffect(() => {
        props.getProjectsByWorkspaceId(idWorkspace);
    }, [])

    const viewProjectsByWorkspace = myWorkspace.projects.map((project) => {
        return <ViewProject myProject={project} />
    })



    return (
        <>

            <div className='body' to={`${props.user}/workspace/${idWorkspace}`}>
                <HeaderBody nameWorkspace={myWorkspace.name} />
                <Table responsive className='tableProject' >
                    <>
                        {/* <thead>
                            <tr><th colspan="7" style={{ 'border-top': 'white' }}></th></tr>
                        </thead> */}
                        <tbody>
                            {viewProjectsByWorkspace}
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
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),

        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsByWorkspace)