import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './nav.css';


export default function
    Nav() {
    return (
        <div className="nav container-fluid">
            {/* <div className="row "> */}
                <img className="offset-11 col-1 my-2 " src={require('../../img/profile.svg')}></img>
            {/* </div> */}

        </div>
    );
}