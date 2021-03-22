import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
// import ViewDetails from '../../viewDetails/viewDetails'
import './viewAllStatuses.css'


function ViewAllStatuses(props) {

    useEffect(() => {
        // props.getAllStatusesTaskForUser()
    }, []);


    useEffect(() => {
        // debugger
        // console.log(props.statuses);
    }, [props.statuses])


    return (

        <>
            <div className="container">
                <div className="row mt-1">
                    <div className="menu-status " style={{ backgroundColor: props.status.color }}>
                        <p >{props.status.statusName}</p>
                    </div>
                </div>
            </div>
            {/* {props.statuses.length && renderedListStatuses} */}
        </>

    )

}
const mapStateToProps = (state) => {

    return {
        // statuses: state.status_reducer.statuses
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // getAllStatusesTaskForUser: () => dispatch(actions.getAllStatusesTaskForUser()),
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllStatuses)