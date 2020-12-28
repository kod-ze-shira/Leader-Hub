import React from 'react';
import './left_nav.css';



export default function Left_nav() {

    return (
        <div className="left_nav">
           
            <div className="row">
                
                <div className="col-1"></div>
            
                <div className="aicon">
                    <div className="mt-2 imgaicon"></div>
                    <img src={require('../../img/rep.png')}></img>
                </div>
            </div>
            <div className="row">

                <div className="col-1"></div>
                <div className="aicon">
                    <div className="mt-2 imgaicon"></div>
                    <img src={require('../../img/team.png')}></img>
                </div>
            </div>
            <div className="row">

                <div className="col-1"></div>
                <div className="aicon">
                    <div className="mt-2 imgaicon"></div>
                    <img src={require('../../img/harchive.png')}></img>
                </div>
            </div>
            <div className="row">

                <div className="col-1"></div>
                <div className="aicon">
                    <div className="mt-2 imgaicon"></div>
                    <img src={require('../../img/ana.png')}></img>
                </div>
            </div>
            <div className="row">

                <div className="col-1"></div>
                <div className="aicon">
                    <div className="mt-2 imgaicon"></div>
                    <img src={require('../../img/clasmall.png')}></img>
                </div>
            </div>



        </div>
    );
}