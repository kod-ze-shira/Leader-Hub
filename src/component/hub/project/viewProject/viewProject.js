import React, { useState } from 'react'
import TasksByProject from '../../task/tasksByProject/tasksByProject'
import DetailsProject from '../detailsProject/detailsProject'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import './viewProject.css'
import Cell from './cell'

function ViewProject(props) {

    function detailsProject() {
        set_getProjectById(false);
    }

    const [getProjectById, set_getProjectById] = useState(true);
    const [viewTasks, setViewTasks] = useState(false)
    return (
        <>
            <tr>
                <td>7yuik
                    <span class='stripeProject'
                        style={{ 'background-color': props.project.color }}></span>
                    {/* style={{ 'background-color': '#1AFFFC' }}></span> */}
                </td>
                <td>{props.project.name}</td>
                <Cell item={props.project.dueDate} description='Due date' />
                <Cell item={props.project.updateDates} description='Last updateDates' />
                <Cell item={props.project.cards.length} description='Cards' />


                {/* {Array.from({ length: 6 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                ))} */}
            </tr>
            {/* <div className="container">
            <div className="row" onClick={()=>setViewTasks(!viewTasks)}>
                <div className="col">
                    <div>name:{props.project.name}</div>
                    <div>description:{props.project.description}</div>
                </div>
            </div>
            <div>
          {viewTasks ? <TasksByProject projectId={props.project._id} /> : null}

                    <button onClick={() => { props.deleteProjectInServer()}}>deleteproject</button>
     
                    </div>
                    </div>
     */}

        </>
    )
}
const mapStateToProps = (state) => {
    return {
        project: state.project_reducer.project
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteProjectInServer: () => dispatch(actions.deleteProjectInServer()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewProject)
