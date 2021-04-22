import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import { editStatus } from '../../../redux/middleware/statusCrud';
// import ViewDetails from '../../viewDetails/viewDetails'
import './viewAllStatuses.css'


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
        console.log(editStatus);
        props.editStatus(editStatus)
    }
    // const handleChangeStatus = (event) => {
    //     debugger
    //     console.log(event.target)
    //     const { name, value } = event.target
    //     setEditStatus(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    //     console.log(editStatus);
    // }
    const changeFiledInStatus = (input) => {
        // props.setCurrentIndexTask(currentIndexTask)
        // props.setCurrentIndexCard(currentIndexCard)
        let editStatusInRedux = { "nameFiled": input.target.name, "value": input.target.value }
        props.setTaskByFiledFromTasks(editStatusInRedux)
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
                            onChange={(e) => changeFiledInStatus(e)}
                        />
                    </div>
                    <div class="form-group row">
                        <label for="color">Select Color</label>
                        <input name="color"
                            type="color" class="form-control"
                            id="color"
                            value={props.status.color}
                            onChange={(e) => changeFiledInStatus(e)}

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
        statuses: state.status_reducer.statuses,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editStatus: (status) => dispatch(actions.editStatus(status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStatus)