import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './nav.css';

function Nav(props) {

    // const [openConfigurator, setOpenConfigurator] = useState(false);

    return (
        <div className="nav ">
            <div className="row ">
                <div onClick={props.openConfigurator} >
                <img className="ml-4 my-2" src={require('../../img/menu.png')}></img>
                </div>
                <img className="profile-logo my-2" src={require('../../img/profile.svg')}></img>
            </div>

        </div>
    );

}
const mapStateToProps = (state) => {

    return {
        // user: state.public_reducer.userName,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav)
