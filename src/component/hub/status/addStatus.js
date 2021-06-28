import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import Colors from '../color/color';
import ViewAllStatuses from './viewAllStatuses';
// import ViewDetails from '../../viewDetails/viewDetails'
import './viewStatus.css';


function AddStatus(props) {

    useEffect(() => {

    }, [props.statuses, props.openPopUp])
    const [openPopUp, setOpenPopUp] = useState(props.openPopUpToAdd)

    const [newStatus, setNewStatus] = useState({
        task: props.task._id,
        statusName: "",
        color: "",
    })


    const addStatus = (e) => {
        
        console.log(openPopUp);
        props.createStatus(newStatus)
        console.log(props.statuses);
        // e.stopPropagation();
        setOpenPopUp(false)
        console.log(openPopUp);

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
        // event.stopPropagation();
    }

    function stopP(event) {
        event.stopPropagation();
    }
    const [view, setView] = useState(false)
    const viewAllStatus = () => {
        setView(!view)

    }
    return (
        <>
            <div className="container ">
                <div className="title-edit-label py-2 mb-1" onClick={viewAllStatus}> Add Label</div>
                <label for="name">Name</label>
                <input name="statusName" onChange={(e) => handleChangeStatus(e)}
                    onClick={(e) => stopP(e)}
                    type="text" class="form-control"
                    id="statusName"
                    placeholder="enter status name"
                />
                <label>Select Color</label>
                <Colors changeStatusColor={(event) => handleChangeColorStatus(event)} />
                <button className="add-status px-3 m-auto" onClick={(e) => addStatus(e)}>Save</button>

            </div>
            { view ? <ViewAllStatuses /> : null}
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
        createStatus: (status) => dispatch(actions.createStatus(status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStatus)