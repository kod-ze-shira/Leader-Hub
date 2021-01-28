import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewProject from '../viewProject/viewProject'
import Logo from '../../logo/logo'
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


function ProjectsByWorkspace(props) {
    const [isFullProjects, setIsFullProjects] = useState(false);
    let { idWorkspace } = useParams();

    useEffect(() => {
        // props.getProjectsByWorkspaceId(idWorkspace);
        props.getProjetsByWorkspace('60097fcf88229595ce677d42‏');

    }, [])

    // useEffect(() => {
    //     if (!isFullProjects) {
    //         setIsFullProjects(true)
    //         console.log("idWorkspace", props.idWorkspace)
    //         props.getProjectsByWorkspaceId(props.idWorkspace)
    //     }

    // }, [props])

    // const viewProjectsByWorkspace = props.projects.map((project) => {
    const viewProjectsByWorkspace = props.projects.map((project) => {

        // return <ViewProject key={project._id} project={project} />
        return <ViewProject project={project} />
    })


    return (
        <>
            <button onClick={() => console.log(props.projects)}>click me</button>
            <div>
                {/* <div to={`/${props.user}/worksace/workspaceId`}> */}

                <Logo nameWorkspace='Leader hub' />
                <Table responsive style={{ background: 'white' }}>

                    {/* {props.projects.length ? */}
                    <>
                        <thead>
                            <tr><th colspan="7"></th></tr>
                        </thead>
                        <tbody>
                            {viewProjectsByWorkspace}
                        </tbody>
                        {/* </> : <h2>There are no workspaces</h2>} */}
                    </>

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
            getProjetsByWorkspace: (idWorkspace) => dispatch(actions.getProjetsByWorkspace(idWorkspace))

        }
    }
)(ProjectsByWorkspace)