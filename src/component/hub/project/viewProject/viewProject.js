import React, { useState } from 'react'
import TasksByProject from '../../task/tasksByProject/tasksByProject'
import DetailsProject from '../detailsProject/detailsProject'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import './viewProject.css'
import Cell from './cell'
import { actions } from '../../../../redux/actions/action'
import './viewProject.css'
function ViewProject(props) {

    function detailsProject() {
        set_getProjectById(false);
    }

    const [getProjectById, set_getProjectById] = useState(true);
    const [viewTasks, setViewTasks] = useState(false)
    return (
        <>
            <tr>
                <td>
                    <span class='stripeProject'
                        style={{ 'background-color': props.project.color }}></span>
                </td>
                <td>

                    {props.project.name}</td>
                <td>
                    <Cell
                        item={props.project.dueDate}
                        description='Due date' />
                    {/* {props.project.dueDate}
                dueDate */}
                </td>
                <td>
                    <Cell
                        item={props.project.updateDates[props.project.updateDates.length - 1]}
                        description='CardLast updateDates' />
                    {/*                     
                     {props.project.updateDates[props.project.updateDates.length - 1]}
                Last updateDates</td> */}
                </td>
                <td>
                    <Cell
                        item={props.project.cards ? props.project.cards.length : null}
                        description='Card' />
                </td>
            </tr>
            {/* <div className="container">
                <div className="row" onClick={() => setViewTasks(!viewTasks)}>
                    <div className="col">
                        <div>name:{props.project.name}</div>
                        <div>description:{props.project.description}</div>
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
