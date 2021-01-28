import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewProject from '../viewProject/viewProject'
import { Table } from 'react-bootstrap';
import "./projectsByWorkspace.css";
import Logo from '../../logo/logo'
// import DetailsProject from '../detailsProject/detailsProject'

function ProjectsByWorkspace(props, idWorkspace) {
    const [isFullProjects, setIsFullProjects] = useState(true);
    const [flag, setFlag] = useState(false);


    useEffect(() => {
        // if (!isFullProjects) {
        // setIsFullProjects(true)
        console.log("idWorkspace", props.idWorkspace)
        props.getProjectsByWorkspaceId(props.idWorkspace)
        // }
        // 
    }, [])

    const nameLogo = 'Leader Hub'

    const viewProjectsByWorkspace = Array.from({ length: 5 }).map((project) => {
        //props.projects.map((project) => {
        // return <ViewProject key={project._id} project={project} />
        return <ViewProject project={props.projects} />
    })
    return (
        < >
            <div to={`${props.user}/workspace`}>

                <Logo nameWorkspace='Leader hub' />
                <Table responsive style={{ background: 'white' }}>
                    {props.projects.length ?
                        <>
                            <thead>
                                <tr><th colspan="7"></th></tr>
                            </thead>
                            <tbody>
                                {viewProjectsByWorkspace}
                            </tbody>
                        </> : <h2>There are no workspaces</h2>}
                </Table>


            </div>
        </>
    )
}


export default connect(
    (state) => {
        return {
            projects: state.public_reducer.projects,
            user: state.public_reducer.userName
        }
    },
    (dispatch) => {
        return {
            getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspace(idWorkspace))

        }
    }
)(ProjectsByWorkspace)