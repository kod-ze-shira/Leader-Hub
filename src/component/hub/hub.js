import React from 'react'
import Header from './header/header';
import Body from './body/body';
import Nav from '../warps/nav/nav';
import Left_nav from '../warps/left_nav/left_nav';
import Configurator from '../warps/configurator/newConfigurator/new_configurator';
import Tools from './tools/tools';

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
                    <Body />

                </div>
                <div className="col-2 pl-0">
                    <Configurator />
                </div>
            </div>


        </>
    )
}