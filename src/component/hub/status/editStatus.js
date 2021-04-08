import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
// import { editStatus } from '../../../redux/middleware/statusCrud';
// import { editStatus } from '../../../redux/middleware/statusCrud';
import Colors from '../color/color';
// import ViewDetails from '../../viewDetails/viewDetails'
import './viewAllStatuses.css'


function EditStatus(props) {

    useEffect(() => {
        setStatus(props.status)
        // debugger
        // console.log(props.statuses);
    }, [props.statuses])

    const [status, setStatus] = useState({
        // id_: "",
        statusName: "",
        color: "",
    })

    const editStatus = () => {
        // console.log(newStatus);
        props.editStatus(status)
    }

    const handleChangeStatus = (event) => {
        const { name, value } = event.target
        setStatus(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleChangeColorStatus = (event) => {
        const { name, value } = event
        setStatus(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    return (

        <>
            <div className="container ">
                <div className="row justify-content-center">
                    <div class="form-group  mt-1 col-11">
                        <label for="name">Name</label>
                        <input name="statusName" onChange={(e) => handleChangeStatus(e)}
                            type="text" class="form-control"
                            id="statusName"
                            value={status.statusName}
                        // placeholder="enter status name"
                        />
                    </div>

                    <div class="form-group col-10">

                        <label for="color">Select Color</label>
                        <input name="color" onChange={(e) => handleChangeStatus(e)}
                            type="color" class="form-control"
                            id="color"
                            value={props.status.color}
                        />

                    </div>
                    <button className="add-status col-10" onClick={editStatus}>Edit</button>
                </div>

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
        editStatus: (status) => dispatch(actions.editStatus(status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStatus)