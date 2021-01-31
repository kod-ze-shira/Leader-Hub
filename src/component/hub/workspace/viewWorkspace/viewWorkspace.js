import React, { useEffect, useState } from 'react'
import './viewWorkspace.css';
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ProjectsByWorkspace from '../../project/projectsByWorkspace/projectsByWorkspace'
import TeamExample from '../../team/teamExample'
import { Button, Card, Form } from 'react-bootstrap';
import EditWorkspace from '../editWorkspace/editWorkspace'
import project_reducer from '../../../../redux/Reducers/project_reducer';
import history from '../../../history'

function ViewWorkspace({props, user, isConfiguratorOpenWorkspace, workspace, setisConfiguratorOpenWorkspace }) {

  const [viewProjects, setViewProjects] = useState(false)
  const [viewCards, setViewCards] = useState(false)
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

  const routeToProject = () => {
    // props.setWorkspaceName("Leader 1")
    // history.push("/" + user + "/projectPlatform"+"/"+workspace._id)
    history.push("/" + user + "/projectPlatform")

    
  }
  return (
    <>

      <>

        <Card className="cardWorkspace" onClick={() => routeToProject()}
          // <Card className="cardWorkspace" onClick={() => { setisConfiguratorOpenWorkspace() }}

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
            style={{ backgroundColor: workspace.color ? workspace.color ? workspace.color : "#F7B500" : "#F7B500" }}>
            {workspace.name[0].toUpperCase()}
            {
              workspace.name && workspace.name.indexOf(" ") && workspace.name.indexOf(" ") + 1 ?
                workspace.name[workspace.name.indexOf(" ") + 1].toUpperCase() : null
            }
          </div >

          <div className='nameWorkspace' ><b>{workspace.name}</b></div>
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
    user: state.public_reducer.userName,
    workspaces: state.public_reducer.worksapces,
    isConfiguratorOpenWorkspace: state.workspace_reducer.isConfiguratorOpenWorkspace

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // setWorkspaceName:(name)=> dispatch(actions.setWorkspaceName(name)),
    setWorkspaceId: () => dispatch(actions.setWorkspaceId()),
    setisConfiguratorOpenWorkspace: () => dispatch(actions.setisConfiguratorOpenWorkspace()),
    getWorkspaceByIdFromServer: () => dispatch(actions.getWorkspaceByIdFromServer()),
  }


}
export default connect(mapStateToProps, mapDispatchToProps)(ViewWorkspace)




