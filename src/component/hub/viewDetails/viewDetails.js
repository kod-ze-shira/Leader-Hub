import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import { actions } from '../../../redux/actions/action'
import './viewDetails.css'
import EditWorkspace from '../workspace/editWorkspace/editWorkspace'
import NewProject from '../project/newProject/newProject'
import EditProject from '../project/editProject/editProject'
import AddTask from '../task/addTask/addTask'
import ViewTaskByCrad from '../task/viewTaskByCard/viewTaskByCrad';
import TaskDetails from '../task/taskDetails/taskDetails'
import EditTask from '../task/addTask/addTask'
import EditCurrentTask from '../task/editCurrentTask/editCurrentTask'
import AddWorkspace from '../workspace/addWorkspace/addWorkspace'

const mapStateToProps = (state) => {
    return {
        // close: state.public_reducer.close,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProjectInWorkspace: (project) => dispatch(actions.setProjectInWorkspace(project)),
        setWorkspaceBeforeChanges: (workspace) => dispatch(actions.setWorkspaceBeforeChanges(workspace)),
        setTaskFromTasks: (task) => dispatch(actions.setTaskFromTasks(task)),
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
                    return <TaskDetails showToast={showToast}
                    task={props.task}
                    objectBeforeChanges={(e) => setOldObject(e)}
                        closeViewDetails={props.closeViewDetails}                    
                        />
                case 'editWorkspace'://on click edit button of workspace
                    return <EditWorkspace closeViewDetails={props.closeViewDetails} workspace={props.workspace} objectBeforeChanges={(e) => setOldObject(e)} />
                case 'editCurrentTask':
                    return <EditCurrentTask task={props.task} />
                case 'newProject':
                    return <NewProject closeViewDetails={props.closeViewDetails} workspaceId={props.workspaceId} />
                case 'editProject':
                    return <EditProject closeViewDetails={props.closeViewDetails}
                        showToast={showToast} objectBeforeChanges={(e) => setOldObject(e)} />
                case 'addTask':
                    return <AddTask cardId={props.cardId} />
                case 'addWorkspace':
                    return <AddWorkspace closeViewDetails={props.closeViewDetails} />
                default:
                    return null;

            }
        }

        function closeEndRefreshViewDetails() {
            if (oldObject)
                switch (oldObject.type) {
                    case 'workspace':
                        props.setWorkspaceBeforeChanges({ 'workspace': oldObject.workspace })
                        break;
                    case 'project':
                        props.setProjectInWorkspace({ "project": oldObject.project })
                        break;
                    case 'task':
                        props.setTaskFromTasks({ "task": oldObject.task })
                        break;


                    default:
                        break;
                }
            props.closeViewDetails()
        }

        return (
            <>
                <div className="row ">
                    <div className="view-details  col-5 mt-3">
                        <div className="close mt-2 mr-2" onClick={(e) => closeEndRefreshViewDetails()} >x</div>
                        {renderSwitch()}
                    </div>
                </div>
            </>
        )
    })




