import React, { useEffect, useState } from 'react'
import './viewWorkspacelist.css';
import { connect } from 'react-redux'
import { actions } from '../../../../../redux/actions/action'
import history from '../../../../history'
import { withRouter } from 'react-router-dom';



function ViewWorkspaceList(props) {
    const { workspace } = props
    const [viewProjects, setViewProjects] = useState(false)
    const [showShare, setShowShare] = useState(false)
    const [openEditWorkspace, setOpenEditWorkspace] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const viewProjectsByWorkspace = () => {
        // return  <projectsByWorkspace/>
        setViewProjects(!viewProjects);
    }

    const routeToProject = (id) => {

        props.history.push("/" + props.user + "/workspace/" + id)
        // history.push("/renana-il/workspace/" + id)

    }

    const toOpenEditWorkspace = () => {
        setOpenEditWorkspace(!openEditWorkspace)
    }

    return (
        <>

<<<<<<< HEAD
            <div className="row ml-2"
                onClick={() => routeToProject(workspace._id)}
            >
                <div className="row " >
                    <div className="Workspace" >
                        < div className="logoWorkspacelist"
                            style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
                            {workspace.name[0].toUpperCase()}
                            {/* {
                            workspace.name && workspace.name.indexOf(" ") && workspace.name.indexOf(" ") + 1 ?
                                workspace.name[workspace.name.indexOf(" ") + 1].toUpperCase() : null
                        } */}
                        </div>
=======
            <>

                <Card
                    onClick={() => routeToWorkspace(workspace)}

                    className="cardWorkspace"
                    // onClick={() => { setisConfiguratorOpenWorkspace() }}
                    onMouseOver={() => setShowInput(true)}
                    onMouseLeave={() => setShowInput(false)}
                >
                    <div className="logoWorkspace"
                        onMouseOver={() => setShowInput(true)
                        }

                        style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}
                    >
                        {workspace.name[0].toUpperCase()}
                        {/* {
              workspace.name && workspace.name.indexOf(" ") && workspace.name.indexOf(" ") + 1 ?
                workspace.name[workspace.name.indexOf(" ") + 1].toUpperCase() : null
            } */}
                    </div >

                    <div className='nameWorkspace'
                        onMouseOver={() => setShowInput(true)}
                    >{workspace.name}</div>
                    <div>{workspace.startDate}</div>
                    <div>
                        {viewProjects ? <ProjectsByWorkspace idWorkspace={workspace._id} /> : null}
                    </div>
                    <div>
                        {openEditWorkspace ? <EditWorkspace idWorkspace={workspace._id}></EditWorkspace> : null}
>>>>>>> dev
                    </div>
                    <b className="mt-3 ml-2">{workspace.name}</b>

                </div>





            </div>
        </>

    )
}
const mapStateToProps = (state) => {

    return {
        user: state.public_reducer.userName
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

        getWorkspaceByIdFromServer: () => dispatch(actions.getWorkspaceByIdFromServer()),

    }


}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewWorkspaceList))

