import React, { useEffect, useRef, useState } from 'react'

import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
// import ViewDetails from '../../viewDetails/viewDetails'



function ViewAllStatuses(props) {

    useEffect(() => {
        props.getAllStatusesTaskForUser()
    }, []);




    const renderedListStatuses = props.statuses.map(status => {
        return status.name
    })

    return (

        <>
            <h1>renderedListStatuses</h1>
            {renderedListStatuses}
        </>

    )

}
const mapStateToProps = (state) => {

    return {
        status: state.status_reducer.status
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllStatusesTaskForUser: () => dispatch(actions.getAllStatusesTaskForUser()),
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllStatuses)
