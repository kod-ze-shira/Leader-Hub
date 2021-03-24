import React from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action'

function viewMilstone(props) {
    return (
        <div>
                 <div className="show-task row mx-4 border-bottom ">
{/* 
                <FontAwesomeIcon className="dnd-icon mt-2 " 
                    icon={['fas', 'grip-vertical']}
                ></FontAwesomeIcon> */}
                <label
                    className="check-task ml-3 py-2 pl-5 col-1 ">
                    <input type="checkbox" />
                    <span className="checkmark checkmark-place" 
                    // onClick={() => addChalalit()}
                    ></span>
                </label>
                <input
                    className="show-card col-3"
                    value={props.milestone.name}
                    // onChange={(e) => setEditTaskName(e.target.value)}
                    // onBlur={(e) => editTask(e)}
                    // onKeyPress={event => {
                    //     if (event.key === 'Enter') {
                    //         editTask()
                    //     }
                    // }}
                ></input>
                {/* <label className="check-task py-2  px-2 col-3 ">
                    <button onClick={(e) => showDetails("viewTaskByCard")}>view details +</button>
                </label> */}
                {/* <label className="check-task border-left  py-2  px-2 col ">{props.task.status}
                </label>
                <label className="check-task border-left  py-2  px-2 col " >
                    <div className={(props.task.status) == "in progress" ? 'status-task-in-progress' : props.task.status == "done" ? 'status-task-done' : 'status-task-to-do'}>{props.task.status}</div>
                </label>
                <label className="check-task border-left  py-2  px-2 col">{props.task.dueDate}

                </label> */}
{/* 
                {viewDetails ?
                    <div className="closeDet" >
                        <ViewDetails showToast={deleteTask} closeViewDetails={() => setViewDetails(false)}
                            from={detailsOrEditTask} task={props.milestone} open={true}> </ViewDetails>
                    </div>
                    : null} */}
            </div>
            {/* { showchalalit ? <div className="animation"><Animation /> </div> : null} */}
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
