import React, { useEffect, useRef, useState } from 'react'

import './allWorkspace.css'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewWorkspaceList from '../viewWorkspace/viewWorkspacelist/viewWorkspacelist'
import ViewWorkspaceGrid from '../viewWorkspace/viewWorkspaceGrid/viewWorkspaceGrid'
import ViewDetails from '../../viewDetails/viewDetails'
// import ToastDelete from '../../toastDelete/toastDelete1'
import title from '../../../../Data/title.json'
import $ from 'jquery'
import ReactTooltip from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function AllWorkspaces(props) {
    // const [showToastDelete, setShowToastDelete] = useState(false)
    // const [showModalDelete, setShowModalDelete] = useState(false)
    // const refToDeleteToast = useRef(null);


    useEffect(() => {
        props.getAllWorkspaces()
        props.getContactsForUser()
        props.getAllTeamsForUser()


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
    // $(function () {
    //     $('[data-toggle="tooltip"]').tooltip()
    // })
    function openAddNewWorkspace(e) {
        props.addWorkspaceToWorkspaces({ description: "", name: "" })
        setAddOrEditWorkspace("addWorkspace")
        setShowWorkspace(true)
        e.stopPropagation()
    }
    $(window).click(function () {
        setShowWorkspace(false)
        // props.addWorkspaceToWorkspacesFromServer(null)//to delete workspace in redux
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

                                    {/* <img data-tip data-for="registerTip" src={copy} id="img1" onClick={copyToClipboard} className="img_copy"></img> */}
                                    <div data-tip data-for="Grid" className="col-1 grid" onClick={chenge_grid}>
                                        <img src={require('../../../img/gridIcon.png')} />
                                    </div>
                                    <ReactTooltip id="Grid" place="bottom" effect="solid">
                                        {title.title_view_grid}
                                    </ReactTooltip>
                                    <div data-tip className="col-1 list" data-for="List" onClick={chenge_list1}>
                                        <img src={require('../../../img/list1.png')} />
                                    </div>
                                    <ReactTooltip data-tip id="List" place="bottom" effect="solid">
                                        {title.title_view_list}
                                    </ReactTooltip>
                                </>
                                :
                                <>
                                    <div data-tip className="col-1 grid" data-for="Grid" onClick={chenge_grid}>
                                        <img src={require('../../../img/Group 19507.png')} />
                                    </div>
                                    <ReactTooltip id="Grid" place="bottom" effect="solid">
                                        {title.title_view_grid}
                                    </ReactTooltip>
                                    <div data-tip className="col-1 list" data-for="List" onClick={chenge_list1}>
                                        <img src={require('../../../img/listIcon.png')} />
                                    </div>
                                    <ReactTooltip data-tip id="List" place="bottom" effect="solid">
                                        {title.title_view_list}
                                    </ReactTooltip>
                                </>
                        }
                    </div>
                </div>

                <div className="row  ml-5 view_workspace">

                    {/* add workspace button */}
                    {list ?
                        <div className="row WorkspaceList mt-3 " >
                            <div className="col-10" onClick={(e) => openAddNewWorkspace(e)}
                            >
                                <div className="row "  >
                                    <div className="Workspace addWorkspace"  >
                                        <div className="logoWorkspacelist addWorkspace "
                                            style={{ backgroundColor: "#778CA2" }}
                                            data-tip data-for="add_w"
                                        >
                                            {/* <ReactTooltip data-tip id="add_w" place="top" effect="solid">
                                                {title.title_add_workspace}
                                            </ReactTooltip> */}
                                            +
                                        </div>
                                    </div>
                                    <b className="mt-4 ml-2">Add Workspace</b>
                                </div>

                            </div>
                        </div>

                        :
                        <div className="Workspacegrid addWorkspace divAddWorkspace" >
                            <div onClick={(e) => openAddNewWorkspace(e)} >
                                <div className="logoWorkspace1 pt-2 px-1" >
                                    <div className="mt-1 logo-w"
                                        // style={{ backgroundColor: "#778CA2" }}
                                        data-tip data-for="add_w"
                                    >+ </div>
                                    {/* <ReactTooltip data-tip id="add_w" place="top" effect="solid">
                                        {title.title_add_workspace}
                                    </ReactTooltip> */}

                                </div>
                                <div className="name1 mt-4"><p>Add Workspace</p> </div>
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
            {
                showAddWorkspace ?
                    <div className="closeDet" onClick={(e) => stopP(e)}>
                        <ViewDetails
                            showToast={(obj) => props.showToast(obj)}
                            closeViewDetails={() => setShowWorkspace(false)}
                            from={addOrEditWorkspace} workspace={workspaceToEdit} />
                    </div> : null
            }

        </>

    )

}
const mapStateToProps = (state) => {

    return {
        workspaces: state.public_reducer.workspaces,
        workspaceDeleted: state.workspace_reducer.workspace,
        contactsUser: state.share_reducer.contactsUser,
        teamsUser: state.share_reducer.teamsUser,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addWorkspaceToWorkspaces: (props) => dispatch(actions.addWorkspaceToWorkspaces(props)),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
        deleteWorkspaceFromServer: () => dispatch(actions.deleteWorkspaceFromServer()),
        getContactsForUser: () => dispatch(actions.getContactsForUser()),
        getAllTeamsForUser: () => dispatch(actions.getAllTeamsForUser()),
        addWorkspaceToWorkspacesFromServer: (obj) => dispatch(actions.addWorkspaceToWorkspacesFromServer(obj))
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(AllWorkspaces)
