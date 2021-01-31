import React from 'react'
import Header from './header/header';
import Body from './body/body';
import Nav from '../warps/nav/nav';
import Left_nav from '../warps/left_nav/left_nav';
import Configurator from '../warps/configurator/newConfigurator/new_configurator';
import Tools from './tools/tools';
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
export default function Hub() {
    return (
        <>

            <Nav />

            <div className="row justify-content-end">
                <div className="col-1">
                    <Left_nav />
                </div>
                <div className="col-9  col align-self-center">
                    {/* <Header /> */}
                    {/* <div className="col-2"> <Tools /></div> */}
                    <Router history={history}>
                        <Switch>
                            <Route path="/:userName/workspace/:idWorkspace" >
                                <ProjectsByWorkspace />
                                {/* <Projcts /> */}

                            </Route>
                            <Route path="/workspacePlatform" >
                                <WorkspacePlatform />
                            </Route>
                            <Route path="/:userName/projectPlatform" >
                                <ProjectPlatform />
                            </Route>
                            {/* <Route path="/:userName/cardsByProject" >
                                <CardsByProject />
                            </Route> */}
                            <Route path="/:userName" >
                                <Body />
                                {/* <ProjectsByWorkspace /> */}

                            </Route>
                            {/* <Route path=":userName/workspace/:nameOfWorkspace" > */}

                        </Switch>
                    </Router>
                </div>
                <div className="col-2 pl-0">
                    <Configurator />
                </div>
            </div>


        </>
    )
}