import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import ViewDetails from '../viewDetails/viewDetails'
import { actions } from '../../../redux/actions/action'
import './Milstones.css';

function ViewMilstone(props) {
    const [viewDetails, setViewDetails] = useState(false)

    const getCardsByProject = () => {
        return new Promise(async (resolve, reject) => {
            try {
                let cards = await props.getCardsByProjectId(props.milestone.card.project)
                resolve(cards)
            } catch (error) {
                reject(error)
            }

        })

    }
    function openDetails() {

        getCardsByProject().then((result) => {
            props.saveCurrentIndexOfCardInRedux(props.milestone.card.index)
            props.saveCurrentIndexOfTaskInRedux(props.milestone.task.index)
            setViewDetails(true)
        })
    }

    return (
        <div>
            <div className="show-task row mx-4 py-2 border-bottom ">
                <img src={require("../../../assets/img/milstoneIcon.png")}></img>
                <div className="col-4">
                    {props.milestone.task.name}</div>
                <label className="check-task view-details-btn">
                    <button onClick={() => openDetails()}>view details +</button>
                </label>
            </div>

            {viewDetails ?
                /* // <div className="closeDet" onClick={(e) => stopP(e)} > */
                <ViewDetails
                    // showToast={(obj) => props.showToast(obj)}
                    closeViewDetails={() => setViewDetails(false)}
                    from={"viewTaskByCard"}
                    task={props.milestone.task}
                    // setDownloadFile={(e) => setDownloadFile(e)}
                    open={true}> </ViewDetails>
                // {/* // </div> */}
                : null}
        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        workspaces: state.public_reducer.workspaces,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveCurrentIndexOfCardInRedux: (indexCard) => dispatch(actions.saveCurrentIndexOfCardInRedux(indexCard)),
        saveCurrentIndexOfTaskInRedux: (indexTask) => dispatch(actions.saveCurrentIndexOfTaskInRedux(indexTask)),
        getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewMilstone)