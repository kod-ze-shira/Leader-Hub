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

    const viewProjectsByWorkspace =
        Array.from({ length: 5 }).map((project) => {
            //props.projects.map((project) => {
            // return <ViewProject key={project._id} project={project} />
            return <ViewProject project={props.projects} />


        })
    return (
        <>
            {/* <div to={`${props.user}/workspace/${props.workspaceName}`} > */}
            {/* <div to={`/${props.user}/workspace/${history}`} > */}
            <div>
                <Table responsive
                    style={{ 'background-color': 'white' }}>
                    <thead>
                        <tr>
                            <th colspan="6">
                                {/* <Logo nameWorkspace={props.workspaceName} /> */}
                                <Logo nameWorkspace={nameLogo} />
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {viewProjectsByWorkspace}
                    </tbody>
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