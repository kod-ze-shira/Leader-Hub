import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import ViewDetails from '../viewDetails/viewDetails'
import { actions } from '../../../redux/actions/action'
import $ from 'jquery'
import { withRouter } from 'react-router-dom';
import './Milstones.css';

function ViewMilstone(props) {
    const [viewDetails, setViewDetails] = useState(false)

    useEffect(() => {
        console.log(props.milestone);
    }, [props.cards])
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

    function openDetails(event) {
        getCardsByProject().then((result) => {
            props.saveCurrentIndexOfCardInRedux(props.milestone.card.index)
            props.saveCurrentIndexOfTaskInRedux(props.milestone.task.index)
            setViewDetails(true)

        })

        event.stopPropagation()//to do statuses not opend
    }
    function viewInGantt() {
        props.history.push("/" + props.user + "/hub/projectPlatform/" + props.milestone.card.project + '/gantt')
    }
    $(window).click(function () {
        if (viewDetails) {
            setViewDetails(false)
        }
    });
    return (
        <div>
            <div id={`${props.milestone.task._id}disappear`} className="show-task row mx-4 py-2 border-bottom ">
                <img src={require("../../../assets/img/milstoneIcon.png")}></img>
                <div onClick={viewInGantt} className="milstoneName col-4">
                    {props.milestone.task.name}</div>
                <label className="check-task view-details-btn">
                    <button onClick={(e) => openDetails(e)}>view details +</button>
                </label>
            </div>
            {/* && props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask]  */}
            {viewDetails && props.cards.length > 0 ?
                <div onClick={(e) => e.stopPropagation()}>
                    <ViewDetails
                        showToast={(obj) => props.showToast(obj)}
                        closeViewDetails={() => setViewDetails(false)}
                        from={"viewTaskByCard"}
                        task={props.milestone.task}
                        viewToastMassege={props.viewToastMassege}

                        // setDownloadFile={(e) => setDownloadFile(e)}
                        open={true}> </ViewDetails>
                </div> : null}
        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        user: state.public_reducer.userName,
        cards: state.public_reducer.cards,
        workspaces: state.public_reducer.workspaces,
        indexCurrentCard: state.public_reducer.indexCurrentCard,
        indexCurrentTask: state.public_reducer.indexCurrentTask

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveCurrentIndexOfCardInRedux: (indexCard) => dispatch(actions.saveCurrentIndexOfCardInRedux(indexCard)),
        saveCurrentIndexOfTaskInRedux: (indexTask) => dispatch(actions.saveCurrentIndexOfTaskInRedux(indexTask)),
        getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewMilstone))