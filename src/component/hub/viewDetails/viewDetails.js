import React, { useState } from 'react';
import { connect } from 'react-redux';
import EditProject from '../project/editProject/editProject';
import NewProject from '../project/newProject/newProject';
import ShareProject from '../project/shareProject/shareProject';
import AddTask from '../task/addTask/addTask';
import TaskDetails from '../task/taskDetails/taskDetails';
import TaskNotBelongDetails from '../task/taskNotBelongCardForUser/taskNotBelongDetails/taskNotBelongDetails';
import AddWorkspace from '../workspace/addWorkspace/addWorkspace';
import EditWorkspace from '../workspace/editWorkspace/editWorkspace';
import EditCurrentTask from '../task/editCurrentTask/editCurrentTask';
import './viewDetails.css';

const mapStateToProps = (state) => {
    return {
        // close: state.public_reducer.close,
        indexOfWorkspace: state.public_reducer.indexOfWorkspace

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    function ViewDetails(props) {

        const [close, setclose] = useState(true)
        const [open, setOpen] = useState(true)
        const [oldObject, setOldObject] = useState()
        const { from } = props//to know from which component its come


        function showToast(val) {
            props.showToast(val)
        }

        const renderSwitch = () => {
            switch (from) {
                case 'viewTaskByCard':
                    return <TaskDetails
                        showToast={showToast}
                        task={props.task}
                        objectBeforeChanges={(e) => setOldObject(e)}
                        closeViewDetails={props.closeViewDetails}
                    />
                case 'editWorkspace'://on click edit button of workspace
                    return <EditWorkspace closeViewDetails={props.closeViewDetails}
                        showToast={(e) => showToast(e)}
                        workspace={props.workspace}
                        objectBeforeChanges={(e) => setOldObject(e)}
                    />

                case 'editCurrentTask':
                    return <EditCurrentTask task={props.task} />
                case 'taskNotBelongDetails':
                    return <TaskNotBelongDetails task={props.task}
                        objectBeforeChanges={(e) => setOldObject(e)}
                        closeViewDetails={props.closeViewDetails}
                        showToast={showToast}
                        setDownloadFile={(e) => props.setDownloadFile(e)}
                    />
                case 'newProject':
                    return <NewProject closeViewDetails={props.closeViewDetails} workspaceId={props.workspaceId} />
                case 'editProject':
                    return <EditProject closeViewDetails={props.closeViewDetails}
                        showToast={(e) => showToast(e)} objectBeforeChanges={(e) => setOldObject(e)} />
                case 'shareProject':
                    return <ShareProject closeViewDetails={props.closeViewDetails}/>
                case 'addTask':
                    return <AddTask cardId={props.cardId} />
                case 'addWorkspace':
                    return <AddWorkspace closeViewDetails={props.closeViewDetails} />
                default:
                    return null;

            }
        }

        return (
            <>
                <div className="row ">
                    <div className="view-details  col-5">
                        {/* <div className="close mt-2 mr-2" onClick={(e) => closeEndRefreshViewDetails()} >x</div> */}
                        {renderSwitch()}
                    </div>
                </div>
            </>
        )
    })




