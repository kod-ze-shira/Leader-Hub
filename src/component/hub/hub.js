import React, { useEffect, useState } from 'react'
import Header from './header/header';
import Body from './body/body';
import Nav from '../warps/nav/nav';
import Left_nav from '../warps/left_nav/left_nav';
import Configurator from '../warps/configurator/newConfigurator/new_configurator';
import Tools from './tools/tools';
import Animation from './animation/animation'
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


function Hub(props) {
    const [open, setOpen] = useState(true);
    const [showToastDelete, setShowToastDelete] = useState(false)
    const [objectToDelete, setObjectToDelete] = useState()
    // const [componentFlag, setComponentFlag] = useState("")
    // const {location}=props
    // useEffect(() => {
    //    if(location)
    //   {  if (location.hash.includes("#workspace"))
    //     setComponentFlag("#workspace")}

    // },[location])
    const showToastToDelete = (objectToDelete) => {
        setObjectToDelete(objectToDelete)
        setShowToastDelete(true)

    }
    const deleteObject = () => {
        console.log(objectToDelete)
        setShowToastDelete(false)
        if (objectToDelete.type == "Project") {
            console.log(objectToDelete)
            props['remove' + objectToDelete.type](objectToDelete.object)
        }
        else
            props['remove' + objectToDelete.type](objectToDelete.object._id)

    }
    const openConfigurator = () => {
        setOpen(!open);
    }
    const setShowToastDeletefunc = (value) => {
        setShowToastDelete(value)
        $(`#${objectToDelete.object._id + objectToDelete.object.name}`).css("display", "block")

    }
    return (
        <>

            <Router history={history}>
                <Nav openConfigurator={openConfigurator} />

                <div className="row">
                    {open ?
                        <div className="col-2 px-0 mt-0">
                            <Configurator />
                        </div>
                        : null}

                    <div className={open ? "col-10  mt-3 pr-4" : "col-12 mt-3 px-4"}>
                        <Switch>
                            <Route path="/:userName/workspace/:idWorkspace" >
                                <ProjectsPage showToastDelete={(obj) => showToastToDelete(obj)} />
                                {/* <ProjectsByWorkspace /> */}
                            </Route>
                            <Route path="/:userName/allProjects" >
                                {/* <ProjectsByWorkspace /> */}
                                <ProjectsPage showToastDelete={(obj) => showToastToDelete(obj)} />
                            </Route>
                            <Route path="/workspacePlatform" >
                                <WorkspacePlatform />
                            </Route>
                            <Route path="/:userName/projectPlatform/:idProject" >
                                {/* <ProjectPlatform /> */}
                                <CardsPage showToastDelete={(obj) => showToastToDelete(obj)} />
                            </Route>
                            <Route path="/:userName/myTasks" >
                                <TaskNotBelongCardForUser />
                            </Route>
                            <Route path="/:userName" >
                                <Body showToastDelete={(obj) => showToastToDelete(obj)} />
                            </Route>
                            <Route path="/" >
                                {/* <Animation /> */}

                            </Route>
                            {/* <Route path=":userName/workspace/:nameOfWorkspace" > */}
                        </Switch>

                    </div>


                    {showToastDelete ?
                        <ToastDelete
                            toOnClose={deleteObject}
                            toSetShowToastDelete={() => { setShowToastDeletefunc(false) }}
                            name={objectToDelete.name ? objectToDelete.name : objectToDelete.object.name}
                        // objectToDelete.type
                        />
                        : null}

                </div>
            </Router >
        </>
    )
}

const mapStateToProps = (state) => {
    return {


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeCard: (cardId) => dispatch(actions.removeCardById(cardId)),
        removeTask: (taskId) => dispatch(actions.removeTaskById(taskId)),
        removeProject: (p) => dispatch(actions.deleteProjectInServer(p)),
        removeWorkspace: () => dispatch(actions.deleteWorkspaceFromServer()),



    }


}
export default connect(mapStateToProps, mapDispatchToProps)(Hub)

