import React, { useState } from 'react'
import { connect } from 'react-redux';
import './viewProject.css'
import Cell from './cell'
import CellDescription from './cellDescription'
import './viewProject.css'
import { actions } from '../../../../redux/actions/action';
import { withRouter } from 'react-router-dom';
// import { ProgressBar } from 'react-bootstrap';
import TeamView from '../../teamView/teamView'
import $ from 'jquery'

function ViewProject(props) {
    const [getProjectById, set_getProjectById] = useState(true);
    const [viewTasks, setViewTasks] = useState(false)
    let complited = 0, complitedColor;
    let [myStyleIcons, setMyStyleIcons] = useState({ 'opacity': '0' });
    let [myStyleStripe, setMyStyleStripe] = useState({ 'color': 'white' });
    // props.setProject(props.myProject)
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

    function editProject(project, event) {
        // props.setProject(project)
        props.editProject(project)
        event.stopPropagation();
    }

    function duplicateProject(event) {
        props.duplicateProject();
        event.stopPropagation();
    }

    function deleteMyProject(event) {
        props.showToast({ 'type': 'Project', 'object': props.myProject.project })
        $(`#${props.myProject.project._id}`).css("display", "none")
        event.stopPropagation();
    }

    if (props.myProject.countTasks) {
        complited = 100 / props.myProject.countTasks;
        complited = complited * props.myProject.countReadyTask
        if (complited % 1 != 0)
            complited = complited.toFixed(2);
    }
    function overProject(id) {
        setMyStyleIcons({ 'opacity': '1' })
        setMyStyleStripe({ 'color': 'rgb(152 169 188 / 38%)' })
    }
    function outOver(id) {
        setMyStyleIcons({ 'opacity': '0' })
        setMyStyleStripe({ 'color': 'white' })
    }
    complitedColor = complited < 30 ? '#44D7B6' : complited < 60 ? '#34A38B' : '#005750'
    return (
        <>
            <tr
                className='projectForWorkspace col-12 '
                onClick={(e) => routeToCards(e)}
                onMouseOver={() => overProject(props.myProject.project._id)}
                onMouseOut={() => outOver(props.myProject.project._id)}
                id={props.myProject.project._id}>
                {/* <div className="col-12" > */}
                <td className='nameProjectInList' >
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
                        <span className='designPropertiesProject' style={{ 'font-weight': 'bold' }}>
                            {props.myProject.countReadyTask}</span>
                        <span className='designPropertiesProject'>
                            /{props.myProject.countTasks}</span>
                    </span>
                    <CellDescription description='Task' />
                </td>
                <td>

                    <div className='divProgress'>
                        <div class="progressProject" >
                            <div role="progressbar" class="progressProject-bar " style={{ "width": complited + "%", background: complitedColor }}
                                aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        {/* <ProgressBar now={60} style={{ "height": "5px", "width": "54%" }} /> */}
                    </div>
                    <CellDescription description={(complited ? complited : 0) + '% comlete'} />
                </td>
                {/* <td style={{ 'text-align': 'center' }}>
                    <TeamView marginTeam='' imgTeam='https://images1.calcalist.co.il/PicServer3/2019/12/12/954216/1LM.jpg' />
                    <TeamView marginTeam='marginTeam' imgTeam='https://images1.calcalist.co.il/PicServer3/2019/12/12/954216/1LM.jpg' />
                    <TeamView marginTeam='marginTeam' numberTeams={'+' + 3} />

                    <CellDescription description='Team' />
                </td> */}
                <td>
                    <Cell item={props.myProject.project.updateDates.length ? props.myProject.project.updateDates[props.myProject.project.updateDates.length - 1] : '12/12/2023'} />
                    <CellDescription description='Last update' />
                </td>

                <td className='actionsProject'>
                    <img style={myStyleIcons}
                        className='iconsProject' onClick={(event) => editProject(props.myProject.project, event)} src={require('../../../img/pencil-write.png')} />
                    <div style={myStyleStripe} className='stripeActionsProject'>|</div>

                    <img style={myStyleIcons} className='mr-1 iconsProject' onClick={(event) => deleteMyProject(event)}
                        src={require('../../../img/bin.png')} />                </td>
            </tr >
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        // project: state.project_reducer.project,
        projectToDelete: state.project_reducer.project,
        projects: state.project_reducer.projects,
        user: state.public_reducer.userName
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setProject: (p) => dispatch(actions.setProject(p)),
        setProjects: (p) => dispatch(actions.setProjects(p)),
        setCards: (cards) => dispatch(actions.setCards(cards)),
        getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
        deleteProjectInServer: () => dispatch(actions.deleteProjectInServer()),


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewProject))