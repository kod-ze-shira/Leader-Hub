import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import 'bootstrap/dist/css/bootstrap.min.css';
import TasksNotBelongCardByMap from './tasksNotBelongCardByMap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './taskNotBelongCardForUser.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TaskNotBelongCardForUser(props) {
    const [searchTask, setSearchTask] = useState('')
    const [nameTask, setNameTask] = useState('')
    const [showBtn, setShowBtn] = useState(true)
    const addTaskInput = useRef();
    useEffect(() => {
        if (!props.tasks.length)
            props.getAllTasksNotBelongsCardForUser()

    }, [props.tasks])
    useEffect(() => {
        addTaskInput.current.focus();
    }, [showBtn])


    function showToast(valueToDelet) {
        props.showToastDelete(valueToDelet)
    }
    const hundleClick = () => {
        setShowBtn(false)
    }
    const renderTasks = props.tasks.map((task) => {
        return searchTask ? task.name.toUpperCase().includes(searchTask.toUpperCase()) ?
            <TasksNotBelongCardByMap key={task._id} task={task}
                objectToast={(task) => props.showToastDelete(task)}
                showToast={showToast}
                viewToastComplete={props.viewToastComplete}
            /> : null
            : <TasksNotBelongCardByMap key={task._id} task={task}
                objectToast={(task) => props.showToastDelete(task)}
                showToast={showToast}
                viewToastComplete={props.viewToastComplete}
            />
    })

    return (
        <div className="body-workspace ">
            <div className='input-group-task-not-belongs d-flex '>

                <button
                    className={showBtn ? 'd-block btn-add-task p-2  mr-2 ml-4 mr-auto' : 'd-none '}
                    onClick={hundleClick}>
                    {/* <img width="22" className="icon-complete" id="complete"
                        src={require('../../../img/checked.svg')}>
                    </img>‏ */}
                    <span className="icon-complete">+</span>
                    Add Task </button>
                <div className={showBtn ? 'd-none' :
                    'wrap-input d-block  col-6 col-lg-8  pr-0  mr-md-auto  mr-2 ml-4'}>
                    <input type="text" className='addTaskNotBelong '
                        value={nameTask}
                        ref={addTaskInput}
                        placeholder="Write a task name"
                        // onClick={hundleClick}
                        onChange={(e) => setNameTask(e.target.value)}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                if (nameTask !== '') {
                                    props.newTaskNotBelong(nameTask)
                                    setNameTask('')
                                }
                                setShowBtn(true)
                            }
                        }} />
                    <button className="close-add-task" onClick={() => setShowBtn(true)}>
                        <img width="75%"
                            src={require('../../../img/close-icon.svg')}>
                        </img>
                    </button>
                </div>

                <input type="text" class="inputSearchTask ml-2 mr-5 " placeholder="Search task"
                    onChange={(e) => setSearchTask(e.target.value)} />
            </div>
            <div className="wrap-all-task">
                <div className="wrap-all-task-width">
                    <div class="show-task row mx-4 mt-3 headerTableTask pt-2" >
                        <label class="ml-3 pl-6 col-3 col-xl-4 labelAllTask"> My task </label>
                        <label class="col-2 propertiesAllTask ml-4">Workspace</label>
                        <label class="col-2 propertiesAllTask">Project</label>
                        <label class=" col-2 propertiesAllTask">Card</label>
                        <label class=" col propertiesAllTask"></label>
                    </div>

                    <div className=" allTasks">
                        {props.tasks.length ?
                            renderTasks
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );

}
const mapStateToProps = (state) => {

    return {
        // user: state.public_reducer.userName,
        tasks: state.public_reducer.tasks,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllTasksNotBelongsCardForUser: () => dispatch(actions.getAllTasksNotBelongsCardForUser()),
        newTaskNotBelong: (nameTask) => dispatch(actions.newTaskNotBelong(nameTask)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskNotBelongCardForUser)
