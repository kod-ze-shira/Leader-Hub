
import { actions } from '../../../../redux/actions/action'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react'
// import './ViewTaskByCrad.css'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import ViewDetails from '../../viewDetails/viewDetails'
import $ from 'jquery';
import Animation from '../../animation/animation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function TasksNotBelongCardByMap(props) {

    const [viewDetails, setViewDetails] = useState(false)
    const [showchalalit, setShowChalalit] = useState(false)
    const [detailsOrEditTask, setDetailsOrEditTask] = useState()
    const [currentIndexTask, setCurrentIndexTask] = useState("")
    const [currentIndexCard, setCurrentIndexCard] = useState("")
    const [editTaskName, setEditTaskName] = useState(props.task.name)

    // const [viewCompleteTask, setViewCompleteTask] = useState(false)
    const [doneStatus, setDoneStatus] = useState(props.task.complete)

    const [task, setTask] = useState({
        "_id": props.task._id, "name": props.task.name, "description": props.task.description
        , "status": props.status, "dueDate": props.task.dueDate, "startDate": props.task.startDate
    })

    useEffect(() => {

    }, [props.task])


    // const showDetails = (from) => {
    //     props.setTaskName(task.name)
    //     setDetailsOrEditTask(from)
    //     props.setCurrentIndexTask(currentIndexTask)
    //     props.setCurrentIndexCard(currentIndexCard)
    //     setViewDetails(true)
    // }
    const editTask = () => {
        let temp = { ...task }
        temp.name = editTaskName
        setTask(temp)
    }
    $(window).click(function () {
        setViewDetails(false)
    });

    // function openViewDetails(event) {
    //     showDetails("viewTaskByCard")
    //     event.stopPropagation();
    // }
    // function stopP(event) {
    //     event.stopPropagation();
    // }

    function addChalalit() {
        if (props.task.complete == false)
            setShowChalalit(true)
    }

    const editCompleteTask = () => {
        debugger
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        const yyyy = today.getFullYear()
        today = (dd <= 9 ? '0' + dd : dd) + '/' + (mm <= 9 ? '0' + mm : mm) + '/' + yyyy
        let completeTask = {
            "_id": props.task._id,
            "name": props.task.name,
            "description": props.task.description,
            "dueDate": props.task.dueDate,
            "startDate": props.task.startDate,
            "complete": true,
            "endDate": today,
            "status": props.statuses[2],
            // "card": props.task.card
        }
        props.setTaskComplete(completeTask)
        props.completeTask(task)
        // setViewCompleteTask(true)
    }

    const changeFiledInTask = (input) => {
        props.setCurrentIndexTask(currentIndexTask)
        props.setCurrentIndexCard(currentIndexCard)
        let value = input.target.value
        let editTaskInRedux = { "nameFiled": input.target.name, "value": value }
        props.setTaskByFiledFromTasks(editTaskInRedux)
        if (input.target.name == "complete")
            editCompleteTask()
        console.log("task", props.task.complete);
    }

    function deleteTask() {
        console.log(props.task._id)
        $(`#${props.task._id + "disappear"}`).css("display", "none")
        props.objectToast({ 'type': 'Task', 'object': props.task })

    }

    return (
        <>
            <div
                style={{ 'min-height': '36px' }}
                className="show-task row mx-4 border-bottom "
            >

                <FontAwesomeIcon className="dnd-icon mt-2 " id={props.task._id}
                    icon={['fas', 'grip-vertical']}
                ></FontAwesomeIcon>
                <label
                    className="check-task ml-3 py-2 pl-5 col-1 ">
                    <input type="checkbox" />
                    <span className="checkmark checkmark-place" onClick={() => addChalalit()}></span>
                </label>

                <input
                    name="name" id="name" title={props.task.name}
                    className={props.task.complete ? "disabled show-card py-2" : "show-card py-2"}
                    value={props.task.name}
                    onChange={(e) => changeFiledInTask(e)}
                    onBlur={(e) => editTask()}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            editTask()
                        }
                    }}
                >
                </input>
                <label className="check-task py-2  px-2 col-3 ">
                </label>
                <label className="check-task border-left  py-2  px-2 col ">
                    {/* {props.task.status} */}
                </label>
                <label className="check-task border-left  py-2  px-2 col " >
                    {/* <div className={(props.task.status) == "in progress" ? 'status-task-in-progress' : props.task.status == "done" ? 'status-task-done' : 'status-task-to-do'}>{props.task.status}</div> */}
                </label>
                <label className="check-task border-left  py-2  px-2 col">
                    {/* {props.task.dueDate} */}
                </label>

                {viewDetails ?
                    <div className="closeDet" >
                        <ViewDetails showToast={deleteTask} closeViewDetails={() => setViewDetails(false)}
                            from={detailsOrEditTask} task={task} open={true}> </ViewDetails>
                    </div>
                    : null}
            </div>
            {/* </div>
                )}
            </Draggable> */}

            { showchalalit ? <div className="animation"><Animation /> </div> : null}


        </>
    )
}
const mapStateToProps = (state) => {

    return {
        tasks: state.public_reducer.tasks,
        // cards: state.public_reducer.cards
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        EditTask: (task) => dispatch(actions.editTask(task)),
        setTaskStatus: (index) => dispatch(actions.setTaskStatus(index)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TasksNotBelongCardByMap)
