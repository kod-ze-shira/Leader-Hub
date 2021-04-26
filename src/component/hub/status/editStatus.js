import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import { editStatus } from '../../../redux/middleware/statusCrud';
import ViewAllStatuses from './viewAllStatuses';
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
    // const [viewAllStatusComponent, setViewAllStatusComponent] = useState(false)
    const editStatus_ = () => {
        console.log(props.status);
        props.editStatus(props.status)
    }
    const deleteStatus = () => {
        console.log(props.status._id);
        props.removeStatus(props.status._id)
    }
    const handleChangeStatus = (input) => {
        let editStatusInRedux = { "nameFiled": input.target.name, "value": input.target.value }
        props.setStatusByFiledFromStatuses(editStatusInRedux)
    }
    const [viewList, setViewList] = useState(false)

    const viewAllStatus = (e) => {
        debugger
        setViewList(true)
        console.log(viewList);

    }

    return (
        <>
            <div className="container">
                <div className="title-edit-label py-2 mb-1" onClick={(e) => viewAllStatus(e)}>> Edit Label</div>
                <div class="form-group row mx-2">

                    <label for="name">Name</label>
                    <input name="statusName"
                        type="text" class="form-control"
                        id="statusName"
                        value={props.status.statusName}
                        onChange={(e) => handleChangeStatus(e)}
                    />
                    <div class="form-group row mx-2">
                        <label for="color">Select Color</label>
                        <input name="color"
                            type="color" class="form-control"
                            id="color"
                            value={props.status.color}
                            onChange={(e) => handleChangeStatus(e)}

                        />
                    </div>
                    <div className=" row justify-content-between">
                        <button className=" edit-status px-3 ml-3" onClick={(e) => editStatus_(e)}>Save</button>
                        <button className=" delete-status ml-3" onClick={(e) => deleteStatus(e)}>Delete</button>
                    </div>

                </div>

            </div>
            {viewList ? <ViewAllStatuses /> : null}
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