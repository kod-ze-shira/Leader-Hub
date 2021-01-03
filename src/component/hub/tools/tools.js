import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import './tools.css'


export default function Tools()
{
 
    return(
        <div className="tools">
            
            <div className="row  new">
                <div className="col-4 "></div>
                + new</div>
                <div className="mt-1"></div>
                <hr></hr>
                <div className="row">
                    
                <div className="col">Tools</div>
                </div>
            <div className="row onclick" >
                       <div className="col-1"></div>
                       <div className="aicon">
                       <div className="col-1 mt-2 imgaicon1"><img src={require('../../img/rep.png')}></img></div>
                       </div>
                       <div className="col-2 mt-4">Report</div>
           </div>
            <div className="row">

                <div className="col-1"></div>
                
                    <div className="col-2 mt-2  aicon ">
                     <div className="icon">
                      <img src={require('../../img/team.png')}></img>
                    </div>
                    </div>
                     <div className="col-1 mt-3">Team</div>
                
            </div>
            <div className="row">

                <div className="col-1"></div>
                <div className="aicon" >
                    
                    <div className="col-1 mt-2 icon">
                    <img src={require('../../img/harchive.png')}></img>

                    </div>
                </div>
                <div className="col-2 mt-4">archive</div>
            </div>

            <div className="row">

                    <div className="col-1"></div>
                     <div className="aicon" >
                       <div className="col-1 mt-2 icon">
                          <img src={require('../../img/ana.png')}></img>
                       </div>
                     </div>
                <div className="col-2 mt-4">analytics</div>
         </div>
             <div className="row">

                   <div className="col-1"></div>
                   <div className="aicon">
                   <div className="col-1 mt-2 icon">
                     <img src={require('../../img/clasmall.png')}></img>
                    </div>
                 </div>
                <div className="col-2 mt-4">Calendar</div>
             </div>
          
         </div>
    )
}