import ReactDOM from 'react-dom';
import './newworkspace.css';
import React, { useState } from 'react';
import Header from '../header';

export default function NewWorkpas()
{
    function backheader() {
        setworkpas(false);
    }
    const [workpas, setworkpas] = useState(true);
    return(
        workpas?
        <div className="headerserch">
            <div className="row">
                    <div className="col-0.5 x"><b onClick={backheader}>x</b></div>
                <div className="col-md-1 col-xs-2 mt-2 Type1" style={{ color: "#707074" }}>Type</div>
                <div className="col-md-2 col-xs-2 mt-2 name" style={{ color: "#707074" }}>Name</div>
                <div className="col-md-2 col-xs-1"></div>

                <div className="col-md-2 col-xs-1 mt-2 Do1" style={{ color: "#707074" }}>Do To</div>
            </div>
            <div className="row mt-2">

                <div className="col-1 workspace" >
                    <div className="mt-2"></div>
                     workspace 


                </div>



                <div className="col-md-4 col-xs-1 input_workpace">
                    <div className="mt-2"></div>
                    <input type="text"
                        id="inputTextworkpase" placeholder="Type the name of the workspace" />
                </div>


                <div className="newdate">
                    <div className="row mt-2"></div>
                    <input type="date" id="datetask"></input>
                </div>

                <div className="col-md-2 col-xs-1 WORKSPACE1"><div className="textstart mt-2">
                    <div className="mt-2"></div>
                    <b>START WORKSPACE</b></div></div>

            </div>
        </div>
        :<>
             <Header/>
        </>
    )
}       








