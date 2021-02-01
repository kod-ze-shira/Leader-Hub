import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import ProjectsList from './projectsList/projectsList'
import CardsByProject from '../Cards/cardsByProject/cardsByProject';
import TasksByCard from '../task/tasksByCard/tasksByCard'
import Logo from '../logo/logo'
import './projectPlatform.css'

function ProjectPlatform(props) {
    const [projectId, setProjectId] = useState(0)
    // const [cardId, setCardId] = useState(0)
    const [viewCardsByProject, setViewCardsByProject] = useState(false)
    // const [viewTasksByCard, setViewTasksByCard] = useState(false)

    useEffect(() => {

        // props.getProjectByIdInServer("6011270ba72ba9f8be885e06");
    }, [])

    const changeProjectId = (value) => {
        setProjectId(value)
        setViewCardsByProject(true)
    }
    // const changeCardId = (value) => {
    //     setCardId(value)
    //     setViewTasksByCard(true)
    // }
    return (
        <>
            {/* <Link to={`${props.user}/projectPlatform`} > */}
            <div className="body container-fluid">
                <Logo className="logo-workspace" nameWorkspace='Leader hub' />
                < ProjectsList changeProject={changeProjectId} />
                {/* changeCard={changeCardId} */}
                {viewCardsByProject ? <CardsByProject  projectId={projectId} /> : null}
                {/* {viewTasksByCard ? */}
                 {/* <TasksByCard cardId={cardId} /> */}
                {/* //   : null} */}
                {/* <TasksByCard cardId={"6006061269370dacf7af0609"} /> */}
                {/* <div className="add-new-btn ">+</div> */}

            </div>
        </>
    )

}
const mapStateToProps = (state) => {
    return {
        projects: state.public_reducer.project,
        user: state.public_reducer.userName

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // getProjectByIdInServer:(idProject)=>dispatch(actions.getProjectByIdInServer(idProject)),
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace))
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectPlatform)