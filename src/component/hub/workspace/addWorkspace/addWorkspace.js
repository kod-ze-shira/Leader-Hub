import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewWorkspaceList from '../viewWorkspace/viewWorkspacelist/viewWorkspacelist'
import ViewWorkspaceGrid from '../viewWorkspace/viewWorkspaceGrid/viewWorkspaceGrid'
import ViewDetails from '../../viewDetails/viewDetails'

// let workspace;


function AddWorkspace(props) {

    useEffect(() => {

    }, []);

    const [workspace, setWorkspace] = useState({
        name: "",
        userId: "5fa79b45f8acce4894181b81",
        description: "",
        projet: [],
        team: []
    })

    function addNewWorkspace() {
        props.addNewWorkspaceToServer(workspace)
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        setWorkspace(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    return (
        <>

            <h5 className="mt-5">Add Workspace</h5>
            <input type="text" name="name" class="form-control mr-5 mt-2"
                id="workspace-name" placeholder="Enter workspace name"
                onChange={handleChange}
            />
            <input type="text" name="description" class="form-control mr-5 mt-2"
                id="workspace-describtion" placeholder="Enter workspace describtion"
                onChange={handleChange}
            />
            <button className="save_canges_btn" onClick={addNewWorkspace}>save workspace</button>
        </>

    )
}

const mapStateToProps = (state) => {

    return {
        workspaces: state.public_reducer.worksapces,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addNewWorkspaceToServer: (props) => dispatch(actions.addNewWorkspaceToServer(props)),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),

    }


}

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkspace)