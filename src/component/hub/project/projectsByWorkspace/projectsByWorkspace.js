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
    const [isFullProjects, setIsFullProjects] = useState(true);
    // const [flag, setFlag] = useState(false);
    const nameLogo = 'Leader Hub';


    let { idWorkspace } = useParams();

    useEffect(() => {
        // if (flag == false) {
        props.getProjectsByWorkspaceId(idWorkspace);
        // setFlag(true)
        // }
    }, [])

    const viewProjectsByWorkspace = props.workspace.projects.map((project) => {
        return <ViewProject myProject={project} />
    })

    return (
        <>
            <div className='body' to={`${props.user}/workspace/${idWorkspace}`}>
                <HeaderBody nameWorkspace={props.workspace.name} />
                <Table responsive className='tableProject'>
                    <>
                        <thead>
                            <tr><th colspan="7" style={{ 'border-top': 'white' }}></th></tr>
                        </thead>
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
        workspace: state.workspace_reducer.workspace,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsByWorkspace)