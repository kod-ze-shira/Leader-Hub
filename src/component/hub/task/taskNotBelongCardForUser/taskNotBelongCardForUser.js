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
        if (!props.tasks.length) {
            props.getAllTasksNotBelongsCardForUser()
        }
    }, [props.tasks])
    useEffect(() => {
        if (!props.workspaces.length) {
            props.getAllWorkspacesFromServer()
        }

    }, [props.workspaces])
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
                showRocketShip={props.showRocketShip}
                viewToastMassege={props.viewToastMassege}
            /> : null
            : <TasksNotBelongCardByMap key={task._id} task={task}
                objectToast={(task) => props.showToastDelete(task)}
                showToast={showToast}
                showRocketShip={props.showRocketShip}
                viewToastMassege={props.viewToastMassege}
            />
    })

    return (
        <div className={props.openConfigurator?"body-workspace":"body-workspace-without-configurator"}>
            <div className='input-group-task-not-belongs d-flex '>

                <button
                    className={showBtn ? 'd-block btn-add-task py-1 px-3 mr-2 ml-4 mr-auto' : 'd-none '}
                    onClick={hundleClick}>
                    {/* <img width="22" className="icon-complete" id="complete"
                        src={require('../../../assets/img/plus.png')}>
                    </img>‏ */}
                    {/* <span className="icon-complete">+</span> */}
                    Add Task </button>
                <div className={showBtn ? 'd-none' : 'd-block d-flex   col-4 col-xl-5  p-0  mr-md-auto  mr-2 ml-4'}>
                    <div className="wrap-input mr-2 col-8 col-lg-11  ">
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
                                src={require('../../../../assets/img/close-icon.svg')}>
                            </img>
                        </button>
                    </div>
                    <button
                        className="btn-add-task py-1 px-3"
                        onClick={() => {
                            if (nameTask !== '') {
                                props.newTaskNotBelong(nameTask)
                                setNameTask('')
                            }
                            setShowBtn(true)
                        }}>
                        Save</button>
                </div>
                <div className="input-group inputSearchProject inputSearchTask  ml-2 mr-5 "
                >
                    <div className="input-group-prepend">
                        {/* <FontAwesomeIcon icon={["fas", "search"]} /> */}
                        <img src={require('../../../../assets/img/onic-ios-search.png')} />

                    </div>

                    <input type="text" className="col-10" placeholder="Search task..."
                        onChange={(e) => setSearchTask(e.target.value)}
                        aria-label="Username" aria-describedby="basic-addon1" />

                </div>
                {/* <input type="text" className="inputSearchTask ml-2 mr-5 " placeholder="Search task"
                    onChange={(e) => setSearchTask(e.target.value)} /> */}
            </div>
            <div className="wrap-all-task">
                <div className="wrap-all-task-width">
                    <div className="show-task row mx-4 mt-3 headerTableTask pt-2" >
                        <label className="ml-3 pl-6 col-3  labelAllTask"> My task </label>
                        <label className="col-2 propertiesAllTask ml-4">Workspace</label>
                        <label className="col-2 propertiesAllTask">Project</label>
                        <label className=" col-2 propertiesAllTask">Card</label>
                        <label className=" col propertiesAllTask"></label>
                    </div>

                    <div className=" allTasks">
                        {props.tasks.length ?
                            renderTasks
                            : null}
                    </div>
                </div>
            </div>
        </div >
    );

}
const mapStateToProps = (state) => {

    return {
        // user: state.public_reducer.userName,
        tasks: state.public_reducer.tasks,
        workspaces:state.public_reducer.workspaces

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllTasksNotBelongsCardForUser: () => dispatch(actions.getAllTasksNotBelongsCardForUser()),
        newTaskNotBelong: (nameTask) => dispatch(actions.newTaskNotBelong(nameTask)),
        getAllWorkspacesFromServer: () => dispatch(actions.getAllWorkspacesFromServer())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskNotBelongCardForUser)
