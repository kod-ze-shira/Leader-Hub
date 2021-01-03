import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './nav.css';


export default function Nav() {
    return (
        <div className="nav">
            <div className="logo">
            <img src={require('../../img/logo.png')}></img>
            </div>
        </div>
    );
}