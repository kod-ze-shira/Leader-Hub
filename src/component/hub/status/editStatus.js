import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import { editStatus } from '../../../redux/middleware/statusCrud';
// import ViewDetails from '../../viewDetails/viewDetails'
import './viewStatus.css'


function EditStatus(props) {

    useEffect(() => {

    }, [])

    const [editStatus, setEditStatus] = useState({
        _id: "",
        statusName: "",
        color: "",
    })

    const editStatus_ = () => {
        debugger
        console.log(props.status);
        props.editStatus(props.status)
    }
    const deleteStatus = () => {
        debugger
        console.log(props.status._id);
        props.removeStatus(props.status._id)
    }
    const handleChangeStatus = (input) => {
        debugger
        let editStatusInRedux = { "nameFiled": input.target.name, "value": input.target.value }
        props.setStatusByFiledFromStatuses(editStatusInRedux)
    }
    return (
        <>
            <div className="container">
                <div className="">
                    <div class="form-group row">
                        <label for="name">Name</label>
                        <input name="statusName"
                            type="text" class="form-control"
                            id="statusName"
                            value={props.status.statusName}
                            onChange={(e) => handleChangeStatus(e)}
                        />
                    </div>
                    <div class="form-group row">
                        <label for="color">Select Color</label>
                        <input name="color"
                            type="color" class="form-control"
                            id="color"
                            value={props.status.color}
                            onChange={(e) => handleChangeStatus(e)}

                        />
                    </div>
                    <button onClick={(e) => editStatus_(e)}>Save</button>
                    <button onClick={(e) => deleteStatus(e)}>Delete</button>

                </div>

            </div>
        </>

    )

}
const mapStateToProps = (state) => {

    return {
        statuses: state.status_reducer.statuses,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editStatus: (status) => dispatch(actions.editStatus(status)),
        removeStatus: (statusId) => dispatch(actions.removeStatus(statusId)),
        setStatusByFiledFromStatuses: (statusDetails) => dispatch(actions.setStatusByFiledFromStatuses(statusDetails))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditStatus)