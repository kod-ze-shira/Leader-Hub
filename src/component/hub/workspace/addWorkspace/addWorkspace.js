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
        userId: "",
        description: "",
        projet: [],
        team: []
    })

    function addNewWorkspace() {
        props.addNewWorkspaceToServer(workspace)
        props.closeViewDetails()
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

            {/* <h5 className="mt-5">Add Workspace</h5>
            <input type="text" name="name" class="form-control mr-5 mt-2"
                id="workspace-name" placeholder="Enter workspace name"
                onChange={handleChange}
            />
            <input type="text" name="description" class="form-control mr-5 mt-2"
                id="workspace-describtion" placeholder="Enter workspace describtion"
                onChange={handleChange}
            />
            <button className="save_canges_btn" onClick={addNewWorkspace}>save workspace</button> */}
            <div className="details d-workspace mr-5 ml-4">
                <h5 className="my-5 title-view-details pb-2">Add Workspace</h5>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input name="name"
                        onChange={handleChange} type="text" class="form-control" id="workspace-name" />
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description" rows="5" placeholder="Write a description about your project"
                        onChange={handleChange}></textarea>
                </div>
                <div class="form-group">
                    <label for="color">Workspace Color</label>
                    <input name="color"
                        className="ml-2 w-25 "
                        styles="height: 50px"
                        type="color"
                        // id='colorProject'
                        onChange={handleChange} />
                </div>
                <div className="row justify-content-between mt-5 mx-1 btns-in-view-details-workspace ">
                    {/* <button data-toggle="tooltip" data-placement="top" title="Garbage" className="delete-btn col-4 " >
                        <img src={require('../../../img/bin.png')}></img> Delete
                </button> */}
                    <button onClick={addNewWorkspace} className="save_canges_btn col-3">Save</button>
                </div>
            </div>
        </>

    )
}

const mapStateToProps = (state) => {

    return {
        workspaces: state.public_reducer.workspaces,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addNewWorkspaceToServer: (props) => dispatch(actions.addNewWorkspaceToServer(props)),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),

    }


}

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkspace)