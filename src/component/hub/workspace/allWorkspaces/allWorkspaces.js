import React, { useEffect, useRef, useState } from 'react'

import './allWorkspace.css'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewWorkspaceList from '../viewWorkspace/viewWorkspacelist/viewWorkspacelist'
import ViewWorkspaceGrid from '../viewWorkspace/viewWorkspaceGrid/viewWorkspaceGrid'
import ViewDetails from '../../viewDetails/viewDetails'
import ToastDelete from '../../toastDelete/toastDelete1'
import $ from 'jquery'

function AllWorkspaces(props) {
    const [showToastDelete, setShowToastDelete] = useState(false)
    const refToDeleteToast = useRef(null);

    useEffect(() => {
        props.getAllWorkspaces()
    }, []);

    const [list, setlist] = useState(false);
    const [grid, setgrid] = useState(true);
    const [showAddWorkspace, setShowWorkspace] = useState(false)
    const [addOrEditWorkspace, setAddOrEditWorkspace] = useState(false)


    const renderedListWorkspaces = props.workspaces ?
        props.workspaces.map((workspace, index) => {
            return <ViewWorkspaceList indexWorkspace={index}
                setShowToastDeleteWhenClickDelete={(obj) => props.showToast(obj)}
                key={workspace._id}
                index={index} workspace={workspace}
                editWorkspace={openEditWorkspace}
            //   bin={disableBin}
            />
        }) :
        <div className="logoGif"><img src={require('../../../img/animation.gif')} /></div>


    const renderedGridWorkspaces =
        props.workspaces ?
            props.workspaces.map((workspace, index) => {
                return <ViewWorkspaceGrid indexWorkspace={index}
                    setShowToastDeleteWhenClickDelete={(obj) => props.showToast(obj)}
                    key={workspace._id}
                    //  bin={disableBin} 
                    index={index}
                    workspace={workspace} editWorkspace={openEditWorkspace} />
            }) :
            <div className="logoGif"><img src={require('../../../img/animation.gif')} /></div>

    const [workspaceToEdit, setWorspaceToEdit] = useState()

    function openEditWorkspace(value) {
        setWorspaceToEdit(value)
        setAddOrEditWorkspace("editWorkspace")
        setShowWorkspace(true)
    }
    // "603ce1181ee2aa42a43e8f80"
    function chenge_list1() {
        setlist(true);
        setgrid(false)

    }
    function chenge_grid() {
        setlist(false);
        setgrid(true);
    }

    function openAddNewWorkspace(e) {
        setAddOrEditWorkspace("addWorkspace")
        setShowWorkspace(true)
        e.stopPropagation()
    }
    $(window).click(function () {
        setShowWorkspace(false)
    });
    function stopP(event) {
        event.stopPropagation();
    }
 
    return (

        <>
            <div className="row mt-5"></div>
            <div className="col-12">
                <div className="row borderBottom mx-5">
                    <div className="MyWorkspace">My Workspace</div>
                    <div className="row">
                        {
                            grid ?
                                <>
                                    <div className="col-1 grid" title="Grid" onClick={chenge_grid}><img src={require('../../../img/Group 19506.png')}></img></div>
                                    <div className="col-1 list" title="List" onClick={chenge_list1}><img src={require('../../../img/list1.png')}></img></div>
                                </>
                                :
                                <>
                                    <div className="col-1 grid" title="Grid" onClick={chenge_grid}><img src={require('../../../img/Group 19507.png')}></img></div>
                                    <div className="col-1 list" title="List"  onClick={chenge_list1}><img src={require('../../../img/list.png')}></img></div>
                                </>
                        }
                    </div>
                </div>

                <div className="row mt-4 ml-5 view_workspace">

                    {/* add workspace button */}
                    {list ?
                        <div className="row WorkspaceList mt-3 " >
                            <div className="col-10" onClick={(e) => openAddNewWorkspace(e)}
                            >
                                <div className="row "  >
                                    <div className="Workspace addWorkspace"  >
                                        <div className="logoWorkspacelist addWorkspace "
                                            style={{ backgroundColor: "#778CA2" }}
                                            title="Add Workspace"
                                        >
                                            +
                                        </div>
                                    </div>
                                    <b className="mt-4 ml-2">Add Workspace</b>
                                </div>

                            </div>
                        </div>

                        :
                        <div className="Workspacegrid mt-4 addWorkspace" >
                            <div onClick={(e) => openAddNewWorkspace(e)}>
                                <div className="logoWorkspace1 " >
                                    <div className="mt-1 logo-w"
                                        style={{ backgroundColor: "#778CA2" }}
                                        title="Add Workspace"
                                    >+
                                </div>
                                </div>
                                <div className="name1 pt-1 "><p>Add Workspace</p> </div>
                            </div>
                        </div>
                    }
                    {list ?
                        renderedListWorkspaces

                        :
                        renderedGridWorkspaces
                    }
                </div>
            </div>
            {showAddWorkspace ?
                <div className="closeDet" onClick={(e) => stopP(e)}>
                    <ViewDetails
                        showToast={(obj)=> props.showToast(obj)}
                        closeViewDetails={() => setShowWorkspace(false)}
                        from={addOrEditWorkspace} workspace={workspaceToEdit} /></div> : null
            }
   
        </>

    )

}
const mapStateToProps = (state) => {

    return {
        workspaces: state.public_reducer.workspaces,
        workspaceDeleted: state.workspace_reducer.workspace
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addNewWorkspaceToServer: (props) => dispatch(actions.addNewWorkspaceToServer(props)),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        deleteWorkspaceFromServer: () => dispatch(actions.deleteWorkspaceFromServer()),

    }


}

export default connect(mapStateToProps, mapDispatchToProps)(AllWorkspaces)
