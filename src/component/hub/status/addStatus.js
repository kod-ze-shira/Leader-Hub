import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import { editStatus } from '../../../redux/middleware/statusCrud';
// import ViewDetails from '../../viewDetails/viewDetails'
import './viewAllStatuses.css'


function AddStatus(props) {

    useEffect(() => {
        // debugger
        // console.log(props.statuses);
    }, [props.statuses])

    const [newStatus, setNewStatus] = useState({
        statusName: "",
        color: "",
    })

    const addStatus = () => {
        console.log(newStatus);
        props.createStatus(newStatus)
    }
    const handleChangeStatus = (event) => {
        const { name, value } = event.target
        setNewStatus(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    return (

        <>
            <div className="container">
                <div class="form-group row">
                    {/* <label for="name">Name</label> */}
                    <input name="statusName" onChange={(e) => handleChangeStatus(e)}
                        type="text" class="form-control"
                        id="statusName"
                        placeholder="enter status name"
                    />
                </div>
                <div class="form-group row">
                    {/* <label for="color">Select a Color</label> */}
                    <input name="color" onChange={(e) => handleChangeStatus(e)}
                        type="color" class="form-control"
                        id="color"
    
                    />

                </div>
                <button className="add-status" onClick={(e) => addStatus(e)}>Save</button>


            </div>
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
        createStatus: (status) => dispatch(actions.createStatus(status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStatus)