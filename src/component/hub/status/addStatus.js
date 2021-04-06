import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import { editStatus } from '../../../redux/middleware/statusCrud';
import Colors from '../color/color';
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
        console.log(props.statuses);

    }
    const handleChangeStatus = (event) => {
        const { name, value } = event.target
        setNewStatus(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleChangeColorStatus = (event) => {
        const { name, value } = event
        setNewStatus(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    return (
        <>
            <div className="container ">
                <div className="row">
                    <div class="form-group row mt-1 col-8">
                        <label for="name">Name</label>
                        <input name="statusName" onChange={(e) => handleChangeStatus(e)}
                            type="text" class="form-control"
                            id="statusName"
                        // placeholder="enter status name"
                        />
                    </div>
                </div>
                <div className="row">
                    <div class="form-group col-8">
                        {/* <label for="color">Select a Color</label>
                    <input name="color" onChange={(e) => handleChangeStatus(e)}
                        type="color" class="form-control"
                        id="color"
    
                    /> */}
                        <label>Select Color</label>
                        <Colors changeStatusColor={(event) => handleChangeColorStatus(event)} />

                    </div>
                    <button className="add-status" onClick={(e) => addStatus(e)}>Save</button>
                </div>

            </div>
        </>

    )

}
const mapStateToProps = (state) => {

    return {
        statuses: state.status_reducer.statuses,
        task: state.public_reducer.task
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createStatus: (status) => dispatch(actions.createStatus(status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStatus)