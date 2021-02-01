import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewProject from '../viewProject/viewProject'
import { Table } from 'react-bootstrap';
import "./projectsByWorkspace.css";
import Logo from '../../logo/logo'
import { useParams } from 'react-router-dom';
import '../../body/body.css'
// import DetailsProject from '../detailsProject/detailsProject'

function ProjectsByWorkspace(props) {
    const [isFullProjects, setIsFullProjects] = useState(true);
    const [flag, setFlag] = useState(false);
    const nameLogo = 'Leader Hub';

    // useEffect(() => {
    //     // if (!isFullProjects) {
    //     // setIsFullProjects(true)
    //     console.log("idWorkspace", props.idWorkspace)
    //     props.getProjectsByWorkspaceId(props.idWorkspace)
    //     // }
    //     // 
    // }, [])
    let { idWorkspace } = useParams();
    // fun()
    // function fun(){

    // }
    useEffect(() => {
        props.getProjectsByWorkspace(idWorkspace);
        // props.getProjectsByWorkspace("60097fcf88229595ce677d42");
    }, [props])



    const viewProjectsByWorkspace = props.projects.map((project) => {
        return <ViewProject myProject={project} />
    })


    return (
        < >


            <div className='body' to={`${props.user}/workspace/${idWorkspace}`}>
                {/* <div> */}

                <Logo nameWorkspace='Leader hub' />
                <Table responsive style={{ background: 'white' }}>
                    {/* {props.projects.length ? */}
                    <>
                        <thead>
                            <tr><th colspan="7" style={{ 'border-top': 'white' }}></th></tr>
                        </thead>
                        <tbody>


                            {viewProjectsByWorkspace}

                        </tbody>
                    </>
                    {/* : <h2>There are no workspaces</h2>} */}
                </Table>


            </div>
        </>
    )
}

const mapStateToProps = (state) => {

    return {
        projects: state.public_reducer.projects,
        user: state.public_reducer.userName
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProjectsByWorkspace: (idWorkspace) => dispatch(actions.getProjectsByWorkspace(idWorkspace))

    }


}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsByWorkspace)