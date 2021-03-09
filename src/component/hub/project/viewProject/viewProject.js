import React, { useState } from 'react'
import { connect } from 'react-redux';
import './viewProject.css'
import Cell from './cell'
import CellDescription from './cellDescription'
import './viewProject.css'
import { actions } from '../../../../redux/actions/action';
import { withRouter } from 'react-router-dom';
import { ProgressBar, Spinner } from 'react-bootstrap';
import TeamView from '../../teamView/teamView'
import { getProjectsByWorkspaceId } from '../../../../redux/middleware/crud';
function ViewProject(props) {
    const [getProjectById, set_getProjectById] = useState(true);
    const [viewTasks, setViewTasks] = useState(false)

    function detailsProject() {
        set_getProjectById(false);
    }
    const routeToCards = (e) => {
        let idProject = props.myProject.project._id;
        props.setProject(props.myProject.project)
        console.log("project" + props.myProject.project._id)
        // props.setCards(props.myProject.project.cards)
        props.getCardsByProjectId(props.myProject.project._id)
        props.history.push("/" + props.user + "/projectPlatform/" + idProject)
    }
    function deleteProject(event) {
        props.setProject(props.myProject.project)
        props.deleteProjectInServer()
        event.stopPropagation();
        // props.deleteProjectFromWorkspace(props.myProject.project)
    }
    function editProject(project, event) {
        props.setProject(project)
        // projectToEdit
        props.editProject()
        event.stopPropagation();
    }

    let complited = 0, complitedColor;
    complited = props.myProject.project.countTasks / 100;
    complited = complited * props.myProject.project.countReadyTask
    complitedColor = complited < 30 ? '#9DFF00' : complited < 60 ? '#6FAC41' : '#245300'
    return (
        <>
            <tr className='projectForWorkspace' onClick={(e) => routeToCards(e)}>
                <td >
                    <span class="dot" style={{ 'background-color': props.myProject.project.color }} ></span>
                    <span style={{ 'color': props.myProject.project.color }}>
                        {props.myProject.project.name}</span>
                    {/* <span class='stripeProject'
                        // style={{ 'background-color': props.project.color }}></span>
                        style={{ 'background-color': props.myProject.project.color }}></span> */}
                </td>
                <td>
                    <Cell item={props.myProject.project.dueDate} />
                    <CellDescription description='Due date' />
                </td>
                <td>
                    <Cell item={props.myProject.project.cards.length ? props.myProject.project.cards.length : "0"} />
                    <CellDescription description='card' />
                </td>
                <td>
                    <span className='task'>
                        <span style={{ 'font-weight': 'bold' }}>
                            {props.myProject.countReadyTask}</span>
                        <span>
                            /{props.myProject.countTasks}</span>
                    </span>
                    <CellDescription description='Task' />
                </td>
                <td>

                    <div className='divProgress'>
                        <div class="progressProject" >
                            <div role="progressbar" class="progressProject-bar" style={{ "width": complited + "%", background: complitedColor }}
                                aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        {/* <ProgressBar now={60} style={{ "height": "5px", "width": "54%" }} /> */}
                    </div>
                    <CellDescription description={(complited ? complited : 0) + '% comlete'} />
                </td>
                <td style={{ 'text-align': 'center' }}>
                    <TeamView marginTeam='' imgTeam='https://images1.calcalist.co.il/PicServer3/2019/12/12/954216/1LM.jpg' />
                    <TeamView marginTeam='marginTeam' imgTeam='https://images1.calcalist.co.il/PicServer3/2019/12/12/954216/1LM.jpg' />
                    <TeamView marginTeam='marginTeam' numberTeams={'+' + 3} />

                    <CellDescription description='Team' />
                </td>
                <td>
                    <Cell item={props.myProject.project.updateDates.length ? props.myProject.project.updateDates[props.myProject.project.updateDates.length - 1] : '12/12/2023'} />
                    <CellDescription description='Last update' />
                </td>

                <td>
                    <img onClick={(event) => deleteProject(event)} src={require('../../../img/bin.png')}></img>
                    <img onClick={(event) => editProject(props.myProject.project, event)} src={require('../../../img/pencil-write.png')}></img>
                </td>

            </tr >

        </>
    )
}
const mapStateToProps = (state) => {
    return {
        project: state.project_reducer.project,
        projects: state.project_reducer.projects,
        user: state.public_reducer.userName
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteProjectInServer: () => dispatch(actions.deleteProjectInServer()),
        setProject: (p) => dispatch(actions.setProject(p)),
        setProjects: (p) => dispatch(actions.setProjects(p)),
        setCards: (cards) => dispatch(actions.setCards(cards)),
        getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),


        // deleteProjectFromWorkspace: (p) => dispatch(actions.deleteProjectFromWorkspace(p))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewProject))