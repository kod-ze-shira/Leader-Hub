import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import { actions } from '../../../redux/actions/action'
import ViewWorkspaceName from '../../warps/configurator/viewWorkspaceName/viewWorkspaceName'
import './viewDetails.css'




const mapStateToProps = (state) => {
    return {


    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function viewDetails(props) {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="view-details col-5">
                    ‏
                </div>
            </div>
        </div>
    )
})




