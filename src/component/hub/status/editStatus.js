import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import { editStatus } from '../../../redux/middleware/statusCrud';
// import ViewDetails from '../../viewDetails/viewDetails'
import './viewAllStatuses.css'


function EditStatus(props) {

    useEffect(() => {
        // debugger
        // console.log(props.statuses);
    }, [props.statuses])

    const [editStatus, setEditStatus] = useState({
        id_: "",
        statusName: "",
        color: "",
    })

    const editStatus_ = () => {
        console.log(editStatus);
        props.editStatus(editStatus)
    }
    const handleChangeStatus = (event) => {
        const { name, value } = event.target
        setEditStatus(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    return (

        <>
            <div className="container">
                <div className="">
                    <div class="form-group row">
                        <label for="name">Name</label>
                        <input name="statusName" onChange={(e) => handleChangeStatus(e)}
                            type="text" class="form-control"
                            id="statusName"
                            value={props.status.statusName}
                            onChange={handleChangeStatus}
                        />
                    </div>
                    <div class="form-group row">
                        <label for="color">Select Color</label>
                        <input name="color" onChange={(e) => handleChangeStatus(e)}
                            type="color" class="form-control"
                            id="color"
                            value={props.status.color}
                            onChange={handleChangeStatus}

                        />
                    </div>
                    <button onClick={(e) => editStatus_(e)}>Save</button>

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