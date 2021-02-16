import React, { useState, useEffect, useParams } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import CardsByProject from '../Cards/cardsByProject/cardsByProject';
import './projectPlatform.css'


function ProjectPlatform(props) {
    // const { idProject } = useParams();
    const [projectId, setProjectId] = useState()
    const [viewCardsByProject, setViewCardsByProject] = useState(false)
    const [workspaceId, setWorkspaceId] = useState()



    useEffect(() => {
        {
            // props.getAllWorkspacesFromServer()

        };
    }, []);
    console.log(props.project)
    const changeProjectId = () => {
        // setProjectId(value)
        setViewCardsByProject(true)
    }
    const [showDetails, setShowDetails] = useState(false)

    // $(function () {
    //     $('.add-new-btn').hover(function () {
    //         $('.add-new-pop-up').css('display', 'block')
    //     }, function () {
    //         // on mouseout, reset the background colour
    //         $('.add-new-pop-up').css('display', 'none');
    //     });
    // });

    const newCard = () => {
        let card = { "project": props.project._id, name: "renana" }
        props.newCard(card)
        console.log("add card" + props.project.cards)
    }
    return (
        <>

            <div className="body container-fluid">

                {/* {props.project.name!="No Projects" ? */}
                <CardsByProject projectId={props.project._id} flag={props.flag} />
                {/* : null}  */}
                <a onClick={newCard}>add card+</a>
                <div className="add-new-pop-up ">
                    <a >New Workspace</a><br></br>
                    <a>New Project</a><br></br>
                    <a>New Card</a><br></br>
                    <a>New Task</a><br></br>
                </div>
                <div className="add-new-btn">+</div>
            </div>
        </>
    )

}
const mapStateToProps = (state) => {
    return {
        projects: state.project_reducer.projects,
        user: state.public_reducer.userName,
        workspaces: state.public_reducer.worksapces,
        workspace: state.workspace_reducer.worksapce,
        project: state.project_reducer.project,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspaceId(idWorkspace)),
        getAllWorkspacesFromServer: () => dispatch(actions.getAllWorkspacesFromServer()),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspaces()),
        newCard: (cardname) => dispatch(actions.newCard(cardname)),

    }


}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectPlatform)