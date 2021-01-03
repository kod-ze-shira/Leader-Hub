import React from 'react'
import Header from './header/header';
import Body from './body/body';
import Nav from '../warps/nav/nav';
import Left_nav from '../warps/left_nav/left_nav';
import Configurator from '../warps/configurator/configurator';
<<<<<<< HEAD
import Tools from './tools/tools';
=======
>>>>>>> e11eaf3c97551a1ef920a03dfeb255ff6bbb6bdc

export default function Hub()
{
    return(
        <>
            <Nav />
            <div className="row">
                <div className="col-md-1">
                    <Left_nav />
                 

                </div>
                <div className="col-md-3  mt-2">
                    <Header />
<<<<<<< HEAD
                  
                   <div className="row mt-3">
                    <div className="col-2"> <Tools/></div>
                    <div className="col-4"> <Body /></div>
                    </div>
=======
                    <div className="mt-3"></div>
                     <Body />
>>>>>>> e11eaf3c97551a1ef920a03dfeb255ff6bbb6bdc
                    
                  

                </div>
                <div className="col-md-6"></div>
                <div className="col-md-2">
                  
                    <Configurator />
                </div>
            </div>
            
      
         </>
    )
}