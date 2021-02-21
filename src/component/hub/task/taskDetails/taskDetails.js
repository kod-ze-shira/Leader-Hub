import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import './taskDetails.css'

function TaskDetails(props) {


    useEffect(() => {

    }, [])

    const task = props.task

    return (
        <div className="details-task">
            <h1 className="mt-5 pt-5">Task details</h1>
            <p>name :{task.name}</p>
            <p>description :{task.description}</p>
            <p>status :{task.status}</p>
            <p>startDate :{task.startDate}</p>
            <p>updateDates :{task.updateDates}</p>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)




