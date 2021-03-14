import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import { actions } from '../../../redux/actions/action'
import ViewWorkspaceName from '../../warps/configurator/viewWorkspaceName/viewWorkspaceName'
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
        close: state.public_reducer.close,
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

        const { from } = props//to know from which component its come
        function toastDelete(val) {
            props.toastDelete(val)
        }

        function toastDelete1(val) {
            props.toastDelete1(val)
        }

        const renderSwitch = () => {
            switch (from) {
                case 'viewTaskByCard':
                    return <TaskDetails showToast={toastDelete} task={props.task} />
                case 'editWorkspace'://on click edit button of workspace
                    return <EditWorkspace closeViewDetails={props.closeViewDetails} />
                case 'editCurrentTask':
                    return <EditCurrentTask task={props.task} />
                case 'newProject':
                    return <NewProject workspaceId={props.workspaceId} />
                case 'editProject':
                    return <EditProject showToast={toastDelete} projectToEdit={props.projectToEdit} />
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
                <div className="container-fluid">
                    <div className="row ">

                        <div className="view-details col-5">
                            <div className="close" onClick={(e) => props.closeViewDetails()} >x</div>
                            {renderSwitch()}
                        </div>
                    </div>
                </div >
            </>
        )
    })




