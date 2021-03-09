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
import ToastDelete1 from './toastDelete/toastDelete1';
export default function Hub(props) {
    const [open, setOpen] = useState(true);
    // useEffect(() => {

    // }, [props.openConfigurator]);
    const openConfigurator = () => {
        setOpen(!open);
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

                    <div className={open ? "col-10  mt-4 pr-4" : "col-12 mt-4 px-4"}>
                        {/* <Header /> */}
                        {/* <div className="col-2"> <Tools /></div> */}

                        <Switch>
                            {/* <Route path="/chedvi678@gmail.com/603f85549b557237f314eb9a/renana-il/share">
                            <ProjectsPage />
                            </Route> */}
                            <Route path="/:userName/workspace/:idWorkspace" >
                                <ProjectsPage />
                                {/* <ProjectsByWorkspace /> */}
                            </Route>
                            <Route path="/:userName/allWorkspace" >
                                {/* <ProjectsByWorkspace /> */}
                                <ProjectsPage />
                            </Route>
                            <Route path="/workspacePlatform" >
                                <WorkspacePlatform />
                            </Route>
                            <Route path="/:userName/projectPlatform/:idProject" >
                                {/* <ProjectPlatform /> */}
                                <CardsPage />
                            </Route>
                            {/* <Route path="/:userName/cardsByProject" >
                                <CardsByProject />
                            </Route> */}
                            <Route path="/:userName" >
                                <Body />
                            </Route>
                            <Route path="/" >
                                <Animation />
                                {/* <Toast /> */}
                            </Route>
                            {/* <Route path=":userName/workspace/:nameOfWorkspace" > */}
                        </Switch>
                      
                    </div>
                    {/* <div className="toastDeleteOnStage">
                        <ToastDelete1 name="fggfgfg"/>
                    </div> */}
                </div>
               
            </Router>
        </>
    )
}