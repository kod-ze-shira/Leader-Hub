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

// import workspacePlatform from './workspacePlatform/workspacePlatform';
import WorkspacePlatform from './warkspacePlatform/workspacePlatform'
import CardsPage from './cardsPage/cardsPage'
import Toast from "./toast/toastTaskCompleted";
import ProjectsPage from './project/projectsPage/projectsPage'
import './hub.css'
import TaskNotBelongCardForUser from './task/taskNotBelongCardForUser/taskNotBelongCardForUser'
import ToastDelete from './toastDelete/toastDelete1';
import { actions } from '../../redux/actions/action'
import { connect } from 'react-redux'
import $ from 'jquery'
import AddObject from './addObject/addObject'
import HeaderLeader from '@leadercodes/leader-header'
import ViewDetails from './viewDetails/viewDetails'
import Milestones from './Milestones/Milestones'
import ProtectedRoute from '../../ProtectedRoute/protectedRoute';
import { Token } from '../../redux/Store/Store'
import DisplayGantt from '../Gantt/DisplayGantt/displayGantt';
import ShureDelete from './shureDelete/shureDelete'


function Hub(props) {
    const [open, setOpen] = useState(true);
    const [showToastDelete, setShowToastDelete] = useState(false)
    const [showModalDelete, setShowModlalDelete] = useState(false)
    const [showToastComplete, setShowToastComplete] = useState(false)
    const [objectToDelete, setObjectToDelete] = useState()






    const showToastToDelete = (objectToDelete) => {
        setObjectToDelete(objectToDelete)
        if (objectToDelete.type == 'Task')
            setShowToastDelete(true)
        else {
            setShowModlalDelete(true)
        }
    }
    const deleteObject = () => {
        setShowToastDelete(false)
        props['remove' + objectToDelete.type](objectToDelete.object._id)
    }
    const openConfigurator = () => {
        setOpen(!open);
    }
    const setShowToastDeletefunc = (value) => {
        setShowToastDelete(value)
        if (objectToDelete.type == "Card") {
            $(`#${objectToDelete.object._id} `).removeClass("displayNone")
            $(`#${objectToDelete.object._id} `).addClass("mt-4")
            $(`#${objectToDelete.object._id} `).addClass("col-3")
        }
        else if (objectToDelete.type == "Task")
            $(`#${objectToDelete.object._id + "disappear"}`).css("display", "block")
        else if (objectToDelete.type == "Project")
            $(`#${objectToDelete.object._id}`).css("display", "table-row")
        else
            $(`#${objectToDelete.object._id}`).css("display", "block")

    }


    const [focusInputCard, setFocusInputCard] = useState(false)

    return (
        <>
            {showModalDelete ? <ShureDelete
                showToastDelete={(e) => setShowToastDelete(true)}
                objectToDelete={objectToDelete}
                closeModal={(e) => setShowModlalDelete(e)}
            /> : null}


            <HeaderLeader userName={props.user} appName='hub' />‏
            <div onClick={openConfigurator} >
                <img className="menu-open-close" src={require('../img/menu.png')}></img>
            </div>
            <Router history={history}>

                <div className="row back-screen">

                    <div className="col-2 px-0">
                        <Configurator openOrClose={(e) => setOpen(!open)} />
                    </div>

                    <div className={open ? "col-10 bodyHub" : "col-12 bodyHub mx-2 "}>
                        <Switch>
                            {/* <button onClick={() => window.location.reload(false)}>Click to reload!</button> */}

                            <ProtectedRoute path={"/:userName/hub/workspace/:idWorkspace"} user={Token} >
                                <ProjectsPage showToastDelete={(obj) => showToastToDelete(obj)} />
                            </ProtectedRoute>
                            <ProtectedRoute path={"/:userName/hub/gantt"} user={Token} >
                                <div className="body-workspace mt-3">
                                    <DisplayGantt />
                                </div>
                            </ProtectedRoute>
                            <ProtectedRoute path={"/:userName/hub/allProjects"} user={Token} >
                                <ProjectsPage showToastDelete={(obj) => showToastToDelete(obj)} />
                            </ProtectedRoute>

                            {/* <ProtectedRoute path={"/workspacePlatform"}>
                                <WorkspacePlatform />
                            </ProtectedRoute> */}

                            <ProtectedRoute path={"/:userName/hub/projectPlatform/:idProject"}>
                                <CardsPage
                                    viewToastComplete={(val) => setShowToastComplete(true)}
                                    focusInputCard={focusInputCard} showToastDelete={(obj) => showToastToDelete(obj)} />
                            </ProtectedRoute>

                            <ProtectedRoute path={"/:userName/hub/allTasks"}>
                                <TaskNotBelongCardForUser />
                            </ProtectedRoute>

                            <ProtectedRoute path={"/:userName/hub/milestones"}>
                                <Milestones />
                            </ProtectedRoute>

                            <ProtectedRoute path={"/:userName"}>
                                <Body showToastDelete={(obj) => showToastToDelete(obj)} />
                            </ProtectedRoute>
                            <Route path="/" >
                                <div id='cdggdfdfb'>

                                </div>
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
                        <Toast /> : null}


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


