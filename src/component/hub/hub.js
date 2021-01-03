import React from 'react'
import Header from './header/header';
import Body from './body/body';
import Nav from '../warps/nav/nav';
import Left_nav from '../warps/left_nav/left_nav';
import Configurator from '../warps/configurator/configurator';

export default function Hub()
{
    return(
        <>
            <Nav />
            <div className="row">
                <div className="col-md-2">
                <Configurator />
                 

                </div>
                <div className="col-md-5">
                    <Header />
                     <Body />
                    
                  

                </div>
                <div className="col-md-2">
                    <Left_nav />
                </div>
            </div>
            
      
         </>
    )
}