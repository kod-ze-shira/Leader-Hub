import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import { useRef } from 'react'
import ColorWorkspace from '../../color/colorWorkspace'

function AddWorkspace(props) {
    let ifAddWorkspace = false
    let [myColor, setMyColor] = useState()
    const [workspace, setWorkspace] = useState({
        name: "",
        description: "",
        color: ""
    })
    useEffect(() => {
        setMyColor(props.colorWorkspace)
        workspace.color = myColor
        return () => {
            if (!props.workspaces[props.indexOfWorkspace]._id)
                props.addNewWorkspaceToServer(props.workspaces[props.workspaces.length - 1])
            //   props.removeOneWorkspaceFromWorkspaces()

        };
    }, [])

    const nameworkspae = useRef()
    const changeColorFiledInWorkspace = (color) => {
        let editWorkspaceInRedux = { "nameFiled": "color", "value": color }
        props.setWorkspaceByFiled(editWorkspaceInRedux)
    }

    async function addNewWorkspace() {
        ifAddWorkspace = true
        if (nameworkspae.current.value) {
            workspace.color = myColor
            // props.addNewWorkspaceToServer(props.workspaces[props.workspaces.length - 1])
            props.closeViewDetails()

        }
        else {
            nameworkspae.current.focus()
            var form = document.getElementById('nameRequired')
            form.classList.add('was-validated')
        }
    }
    function newWorkspace() {
        return new Promise(async (resolve, reject) => {
            try {
                let newWorkspace = await props.addNewWorkspaceToServer(props.workspaces[props.workspaces.length - 1])
                resolve(newWorkspace)
            } catch (error) {
                reject(error)
            }
        })
    }
  

    const changeFiledInWorkspace = (input) => {
        if (input.target.name === 'color')
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
                        <h5 className=" title-view-details pl-3">Add Workspace </h5>
                        <div className="close pr-3" onClick={() => props.closeViewDetails()} >x</div>
                    </div>
                    <div className="form-group" id='nameRequired'>
                        <label htmlFor="name">Name</label>
                        <input name="name" ref={nameworkspae} required
                            // onChange={handleChange}
                            autoFocus
                            onChange={(input) => changeFiledInWorkspace(input)}
                            type="text" className="form-control" id="workspace-name" />
                        <div className="invalid-feedback">
                            Please enter workspace name.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control descriptionWorkspace"
                            id="description" rows="2" placeholder="Write a description about your workspace"
                            // onChange={handleChange} 
                            onChange={(input) => changeFiledInWorkspace(input)}
                            contenteditable></textarea>
                    </div>
                    {/* <div className="form-group"> */}
                    <label className="row ml-2" htmlFor="color">Logo Color</label>
                    <ColorWorkspace setColorWorkspace={(color) => changeColorFiledInWorkspace(color)} />

                    {/* onChange={handleChange} /> */}
                    {/* </div> */}

                </div>
                <div className="row justify-content-end">
                    <button onClick={addNewWorkspace} className="save_canges_btn px-5" id='sevaNewWorkspace'>Save</button>
                </div>
            </div >
        </>

    )
}

const mapStateToProps = (state) => {

    return {
        workspaces: state.public_reducer.workspaces,
        indexOfWorkspace: state.public_reducer.indexOfWorkspace,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addNewWorkspaceToServer: (props) => dispatch(actions.addNewWorkspaceToServer(props)),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        setWorkspaceByFiled: (workspace) => dispatch(actions.setWorkspaceByFiled(workspace)),
        saveIndexOfWorkspaceInRedux: (index) => dispatch(actions.saveIndexOfWorkspaceInRedux(index)),
        removeOneWorkspaceFromWorkspaces: (a) => dispatch(actions.removeOneWorkspaceFromWorkspaces(a)),
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkspace)