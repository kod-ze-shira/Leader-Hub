import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import { actions } from '../../../redux/actions/action'
import ViewWorkspaceName from '../../warps/configurator/viewWorkspaceName/viewWorkspaceName'
import './viewDetails.css'
import EditWorkspace from '../workspace/editWorkspace/editWorkspace'



const mapStateToProps = (state) => {
    return {


    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(


    function viewDetails(props) {
        const { from } = props//to know from which component its come

        const renderSwitch = () => {
            switch (from) {
                case 'editWorkspace'://on click edit button of workspace
                    return <EditWorkspace />
                default:
                    return null;
            }
        }

        return (
            <>


                <div className="container-fluid">
                    <div className="row ">
                        <div className="view-details col-5">
                            {renderSwitch()}
                        </div>
                    </div>
                </div >
            </>
        )
    })




