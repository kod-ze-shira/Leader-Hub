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
            <div className="row ">
                <div className="view-details col-5">
                    <div className="row mt-5">
                        <div className="col-2"></div>
                        <div className="col-4"><b>{props.id}</b></div>
                        <div className="col">{props.id1}</div>
                    </div>


                    <div className="row mt-2">
                        <div className="col-2"></div>
                        <div className="col-4"><b>{props.workspace}</b></div>
                        <div className="col">{props.name}</div>
                    </div>




                    <div className="row mt-2">
                        <div className="col-2"></div>
                        <div className="col-4"><b>{props.color}</b></div>
                        <div className="col">{props.color1}</div>
                    </div>




                    ‏
                </div>
            </div>
        </div >
    )
})




