import React from 'react'
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

export default function Hub() {
    return (
        <>
            <Router history={history}>
                <Nav />
                <div className="row ">

                    <div className="col-2 px-0 mt-0">
                        <Configurator />
                    </div>
                    <div className="col-10  col align-self-center pr-4">
                        {/* <Header /> */}
                        {/* <div className="col-2"> <Tools /></div> */}

                        <Switch>
                            <Route path="/:userName/workspace/:idWorkspace" >
                                <ProjectsByWorkspace />
                                {/* <Projcts /> */}

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

                            </Route>
                            {/* <Route path=":userName/workspace/:nameOfWorkspace" > */}

                        </Switch>
                    </div>
                </div>
            </Router>

        </>
    )
}