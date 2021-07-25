import React, { useState } from 'react';
// import React, { Component } from 'react';

export default function Configurator() {
    return (
        <div className="right_nav">
            <div className="row mt-5 img_right">
                <div className="col-1"></div>
                <div className="col-1"><img src={require('../../assets/img/sun.png')}></img></div>
                <div className="col-1"></div>
                <div className="col-6" style={{ color: "white" }}>Personal Details</div>
                <div className="col"><img src={require('../../assets/img/adjust-solid.png')}></img> </div>
            </div>
        </div>
    );
}