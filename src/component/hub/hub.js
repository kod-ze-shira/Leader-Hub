import React from 'react'
import Header from './header/header';
import Body from './body/body';
import Nav from '../warps/nav/nav';
import Left_nav from '../warps/left_nav/left_nav';
import Configurator from '../warps/configurator/configurator';
import Tools from './tools/tools';

export default function Hub() {
    return (
        <>
            <Nav />
            <div className="row">
                <div className="col-md-1">
                    <Left_nav />


                </div>
                <div className="col-md-3  mt-2">
                    <Header />

                    <div className="row mt-3">
                        <div className="col-2"> <Tools /></div>
                        <div className="col-4"> <Body /></div>
                    </div>
                    <div className="mt-3"></div>
                    {/* <Body /> */}



                </div>
                <div className="col-md-6"></div>
                <div className="col-md-2">

                    <Configurator />
                </div>
            </div>


        </>
    )
}