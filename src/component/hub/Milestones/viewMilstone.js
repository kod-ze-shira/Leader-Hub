import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ViewDetails from '../viewDetails/viewDetails'
import './Milstones.css';

function viewMilstone(props) {

    // const [viewDetails, setViewDetails] = useState(false)
    // const [viewDetails,setViewDetails]=useState(false)

    return (
        <div>
            <div className="show-task row mx-4 py-2 border-bottom ">
                <img src={require("../../img/milstoneIcon.png")}></img>
                <div className="col-4">
                    {props.milestone.name}</div>
                <label className="check-task view-details-btn" title="View Details">
                    <button>view details +</button>
                </label>
            </div>

            {/* {viewDetails ? */}
            {/* // <div className="closeDet" onClick={(e) => stopP(e)} > */}
            <ViewDetails
                // showToast={(obj) => props.showToast(obj)}
                // closeViewDetails={() => setViewDetails(false)}
                // from={"viewTaskByCard"}
                // task={taskToDetails}
                // setDownloadFile={(e) => setDownloadFile(e)}
                open={true}> </ViewDetails>
            {/* // </div> */}
            {/* : null} */}
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
export default connect(mapStateToProps, mapDispatchToProps)(viewMilstone)