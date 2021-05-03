import React, { useEffect, useState } from 'react'
import Body from './body/body';
import Configurator from '../warps/configurator/newConfigurator/new_configurator';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom';
import history from "../history"

import ProjectsByWorkspace from './project/projectsByWorkspace/projectsByWorkspace'
// import workspacePlatform from './workspacePlatform/workspacePlatform';
import WorkspacePlatform from './warkspacePlatform/workspacePlatform'
import ProjectPlatform from './projectPlatform/projectPlatform'
import CardsByProject from './Cards/cardsByProject/cardsByProject'
import HeaderBody from './headerBody/headerBody'
import CardsPage from './cardsPage/cardsPage'
import Toast from "./toast/toast";
import ProjectsPage from './project/projectsPage/projectsPage'
import './hub.css'
import TaskNotBelongCardForUser from './task/taskNotBelongCardForUser/taskNotBelongCardForUser'
import ToastDelete from './toastDelete/toastDelete1';
import { actions } from '../../redux/actions/action'
import { connect } from 'react-redux'
import $ from 'jquery'
import UploadFile from './uploadFile/uploadFile'
import AddObject from './addObject/addObject'
import HeaderLeader from '@leadercodes/leader-header'
import ViewDetails from './viewDetails/viewDetails'
import Milestones from './Milestones/Milestones'
import ProtectedRoute from '../../ProtectedRoute/protectedRoute';
import { Token } from '../../redux/Store/Store'
import DisplayGantt from '../Gantt/DisplayGantt/displayGantt';

function Hub(props) {
    const [open, setOpen] = useState(true);
    const [showToastDelete, setShowToastDelete] = useState(false)
    const [showToastComplete, setShowToastComplete] = useState(false)

    const [objectToDelete, setObjectToDelete] = useState()
    const [viewDetails, setViewDetails] = useState(false)
    const [formViewDitails, setFormViewDitails] = useState()


    const showToastToDelete = (objectToDelete) => {
        setObjectToDelete(objectToDelete)
        setShowToastDelete(true)
    }
    const deleteObject = () => {
        console.log(objectToDelete)
        setShowToastDelete(false)
        debugger
        props['remove' + objectToDelete.type](objectToDelete.object._id)

    }
    const openConfigurator = () => {
        setOpen(!open);
    }
    const setShowToastDeletefunc = (value) => {
        setShowToastDelete(value)
        if (objectToDelete.type == "Card" || objectToDelete.type == "Task")
            $(`#${objectToDelete.object._id + "disappear"}`).css("display", "block")
        else if (objectToDelete.type == "Project")
            $(`#${objectToDelete.object._id}`).css("display", "table-row")
        else
            $(`#${objectToDelete.object._id}`).css("display", "block")

    }

    const openViewDetails = (value) => {
        setFormViewDitails(value)
        setViewDetails(true)
    }

    function openSearchProject() {
        document.getElementById('inputSearchProjects').style.display = 'inline-block'
    }

    function closeInputSearch() {
        document.getElementById('inputSearchProjects').style.display = 'none'
    }
    // $(window).click(function () {
    //     setViewDetails(false)
    // });
    // function stopP(event) {
    //     event.stopPropagation();
    // }
    const [focusInputCard, setFocusInputCard] = useState(false)

    return (
        <>
            <HeaderLeader userName={props.user} appName='hub' />‏
            <div onClick={openConfigurator} >
                <img className="menu-open-close" src={require('../img/menu.png')}></img>
            </div>
            <Router history={history}>
                {/* <Nav openConfigurator={openConfigurator} /> */}

                <div className="row back-screen">
                    {/* {open ? */}
                    <div className="col-2 px-0">
                        <Configurator openOrClose={(e) => setOpen(!open)} />
                    </div>
                    {/* // : null} */}
                    <div className={open ? "col-10 bodyHub" : "col-12 bodyHub mx-2 "}>
                        {/* {viewDetails ?
                            <div className="closeDet" onClick={(e) => stopP(e)}>
                                <ViewDetails
                                    closeViewDetails={() => setViewDetails(false)}
                                    from={formViewDitails}
                                />
                            </div>
                            : null
                        } */}
                        <Switch>
                           
                            <ProtectedRoute path={"/:userName/workspace/:idWorkspace"} user={Token} >
                                <ProjectsPage showToastDelete={(obj) => showToastToDelete(obj)} />
                            </ProtectedRoute>
                            <ProtectedRoute path={"/:userName/gantt"} user={Token} >
                                <div className="body-workspace mt-3">
                                    <DisplayGantt />
                                </div>
                            </ProtectedRoute>
                            <ProtectedRoute path={"/:userName/allProjects"} user={Token} >
                                <ProjectsPage showToastDelete={(obj) => showToastToDelete(obj)} />
                            </ProtectedRoute>
                            {/* <Route path="/workspacePlatform" >
                                <WorkspacePlatform />
                            </Route> */}
                            <ProtectedRoute path={"/workspacePlatform"}>
                                <WorkspacePlatform />
                            </ProtectedRoute>
                          
                            <ProtectedRoute path={"/:userName/projectPlatform/:idProject"}>
                                <CardsPage focusInputCard={focusInputCard} showToastDelete={(obj) => showToastToDelete(obj)} />
                            </ProtectedRoute>
                            {/* <Route path="/:userName/myTasks" >
                                <TaskNotBelongCardForUser />
                            </Route> */}
                            <ProtectedRoute path={"/:userName/allTasks"}>
                                <TaskNotBelongCardForUser />
                            </ProtectedRoute>

                            <ProtectedRoute path={"/:userName/milestones"}>
                                <Milestones />
                            </ProtectedRoute>
                            {/* <Route path="/:userName" >
                                <Body showToastDelete={(obj) => showToastToDelete(obj)} />
                            </Route> */}
                            <ProtectedRoute path={"/:userName"}>
                                <Body showToastDelete={(obj) => showToastToDelete(obj)} />
                            </ProtectedRoute>
                            <Route path="/" >
                                <div id='cdggdfdfb'>
                                    <button onClick={() => props.createSystemWave()}>createSystemWave</button>

                                    {/* contentEditable
                                    height: auto;
                              max-height: 110px;
                                 overflow: auto; */}
                                    <UploadFile />
                                    {/* <span id='searchProject' >
                                        <img id='iconSearchProject' src={require('../img/imge_search.png')} onMouseOver={() => openSearchProject()} />
                                        <input type='text' id='inputSearchProjects' className='inputSearchProjects'
                                            onMouseLeave={() => closeInputSearch()}
                                        />‏
                                    </span> */}
                                </div>
                                {/* <Animation /> */}
                            </Route>
                        </Switch>
                    </div>

                    {showToastDelete ?
                        <ToastDelete
                            toOnClose={deleteObject}
                            toSetShowToastDelete={() => { setShowToastDeletefunc(false) }}
                            name={objectToDelete.name ? objectToDelete.name : objectToDelete.object.name}
                        />
                        : null}
                    {showToastComplete ?
                        <Toast
                        // toOnClose={deleteObject}
                        // toSetShowToastDelete={() => { setShowToastDeletefunc(false) }}
                        // name={objectToDelete.name ? objectToDelete.name : objectToDelete.object.name}
                        />
                        : null}

                    {/* <AddObject setShowViewDitails={(obj) => openViewDetails(obj)} focusInputCard={() => setFocusInputCard(true)} /> */}
                    {/* setShowViewDitails={} */}
                </div>

            </Router >
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.public_reducer.userName
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeCard: (cardId) => dispatch(actions.removeCardById(cardId)),
        removeTask: (taskId) => dispatch(actions.removeTaskById(taskId)),
        removeProject: (p) => dispatch(actions.deleteProjectInServer(p)),
        removeWorkspace: () => dispatch(actions.deleteWorkspaceFromServer()),
        addFile: (files) => dispatch(actions.addFile(files)),
        createSystemWave: () => dispatch(actions.createSystemWave()),


    }


}
export default connect(mapStateToProps, mapDispatchToProps)(Hub)


