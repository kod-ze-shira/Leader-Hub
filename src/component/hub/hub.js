import React, { useState } from 'react'
import Body from './body/body';
import Configurator from '../warps/configurator/newConfigurator/new_configurator';
import {
    BrowserRouter as Router,
    Switch,
    Route,

    // Link,
    // Redirect,
} from 'react-router-dom';
import history from "../history"
import CalendarComponent from './calendar/CalendarComponent';
import CardsPage from './cardsPage/cardsPage'
// import Toast from "./toast/toastTaskCompleted";
import ProjectsPage from './project/projectsPage/projectsPage'
// import ViewFilesOfProject from '../hubFeature/Overview/viewFilesOfProject/viewFilesOfProject'
import './hub.css'
import TaskNotBelongCardForUser from './task/taskNotBelongCardForUser/taskNotBelongCardForUser'
import ToastDelete from './toastDelete/toastDelete1';
import { actions } from '../../redux/actions/action'
import { connect } from 'react-redux'
import $ from 'jquery'
// import AddObject from './addObject/addObject'
// import HeaderLeader from '@leadercodes/leader-header'
// import ViewDetails from './viewDetails/viewDetails'
import Milestones from './Milestones/Milestones'
import ProtectedRoute from '../../ProtectedRoute/protectedRoute';
import { Token } from '../../redux/Store/Store'
import DisplayGantt from '../Gantt/DisplayGantt/displayGantt';
import ShureDelete from './shureDelete/shureDelete'
import ContactList from './contact/contactList';
// import Hangout from "../hubFeature/Overview/hangout/hangout";
import selectTask from './SelectHeader/selectTask/selectTask';
import ToastMessage from '../hub/toast/toastMessage'
import RocketShip from './rocketShip/rocketShip'
import ViewAllStatuses from '../hub/status/viewAllStatuses';


function Hub(props) {
    const [open, setOpen] = useState(true);
    const [showToastDelete, setShowToastDelete] = useState(false)
    const [showModalDelete, setShowModlalDelete] = useState(false)
    const [showToastComplete, setShowToastComplete] = useState(false)
    const [objectToDelete, setObjectToDelete] = useState([])
    const [objectToDeleteLocal, setObjectToDeleteLocal] = useState()
    const [showContactList, setShowContactList] = useState(false)
    const [showStatusesList, setShowStatusesList] = useState(false)

    const [openCalander, setOpenCalander] = useState(false)
    const [showRocketShip, setShowRocketShip] = useState(false)

    // const [objectToDelete, setObjectToDelete] = useState()

    const showToastToDelete = (objectToDelete_) => {

        // setObjectToDelete(objectToDelete_)
        if (objectToDelete_.type === 'Task') {

            objectToDelete.push(objectToDelete_)
            setObjectToDeleteLocal(objectToDelete_)
            setShowToastDelete(true)
        }
        else {
            setObjectToDeleteLocal(objectToDelete_)
            setShowModlalDelete(true)

        }
    }
    const deleteObject = () => {
        setShowToastDelete(false)
        let length = objectToDelete.length
        for (let i = 0; i < length; i++) {
            props['remove' + objectToDelete[i].type](objectToDelete[i].object._id)
        }
    }
    const openConfigurator = () => {
        setOpen(!open);
    }
    const setShowToastDeletefunc = (value) => {

        setShowToastDelete(value)
        let i = objectToDelete.length - 1
        if (objectToDelete[i].type == "Card") {
            $(`#${objectToDelete[i].object._id} `).css("display", "inline-block")
        }
        else if (!objectToDelete[i].object.card)
            $(`#${objectToDelete[i].object._id + "disappear"}`).css("display", "flex")
        else if (objectToDelete[i].type == "Task")
            $(`#${objectToDelete[i].object._id + "disappear"}`).css("display", "block")

        else if (objectToDelete[i].type == "Project")
            $(`#${objectToDelete[i].object._id}`).css("display", "table-row")
        else
            $(`#${objectToDelete[i].object._id}`).css("display", "block")
        for (let index = 0; index < i; index++) {
            props['remove' + objectToDelete[index].type](objectToDelete[index].object._id)
        }
        setObjectToDelete([])
        setObjectToDeleteLocal()
    }

    const showToast = () => {
        objectToDelete.push(objectToDeleteLocal)
        setShowToastDelete(true)
    }
    const ShowObject = (val) => {

        switch (val) {
            case "calander":
                setOpenCalander(true)
                break;
            case "share":
                setShowContactList(true)
                break;
            case "status":
                setShowStatusesList(true)
                break;
            default:
                break;
        }
    }
    $(window).click(function () {
        setShowContactList(false)
        setOpenCalander(false)
        setShowStatusesList(false)
    });
    $(window).scroll(function () {
        setShowContactList(false)
        setOpenCalander(false)
        setShowStatusesList(false)


    });
    const deleteWorkspaceInRedux = () => {

        if (props.workspaces[props.workspaces.length - 1]._id == undefined) {
            props.removeOneWorkspaceFromWorkspaces()
        }
    }
    const [focusInputCard, setFocusInputCard] = useState(false)
    return (
        <>
            {showModalDelete ? <ShureDelete
                showToastDelete={(e) => showToast()}
                objectToDelete={objectToDeleteLocal}
                closeModal={(e) => setShowModlalDelete(e)}
            /> : null}


            {/* <HeaderLeader userName={props.user} appName='hub' />‏
            <div onClick={openConfigurator} >
                <img className="menu-open-close" src={require('../img/menu.png')}></img>
            </div> */}
            <Router history={history}>

                <div className="row back-screen" onClick={deleteWorkspaceInRedux}>

                    <div className="col-2 px-0">
                        <Configurator openOrClose={(e) => setOpen(!open)} />
                    </div>

                    <div onScroll={(e) => setShowContactList(false)} style={{ 'margin-top': '24px !important' }} className={open ? "col-10 bodyHub mt-3" : "col-12 bodyHub mx-2 mt-4"}>
                        <Switch>
                            {/* <button onClick={() => window.location.reload(false)}>Click to reload!</button> */}

                            <ProtectedRoute path={"/:userName/hub/workspace/:idWorkspace"} user={Token} >
                                <ProjectsPage showToastDelete={(obj) => showToastToDelete(obj)}
                                    viewToastComplete={(val) => setShowToastComplete(val)}
                                />
                            </ProtectedRoute>
                            <ProtectedRoute path={"/:userName/hub/gantt"} user={Token} >
                                <div className="body-workspace mt-4">
                                    <DisplayGantt />
                                </div>
                            </ProtectedRoute>
                            <ProtectedRoute path={"/:userName/hub/allProjects"} user={Token} >
                                <ProjectsPage showToastDelete={(obj) => showToastToDelete(obj)}
                                    viewToastComplete={(val) => setShowToastComplete(val)}
                                />
                            </ProtectedRoute>

                            {/* <ProtectedRoute path={"/workspacePlatform"}>
                                <WorkspacePlatform />
                            </ProtectedRoute> */}

                            <ProtectedRoute path={"/:userName/hub/projectPlatform/:idProject"}>
                                <CardsPage
                                    showRocketShip={(val) => setShowRocketShip(val)}
                                    viewToastComplete={(val) => setShowToastComplete(val)}
                                    viewContactList={(val) => ShowObject(val)}
                                    focusInputCard={focusInputCard} showToastDelete={(obj) => showToastToDelete(obj)} />
                            </ProtectedRoute>

                            <ProtectedRoute path={"/:userName/hub/myTasks"}>
                                <TaskNotBelongCardForUser
                                    showRocketShip={(val) => setShowRocketShip(val)}
                                    viewToastComplete={(val) => setShowToastComplete(val)}
                                    showToastDelete={(object) => showToastToDelete(object)}
                                />
                            </ProtectedRoute>
                            {/* share url */}
                            <ProtectedRoute path={'/share/hub/:idProject/:emailShared/:userName'}>
                                <CardsPage
                                    showRocketShip={(val) => setShowRocketShip(val)}
                                    viewToastComplete={(val) => setShowToastComplete(val)}
                                    viewContactList={(val) => setShowContactList(true)}
                                    focusInputCard={focusInputCard} showToastDelete={(obj) => showToastToDelete(obj)} />
                            </ProtectedRoute>
                            <ProtectedRoute path={"/:userName/hub/milestones"}>
                                <Milestones />
                            </ProtectedRoute>
                            <ProtectedRoute path={"/:userName"}>
                                <Body showToastDelete={(obj) => showToastToDelete(obj)} />
                            </ProtectedRoute>
                            {/* <ProtectedRoute path={"/:userName/hub/projectPlatform/:indexCurrentProject/Overview/:cardId"}>
                                <ViewFilesOfProject />
                            </ProtectedRoute> */}
                            <ProtectedRoute path={"/"} >
                                {/* to send login if has not userName */}

                            </ProtectedRoute>
                        </Switch>
                    </div>
                    {showToastDelete ?
                        <ToastDelete
                            toOnClose={deleteObject}
                            toSetShowToastDelete={() => { setShowToastDeletefunc(false) }}
                            name={objectToDelete[objectToDelete.length - 1].name ? objectToDelete[objectToDelete.length - 1].name : objectToDelete[objectToDelete.length - 1].object.name}
                        />
                        : null}

                    {showToastComplete.show ?

                        <ToastMessage message={showToastComplete.massege}
                            viewToastComplete={(val => setShowToastComplete(val))}
                        />
                        : null}
                    {showStatusesList ?
                        // <h1 className="h1tocheck">vvvvvvvvv</h1>
                        <ViewAllStatuses
                            task={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]}
                            status={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status}
                            openPopUp={true}
                            hub={true}
                        />
                        : null}
                    {showContactList ?
                        <ContactList hub={true} />
                        : null}
                    {openCalander ?
                        <CalendarComponent hub={true} closeCalendar={(e) => setOpenCalander(false)} />
                        : null}
                    {showRocketShip ? <RocketShip show={(val) => setShowRocketShip(val)} /> : null}
                    {/* {showRocketShip ? <RocketShip show={(val) => console.log(val)} /> : null} */}

                    {/* <AddObject setShowViewDitails={(obj) => openViewDetails(obj)} focusInputCard={() => setFocusInputCard(true)} /> */}
                    {/* setShowViewDitails={} */}
                </div>

            </Router >

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.public_reducer.userName,
        workspaces: state.public_reducer.workspaces,
        cards: state.public_reducer.cards,
        indexCurrentCard: state.public_reducer.indexCurrentCard,
        indexCurrentTask: state.public_reducer.indexCurrentTask,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeCard: (cardId) => dispatch(actions.removeCardById(cardId)),
        removeTask: (taskId) => dispatch(actions.removeTaskById(taskId)),
        removeProject: (p) => dispatch(actions.deleteProjectInServer(p)),
        removeWorkspace: (worksapceId) => dispatch(actions.deleteWorkspaceFromServer(worksapceId)),
        addFile: (files) => dispatch(actions.addFile(files)),
        removeOneWorkspaceFromWorkspaces: () => dispatch(actions.removeOneWorkspaceFromWorkspaces())
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(Hub)


