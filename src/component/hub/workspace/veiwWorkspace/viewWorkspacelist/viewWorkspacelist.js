import React, { useEffect, useState } from 'react'
import './viewWorkspacelist.css';
import { connect } from 'react-redux'
import { actions } from '../../../../../redux/actions/action'
import ProjectsByWorkspace from '../../../project/projectsByWorkspace/projectsByWorkspace'
// import TeamExample from '../../../../team/teamExample'
import { Button, Card, Form } from 'react-bootstrap';
import EditWorkspace from '../../editWorkspace/editWorkspace'
import history from '../../../../history'

function ViewWorkspaceList(props, { user, isConfiguratorOpenWorkspace, workspace, setisConfiguratorOpenWorkspace }) {

    const [viewProjects, setViewProjects] = useState(false)
    const [showShare, setShowShare] = useState(false)
    const [openEditWorkspace, setOpenEditWorkspace] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const viewProjectsByWorkspace = () => {
        // return  <projectsByWorkspace/>
        setViewProjects(!viewProjects);
    }

    const toOpenEditWorkspace = () => {
        setOpenEditWorkspace(!openEditWorkspace)
    }

    const routeToProject = (id) => {
        debugger
        history.push("/" + 'renana-il' + "/workspace/" + id)
        // history.push("/renana-il/workspace/" + id)

    }



    return (
        <>

            <>

                <Card
                    onClick={() => routeToProject(workspace._id)}

                    className="cardWorkspace"
                    // onClick={() => { setisConfiguratorOpenWorkspace() }}
                    onMouseOver={() => setShowInput(true)}
                    onMouseLeave={() => setShowInput(false)}
                >
                    {
                        showInput ?
                            // <Form.Group controlId="formBasicCheckbox">

                            //   <Form.Check type="checkbox" className='checkWorkspace' label="" />
                            // </Form.Group>
                            <input type="checkbox"
                                onMouseOver={() => setShowInput(true)}
                                onClick={() => setShowInput(true)}
                                className='checkWorkspace' />

                            : null
                    }
                    < div className="logoWorkspace"
                        onMouseOver={() => setShowInput(true)
                        }

                    // style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}
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
                    </div>
                </Card >
            </>



        </>
    )
}
const mapStateToProps = (state) => {

    return {
        workspaces: state.public_reducer.worksapces,
        user: state.public_reducer.userName,

        isConfiguratorOpenWorkspace: state.workspace_reducer.isConfiguratorOpenWorkspace

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setisConfiguratorOpenWorkspace: () => dispatch(actions.setisConfiguratorOpenWorkspace()),
        getWorkspaceByIdFromServer: () => dispatch(actions.getWorkspaceByIdFromServer()),

    }


}
export default connect(mapStateToProps, mapDispatchToProps)(ViewWorkspaceList)

