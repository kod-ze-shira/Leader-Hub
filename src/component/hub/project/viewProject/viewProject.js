import React, { useState } from 'react'
import TasksByProject from '../../task/tasksByProject/tasksByProject'
import DetailsProject from '../detailsProject/detailsProject'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import './viewProject.css'
import Cell from './cell'
// import { actions } from '../../../redux/actions/action'
import './viewProject.css'
import { actions } from '../../../../redux/actions/action';
import history from '../../../history'
import { withRouter } from 'react-router-dom';


function ViewProject(props) {

    function detailsProject() {
        set_getProjectById(false);
    }
    const routeToCards = (e) => {
        let idProject = props.myProject._id;
        props.setProjet(props.myProject)
        props.history.push("/" + props.user + "/projectPlatform/" + idProject)
    }

    const [getProjectById, set_getProjectById] = useState(true);
    const [viewTasks, setViewTasks] = useState(false)
    return (
        <>
            <tr >
                <td>
                    <span class='stripeProject'
                        // style={{ 'background-color': props.project.color }}></span>
                        style={{ 'background-color': props.myProject.color }}></span>
                </td>

                <td onClick={(e) => routeToCards(e)}>
                    {props.myProject.name}
                    {/* {props.myProject.description} */}
                </td>

                <td>
                    <Cell

                        // item={props.myProject.dueDate ? props.myProject.dueDate : Date.now()}
                        item={props.myProject.dueDate}
                        description='Due date' />
                    {/* {props.myProject.dueDate}
                dueDate */}
                </td>
                <td>
                    <Cell
                        // item={props.myProject.updateDates[props.myProject.updateDates.length - 1]}
                        item={props.myProject.updateDates.length ? props.myProject.updateDates[props.myProject.updateDates.length - 1] : '12.12,2023'}
                        description='Last update' />
                    {/*                     
                     {props.myProject.updateDates[props.myProject.updateDates.length - 1]}
                Last updateDates</td> */}
                </td>
                <td>
                    <Cell
                        item={props.myProject.cards.length ? props.myProject.cards.length : "0"}
                        description='card' />
                </td>

                <td>
                    <span className='stripeProject'>
                        <span style={{ 'font-weight': 'bold' }}>
                            7</span>/20
                </span>
                    <span className='description'>Task</span>
                </td>
            </tr >
            {/* <div className="container">
                <div className="row" onClick={() => setViewTasks(!viewTasks)}>
                    <div className="col">
                        <div>name:{props.myProject.name}</div>
                        <div>description:{props.myProject.description}</div>
                    </div>
     */}

        </>
    )
}
const mapStateToProps = (state) => {
    return {
        project: state.project_reducer.project,
        user: state.public_reducer.userName
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteProjectInServer: () => dispatch(actions.deleteProjectInServer()),
        setProjet: (project) => dispatch(actions.setProjet(project))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewProject))