import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewWorkspaceList from '../viewWorkspace/viewWorkspacelist/viewWorkspacelist'
import ViewWorkspaceGrid from '../viewWorkspace/viewWorkspaceGrid/viewWorkspaceGrid'
import ViewDetails from '../../viewDetails/viewDetails'
import { useRef } from 'react'

// let workspace;


function AddWorkspace(props) {

    const colorList = ["#C967B6", "#8D18AD", "#4D2AC9", "#6A67C9", "#2B79C2", "#32AABA", "#34A38B", "#53A118", "#91A118", "#BDAA1C",
        "#C48E1A", "#C46F1A", "#C43C1A", "#BF2E63", "#C9676F",
        "#FD80E5", "#B620E0", "#6236FC", "#8580FD", "#3598F4", "#40D9ED", "#44D7B6", "#6DD41F", "#BFD41", "#F0D923",
        "#F8B520", "#F88C20", "#F84A20", "#F13B7F", "#FD808B",
        "#FCB3EE", "#CA79E0", "#8868FC", "#B6B3FC", "#67B0F5", "#6FDEED", "#6FD6C0", "#86D44A", "#C4D44A", "#F0DE54",
        "#F7C352", "#F7A452", "#F77352", "#F26B9C", "#FCB3B9"]
    // let [myColor, setMyColor] = useState("#C967B6")
    let [myColor, setMyColor] = useState()
    const [workspace, setWorkspace] = useState({
        name: "",
        description: "",
        color: ""
    })
    useEffect(() => {
        let p = getRandomColor()
        setMyColor(p)
        workspace.color = myColor
    }, [])
    const nameworkspae = useRef()

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
    // function fun() {
    //     let p = getRandomColor()
    //     setMyColor(p)
    // }

    function getRandomColor() {
        const randColor = Math.floor((Math.random() * colorList.length) + 0)
        const color = colorList[randColor]
        return color;
    }



    function addNewWorkspace() {
        debugger
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
                    <div class="form-group">
                        <label for="color">Logo Color</label>
                        <input name="color"
                            className="ml-2 "
                            styles="height: 50px"
                            type="color"
                            // id='colorProject'
                            // value={myColor}
                            onChange={(input) => changeFiledInWorkspace(input)}
                        />
                        {/* onChange={handleChange} /> */}
                    </div>
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