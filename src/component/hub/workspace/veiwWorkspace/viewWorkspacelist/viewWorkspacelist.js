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

    const routeToProject = () => {
        props.history.push("/" + props.user + "/workspace/" + workspace._id)
    }

    const toOpenEditWorkspace = () => {
        setOpenEditWorkspace(!openEditWorkspace)
    }
    const [over, setover] = useState(false);
    function func_over() {
        setover(true)
    }
    function func_out_over() {
        setover(false);
    }

    return (
        <>


            <div className="row WorkspaceList mt-3 " onMouseOver={func_over} onMouseOut={func_out_over}
                onClick={() => routeToProject(workspace._id)}
            >
                <div className="row "  >
                    <div className="Workspace" >
                        <div className="logoWorkspacelist"
                            style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
                            {workspace.name[0].toUpperCase()}
                            {/* {
                            workspace.name && workspace.name.indexOf(" ") && workspace.name.indexOf(" ") + 1 ?
                                workspace.name[workspace.name.indexOf(" ") + 1].toUpperCase() : null
                        } */}
                        </div>
                    </div>
                    <b className="mt-4 ml-2">{workspace.name} </b>

                </div>
                {
                    over ?
                        <div className="row mt-4">
                            <div className="col-1 delet"><img src={require('../../../../img/pencil-write.png')}></img></div>
                            <div className="ml-1 stripe">|</div>
                            <div className="col-0.5 ml-1 edit"><img src={require('../../../../img/bin.png')}></img></div>


                        </div>
                        : null
                }





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

