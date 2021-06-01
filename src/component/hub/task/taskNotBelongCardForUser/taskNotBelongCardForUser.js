import React, { useEffect, useState } from 'react'
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
    useEffect(() => {
        if (!props.tasks.length)
            props.getAllTasksNotBelongsCardForUser()

    }, [props.tasks])

    // console.log(props.tasks)
    function showToast(valueToDelet) {
        props.showToastDelete(valueToDelet)
    }
    const renderTasks = props.tasks.map((task) => {
        return searchTask ? task.name.toUpperCase().includes(searchTask.toUpperCase()) ?
            <TasksNotBelongCardByMap key={task._id} task={task}
                objectToast={(task) => props.showToastDelete(task)}
                showToast={showToast}
            /> : null
            : <TasksNotBelongCardByMap key={task._id} task={task}
                objectToast={(task) => props.showToastDelete(task)}
                showToast={showToast}
            />
    })
    // const placeholder =
    // <img width="22" className="icon-check-mark"
    //     src={require('../../../img/check-mark.svg')}>
    // </img>+"  Write a task name"
    return (
        <div className="body-workspace ">
            {/* <div className="body-workspace mt-3"> */}

            <div class="input-group input-group-task-not-belongs1">

                {/* <FontAwesomeIcon class='cleanSearchTask' onClick={() => setNameTask('')} icon={["fas", "times"]} /> */}
                <div className='input-group-task-not-belongs d-flex'>

                    <button
                        // className=" btn-add-task   mr-2 ml-4 mr-auto"
                        className={showBtn ? 'd-block btn-add-task   mr-2 ml-4 mr-auto' : 'd-none '}
                        onClick={() => setShowBtn(false)}>
                        <img width="22" className="icon-complete" id="complete"
                            src={require('../../../img/checked.svg')}>
                        </img>‏
                    Add Task </button>
                    <div className={showBtn ? 'd-none' : 'wrap-input d-block col-8 row pr-0  mr-auto  mr-2 ml-4'}>
                        <input type="text" className='addTaskNotBelong '
                            // class=" col-8 addTaskNotBelong  mr-2 ml-4"
                            value={nameTask}
                            placeholder="Write a task name"
                            //  style={{'font-family': 'Font Awesome\ 5 Free'}}
                            onChange={(e) => setNameTask(e.target.value)}
                            // onClick={() => setShowBtn(true)}
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    props.newTaskNotBelong(nameTask)
                                    setNameTask('')
                                    setShowBtn(true)
                                }
                            }} />
                        <button className="close-add-task"  onClick={() => setShowBtn(true)}>
                        <img 
                            src={require('../../../img/close-icon.svg')}>
                        </img>
                        </button>
                    </div>
                    {/* <input type='text' id="searchTask" placeholder='search task' onChange={(e) => setSearchTask(e.target.value)} /> */}
                    {/* <span id="searchProject"> */}
                    <input type="text" class="inputSearchTask mr-5" placeholder="Search task" onChange={(e) => setSearchTask(e.target.value)} />
                </div> {/* </span> */}
                <div class="show-task row mx-4 mt-3 headerTableTask pt-2" >
                    <label class="ml-3 pl-6 col-4 labelAllTask"> My task </label>
                    <label class="col-2 propertiesAllTask ml-4">Workspace</label>
                    <label class="col-2 propertiesAllTask">Project</label>
                    <label class=" col-2 propertiesAllTask">Card</label>
                    <label class=" col propertiesAllTask"></label>
                </div>

            </div>
            {/* <i class="fas fa-times"></i> */}
            {/* <button onClick={() => sestSearchTask('')}>X</button> */}

            <div className=" allTasks">
                {props.tasks.length ?
                    renderTasks
                    : null}
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
