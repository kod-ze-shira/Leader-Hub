import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './search.css';

export default function Search() {
    return (
        <div className="row Search">
            <div className="row mt-5"></div>
             <div className="col-4 mt-4" id="search">
                {/* <div className="mt-1"></div> */}
                <div className="row mt-1">
                <div className="col-1"> <img id="imgsearch" src={require('../../img/search-solid.png')}></img></div>
                <div className="col-2"> <input type="text" id="inputsearch" placeholder="Search" /></div>
               </div>
             
            </div>
            <div className="col-1"></div>
            <div className="co-1 mt-4 all" tabIndex="-1">
                <div className="mt-1"></div>
                    All</div>

            <div className="col-2 mt-4 All_Task" tabIndex="-1">
                <div className="mt-2"></div>
                <img src={require('../../img/1star-solid.png')}></img>
                
                All Task</div>
            <div className="col-1 mt-4 Project" tabIndex="-1">
                <div className="mt-2"></div>
                 Project</div>
            <div className="col-3 mt-4">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="status"> status All
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" id="All">
                            All</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" id="Processing">
                            Processing</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" id="Completed">
                            Completed</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" id="Rejected">
                            Rejected</Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>
            </div>
        </div>
    )
}