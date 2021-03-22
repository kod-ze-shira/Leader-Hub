import React, { useEffect, useRef, useState } from 'react'

import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
// import ViewDetails from '../../viewDetails/viewDetails'



function ViewAllStatuses(props) {

    useEffect(() => {
        props.getAllStatusesTaskForUser()
    }, []);


    useEffect(() => {
        debugger
        console.log(props.statuses);
    }, [props.statuses])

    const renderedListStatuses = props.statuses.map(status => {
        return <span>{status.statusName}</span>
    })
    //   const viewAllStatuses = props.statuses ? props.statuses.map((status) => {
    //     return status.tasks.map((task) => {
    //         return task.statusName
    //     })
    // }) : null

    return (

        <>
            <h1>renderedListStatuses</h1>

            {props.statuses.length && renderedListStatuses}
        </>

    )

}
const mapStateToProps = (state) => {

    return {
        statuses: state.status_reducer.statuses
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllStatusesTaskForUser: () => dispatch(actions.getAllStatusesTaskForUser()),
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllStatuses)
