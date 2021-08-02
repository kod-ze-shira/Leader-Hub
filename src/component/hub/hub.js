import React, { useState, useEffect, useParams } from 'react'
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
// import './selectHeader.css'
import SelectProject from './SelectHeader/selectProject/selectProject';
import SelectWorkspace from './SelectHeader/selectWorkspace/selectWorkspace'
import SelectCards from './SelectHeader/selectCards/selectCards'
import SelectTask from './SelectHeader/selectTask/selectTask'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import AddObject from './addObject/addObject'
// import HeaderLeader from '@leadercodes/Leader-header'
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
import HeaderLeader from '@leadercodes/header';
import ModalFiles from './modalFIles/modalFiles';
import SelectHeader from './SelectHeader/SelectHeader';
function Hub(props) {
    const [open, setOpen] = useState(true);
    const [showToastDelete, setShowToastDelete] = useState(false)
    const [showModalDelete, setShowModlalDelete] = useState(false)
    const [showToastMassege, setShowToastMassege] = useState(false)
    const [objectToDelete, setObjectToDelete] = useState([])
    const [objectToDeleteLocal, setObjectToDeleteLocal] = useState()
    const [showContactList, setShowContactList] = useState(false)
    const [showStatusesList, setShowStatusesList] = useState(false)
    const [deleteMilstone, setDeleteMilstone] = useState(true)
    const [openCalander, setOpenCalander] = useState(false)
    const [showRocketShip, setShowRocketShip] = useState(false)
    const [closeElementsOnScreen, setCloseElementsOnScreen] = useState(true)

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
    const [value, setValue] = useState(1);

    const color = '#00C6EA'
    // const { idProject } = useParams();

    useEffect(() => {

        // alert("yes")
        if (props.workspaces.length == 0)
            props.getAllWorkspaces()
        if (history.location.pathname.indexOf('list') != -1)
            setValue(2)
        else
            if (history.location.pathname.indexOf('Overview') != -1)
                setValue(0)
            else
                if (history.location.pathname.indexOf('gantt') != -1)
                    setValue(3)

    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const changeFlag = (value) => {
        props.flag(value)
    }
    function backToPage() {

        if (window.location.href.indexOf('workspace') != -1 || window.location.href.indexOf('allProjects') != -1)
            props.history.push("/" + props.user + "/hub/")
        else
            if (window.location.href.indexOf('projectPlatform') != -1)
                props.history.push("/" + props.user + "/hub/workspace/" + props.workspaces[props.indexOfWorkspace]._id)
    }
    // const openConfigurator = () => {
    //     setOpen(!open);
    // }

    const setShowToastDeletefunc = (value) => {
        let i = objectToDelete.length - 1
        setShowToastDelete(value)
        if (objectToDelete[i].type === "Card") {
            $(`#${objectToDelete[i].object._id} `).css("display", "inline-block")
        } else if (objectToDelete[i].type === "Task")
            $(`#${objectToDelete[i].object._id + "disappear"}`).css("display", "block")

        else if (!objectToDelete[i].object.card || deleteMilstone) {
            $(`#${objectToDelete[i].object._id + "disappear"}`).css("display", "flex")
        }
        if (objectToDelete[i].type === "Project")
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
    const deleteWorkspaceInRedux = (e) => {
        // console.log(e.target.className)
        // if (props.workspaces[props.workspaces.length - 1])
        //     if (props.workspaces[props.workspaces.length - 1]._id=== undefined) {
        //         props.removeOneWorkspaceFromWorkspaces()
        //     }
    }
    const [focusInputCard, setFocusInputCard] = useState(false)

    return (
        <>
            {showModalDelete ? <ShureDelete
                showToastDelete={(e) => showToast()}
                objectToDelete={objectToDeleteLocal}
                closeModal={(e) => setShowModlalDelete(e)}
            /> : null}


            {/*   <div onClick={openConfigurator} >
                <img className="menu-open-close" src={require('../img/menu.png')}></img>
            </div> */}
            <Router history={history}>
                {/* <div className='headerLeaderHub'>
                    <HeaderLeader userName={props.userName} appName='hub' />‏
                </div> */}
                <SelectHeader
                    //  number={number}
                    flag={changeFlag}
                    //  from={howToPresent} /
                    menue={true}
                // type='projects'
                />

                <div className="row back-screen" onClick={deleteWorkspaceInRedux}>

                    <div className="configuratorBlue col-2 ">
                        {/* <div className="col-2 px-0"> */}
                        <Configurator openMenu={(val) => alert(val)} />
                    </div>

                    <div onScroll={(e) => setShowContactList(false)} style={{ marginTop: '24px !important' }}
                        className={open ? "bodyHub " : "col-12 bodyHub mx-2 "}>
                        <Switch>
                            {/* <button onClick={() => window.location.reload(false)}>Click to reload!</button> */}

                            <ProtectedRoute path={"/:userName/hub/workspace/:idWorkspace"} user={Token} >
                                <ProjectsPage showToastDelete={(obj) => showToastToDelete(obj)}
                                    viewToastMassege={(val) => setShowToastMassege(val)}
                                />
                            </ProtectedRoute>
                            <ProtectedRoute path={"/:userName/hub/gantt"} user={Token} >
                                <div className="body-workspace mt-4">
                                    <DisplayGantt />
                                </div>
                            </ProtectedRoute>
                            <ProtectedRoute path={"/:userName/hub/allProjects"} user={Token} >
                                <ProjectsPage showToastDelete={(obj) => showToastToDelete(obj)}
                                    viewToastMassege={(val) => setShowToastMassege(val)}
                                />
                            </ProtectedRoute>

                            {/* <ProtectedRoute path={"/workspacePlatform"}>
                                <WorkspacePlatform />
                            </ProtectedRoute> */}

                            <ProtectedRoute path={"/:userName/hub/projectPlatform/:idProject"}>
                                <CardsPage
                                    closeCalendarOrContact={(e) => setCloseElementsOnScreen(e)}
                                    showRocketShip={(val) => setShowRocketShip(val)}
                                    viewToastMassege={(val) => setShowToastMassege(val)}
                                    viewContactList={(val) => ShowObject(val)}
                                    focusInputCard={focusInputCard} showToastDelete={(obj) => showToastToDelete(obj)} />
                            </ProtectedRoute>

                            <ProtectedRoute path={"/:userName/hub/myTasks"}>
                                <TaskNotBelongCardForUser
                                    showRocketShip={(val) => setShowRocketShip(val)}
                                    viewToastMassege={(val) => setShowToastMassege(val)}
                                    showToastDelete={(object) => showToastToDelete(object)}
                                />
                            </ProtectedRoute>
                            {/* share url */}
                            <ProtectedRoute path={'/share/hub/:idProject/:emailShared/:userName'}>
                                <CardsPage
                                    closeCalendarOrContact={(e) => setCloseElementsOnScreen(e)}
                                    showRocketShip={(val) => setShowRocketShip(val)}
                                    viewToastMassege={(val) => setShowToastMassege(val)}
                                    viewContactList={(val) => setShowContactList(true)}
                                    focusInputCard={focusInputCard} showToastDelete={(obj) => showToastToDelete(obj)} />
                            </ProtectedRoute>
                            <ProtectedRoute path={"/:userName/hub/milestones"}>
                                <Milestones showToastDelete={(obj) => { showToastToDelete(obj); setDeleteMilstone(true) }} />
                            </ProtectedRoute>

                            <ProtectedRoute path={"/:userName/ModalFiles"}>
                                <ModalFiles />

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

                    {showToastMassege.show ?
                        <ToastMessage message={showToastMassege.massege}
                            viewToastMassege={(val => setShowToastMassege(val))}
                        />
                        : null}
                    {showStatusesList && closeElementsOnScreen ?
                        // <h1 className="h1tocheck">vvvvvvvvv</h1>
                        <ViewAllStatuses
                            task={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]}
                            status={props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status}
                            openPopUp={true}
                            hub={true} />
                        : null}
                    {showContactList && closeElementsOnScreen ?
                        <ContactList hub={true} viewToastMassege={(val) => setShowToastMassege(val)} />
                        : null}
                    {openCalander && closeElementsOnScreen ?
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
        userName: state.public_reducer.userName,
        workspaces: state.public_reducer.workspaces,
        cards: state.public_reducer.cards,
        indexCurrentCard: state.public_reducer.indexCurrentCard,
        indexCurrentTask: state.public_reducer.indexCurrentTask,
        workspace: state.workspace_reducer.workspace,
        indexOfWorkspace: state.public_reducer.indexOfWorkspace,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeCard: (cardId) => dispatch(actions.removeCardById(cardId)),
        removeTask: (taskId) => dispatch(actions.removeTaskById(taskId)),
        removeProject: (p) => dispatch(actions.deleteProjectInServer(p)),
        removeWorkspace: (worksapceId) => dispatch(actions.deleteWorkspaceFromServer(worksapceId)),
        addFile: (files) => dispatch(actions.addFile(files)),
        removeOneWorkspaceFromWorkspaces: () => dispatch(actions.removeOneWorkspaceFromWorkspaces()),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),

    }


}
export default connect(mapStateToProps, mapDispatchToProps)(Hub)


