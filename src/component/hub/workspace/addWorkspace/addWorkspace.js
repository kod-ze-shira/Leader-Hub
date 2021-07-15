import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewWorkspaceList from '../viewWorkspace/viewWorkspacelist/viewWorkspacelist'
import ViewWorkspaceGrid from '../viewWorkspace/viewWorkspaceGrid/viewWorkspaceGrid'
import ViewDetails from '../../viewDetails/viewDetails'
import { useRef } from 'react'
import ColorWorkspace from '../../color/colorWorkspace'

// let workspace;


function AddWorkspace(props) {


    // let [myColor, setMyColor] = useState("#C967B6")
    let [myColor, setMyColor] = useState()
    const [workspace, setWorkspace] = useState({
        name: "",
        description: "",
        color: ""
    })
    useEffect(() => {
        setMyColor(props.colorWorkspace)
        workspace.color = myColor
    }, [])
    const nameworkspae = useRef()

    const changeColorFiledInWorkspace = (color) => {
        let editWorkspaceInRedux = { "nameFiled": "color", "value": color}
        props.setWorkspaceByFiled(editWorkspaceInRedux)
    }

    // const changeColorWorkspace = (event) => {
    //     setMyColor(event.target.value)
    //     const { name, value } = event.target
    //     setWorkspace(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // }
    // if (!flag) {
    //     fun()
    //     setFlag(true)
    // }






    function addNewWorkspace() {

        if (nameworkspae.current.value) {
            workspace.color = myColor
            // props.addNewWorkspaceToServer(workspace)
            props.addNewWorkspaceToServer(props.workspaces[props.workspaces.length - 1])
            props.closeViewDetails()
        }
        else {
            nameworkspae.current.focus()
            var form = document.getElementById('nameRequired')
            form.classList.add('was-validated')
        }
    }

    // const handleChange = (event) => {
    //     const { name, value } = event.target
    //     setWorkspace(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // }

    const changeFiledInWorkspace = (input) => {
        if (input.target.name == 'color')
            setMyColor(input.target.value)

        let editWorkspaceInRedux = { "nameFiled": input.target.name, "value": input.target.value }
        props.saveIndexOfWorkspaceInRedux(props.workspaces.length - 1)
        props.setWorkspaceByFiled(editWorkspaceInRedux)
    }
    return (
        <>


            <div className="details d-workspace mr-5 ml-4" >
                <div className='propertiesViewDitails'>
                    <div className='row mt-4 mb-1 justify-content-between headerDitails'>
                        <h5 className=" title-view-details   pl-3">Add Workspace </h5>

                        <div class="close pr-3" onClick={() => props.closeViewDetails()} >x</div>
                        {/* <h5 className="my-5 title-view-details pb-2">Add Workspace</h5> */}

                    </div>
                    <div class="form-group" id='nameRequired'>
                        <label for="name">Name</label>
                        <input name="name" ref={nameworkspae} required
                            // onChange={handleChange}
                            autoFocus
                            onChange={(input) => changeFiledInWorkspace(input)}
                            type="text" class="form-control" id="workspace-name" />
                        <div class="invalid-feedback">
                            Please enter workspace name.
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control descriptionWorkspace"
                            id="description" rows="2" placeholder="Write a description about your workspace"
                            // onChange={handleChange} 
                            onChange={(input) => changeFiledInWorkspace(input)}
                            contentEditable></textarea>
                    </div>
                    {/* <div class="form-group"> */}
                        <label className="row ml-2" for="color">Logo Color</label>
                        <ColorWorkspace setColorWorkspace={(color) => changeColorFiledInWorkspace(color)} />  

                        {/* onChange={handleChange} /> */}
                    {/* </div> */}

                </div>
                <div className="row justify-content-end">
                    <button onClick={addNewWorkspace} className="save_canges_btn px-5" id='sevaNewWorkspace'>Save</button>
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
        setWorkspaceByFiled: (workspace) => dispatch(actions.setWorkspaceByFiled(workspace)),
        saveIndexOfWorkspaceInRedux: (index) => dispatch(actions.saveIndexOfWorkspaceInRedux(index)),

    }


}

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkspace)