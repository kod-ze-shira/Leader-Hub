import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import { actions } from '../../../redux/actions/action'
import ViewWorkspaceName from '../../warps/configurator/viewWorkspaceName/viewWorkspaceName'
import './viewDetails.css'
import EditWorkspace from '../workspace/editWorkspace/editWorkspace'
import NewProject from '../project/newProject/newProject'
import AddTask from '../task/addTask/addTask'
import ViewTaskByCrad from '../task/viewTaskByCard/viewTaskByCrad';
import TaskDetails from '../task/taskDetails/taskDetails'


const mapStateToProps = (state) => {
    return {
        close: state.public_reducer.close,
        // task: state.task_reducer.task
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // setclose: () => dispatch(actions.setclose()),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    function ViewDetails(props) {
        const { from } = props//to know from which component its come
        const renderSwitch = () => {
            switch (from) {
                case 'viewTaskByCard':
                    return <TaskDetails task={props.task}/>
                case 'editWorkspace'://on click edit button of workspace
                    return <EditWorkspace />
                case 'newProject':
                    return <NewProject workspaceId={props.workspaceId} />
                case 'addTask':
                    return <AddTask cardId={props.cardId} />
                default:
                    return null;

            }
        }
        const [close, setclose] = useState(true)
        function closEdit() {
            setclose(false);
        }
        return (
            <>
                {
                    close ?
                        <>
                            <div className="container-fluid">
                                <div className="row ">

                                    <div className="view-details col-5">
                                        <div className="close" onClick={closEdit} >x</div>
                                        {renderSwitch()}
                                    </div>
                                </div>
                            </div >

                        </>
                        : null



                }
            </>
        )
    })




