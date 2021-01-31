import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import { Button } from 'react-bootstrap';
import ViewProject from '../../../hub/project/viewProjectNew/viewProjectNew'
import ProjectsByWorkspace from '../../../hub/project/projectsByWorkspace/projectsByWorkspace'
import { Dropdown } from 'react-bootstrap';

const mapStateToProps = (state) => {
    return {
        projects: state.public_reducer.projects
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getProjectsByWorkspaceId: (idWorkspace) => dispatch(actions.getProjectsByWorkspace(idWorkspace))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(

    function btnLiveChat(props) {
        // const [flag, setFlag] = useState(false)
        // const [flag, setFlag] = useState(false)

        const viewProjectsByWorkspace = props.projects.map((project) => {
            return <viewProject key={project._id} project={project} />

        })
        return (
            <>
                <button onClick >Live Chat</button>
                {viewProjectsByWorkspace}
               
                {/* <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Live Chat
                        </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item >HI</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
            </>

        )
    }
)