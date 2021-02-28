import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './nav.css';

 function Nav(props) {

    // const [openConfigurator, setOpenConfigurator] = useState(false);

    return (
        <div className="nav container-fluid">
            {/* <div className="row "> */}
            <button onClick={props.openConfigurator} >open configurator</button>
                <img className="offset-11 col-1 my-2 " src={require('../../img/profile.svg')}></img>
            {/* </div> */}

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
