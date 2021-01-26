import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewProject from '../viewProjectNew/viewProjectNew'
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
        Array.from({ length: 12 }).map((project) => {
            //props.projects.map((project) => {
            // return <ViewProject key={project._id} project={project} />
            return <ViewProject />

        })
    return (
        <>
            <div to={`${props.user}/workspace/${props.workspaceName}`} >
                <Table responsive>
                    <thead>
                        <tr>
                            <th>
                                {/* <Logo nameWorkspace={props.workspaceName} /> */}
                                <Logo nameWorkspace={nameLogo} />
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {viewProjectsByWorkspace}


                        {/* <tr>
                            <td>2</td>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
                       */}
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