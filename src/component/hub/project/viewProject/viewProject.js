import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import $ from "jquery";
import ReactTooltip from 'react-tooltip';
import title from '../../../../Data/title.json';
import { actions } from '../../../../redux/actions/action';
import share from '../../../img/share.svg';
import Cell from './cell';
import CellDescription from './cellDescription';
import './viewProject.css';

function ViewProject(props) {
    console.log(props.myProject.members)
    let complited = props.myProject.countReadyTasks
        , complitedColor;
    let [myStyleIcons, setMyStyleIcons] = useState({ 'opacity': '0' });
    let [myStyleStripe, setMyStyleStripe] = useState({ 'color': 'white' });
    // props.setProject(props.myProject)
    let refToProject = useRef('')
    useEffect(() => {
    }, [props.indexOfWorkspace])

    const routeToCards = (e) => {
        props.setCurrentIndexProject(props.indexProject)
        let idProject = props.myProject._id;
        // console.log("project" + props.myProject._id)
        props.getCardsByProjectId(props.myProject._id)
        props.setCurrentIndexProject(props.indexProject)
        props.history.push("/" + props.user + "/hub/projectPlatform/" + idProject)
    }

    function editProject(project, event) {
        props.setCurrentIndexProject(props.indexProject)
        // props.addProjectTArray(project)
        props.editOrShareProject('editProject')
        event.stopPropagation();
    }

    function duplicateProject(event) {
        props.duplicateProject();
        event.stopPropagation();
    }

    function deleteMyProject(event) {
        props.showToast({ 'type': 'Project', 'object': props.myProject })
        // $(`#${props.myProject._id}`).css("display", "none")
        event.stopPropagation();
    }

    if (props.myProject.countTasks) {
        complited = 100 / props.myProject.countTasks;
        complited = complited * props.myProject.countReadyTasks
        if (complited % 1 != 0)
            complited = complited.toFixed(2);
        complited = Math.round(complited);

    }
    function overProject(id) {
        setMyStyleIcons({ 'opacity': '1' })
        setMyStyleStripe({ 'color': 'rgb(152 169 188 / 38%)' })
        refToProject.current.style.backgroundColor = "white"
    }
    function outOver(id) {
        setMyStyleIcons({ 'opacity': '0' })
        setMyStyleStripe({ 'color': 'white' })
        refToProject.current.style.backgroundColor = "#e9ecef"

    }
    const openShareProject = (event) => {
        for (let index = 0; index < props.workspaces.length; index++) {
            for (let index2 = 0; index2 < props.workspaces[index].projects.length; index2++) {
                if (props.workspaces[index].projects[index2]._id == props.myProject._id) {
                    props.setCurrentIndexProject(index2)
                    props.saveIndexOfWorkspaceInRedux(index)
                }

            }

        }

        props.editOrShareProject('shareProject')
        event.stopPropagation();
    }
    complitedColor = complited < 30 ? '#44D7B6' : complited < 60 ? '#34A38B' : '#005750'
    return (
        <>
            <tr
                className='projectForWorkspace col-12 '
                onClick={(e) => routeToCards(e)}
                onMouseOver={() => overProject(props.myProject._id)}
                onMouseOut={() => outOver(props.myProject._id)}
                id={props.myProject._id}>
                {/* <div className="col-12" > */}
                <td className='nameProjectInList' >
                    <span class="dot" style={{ 'background-color': props.myProject.color }} ></span>
                    <span class='name2ProjectInList' title={props.myProject.name}
                        style={{ 'color': props.myProject.color }}>
                        {props.myProject.name}</span>
                    {/* <span class='stripeProject'
                        // style={{ 'background-color': props.color }}></span>
                        style={{ 'background-color': props.myProject.color }}></span> */}
                </td>
                <td className='widthCellInProject'>
                    <Cell item={props.myProject.dueDate} />
                    <CellDescription description='Due date' />
                </td>
                <td className='widthCellInProject'  >
                    <div data-tip data-for="card_n"><Cell item={props.myProject.cards.length ?
                        props.myProject.cards.length : "0"} /></div>
                    <ReactTooltip data-tip id="card_n" place="bottom" effect="solid">
                        {title.title_number_of_cards}
                    </ReactTooltip>
                    <CellDescription description='card' />
                </td>
                <td>
                    <span className='task widthCellInProject' >
                        <span className='designPropertiesProject' style={{ 'font-weight': 'bold' }} data-tip data-for="task_c">
                            <ReactTooltip data-tip id="task_c" place="bottom" effect="solid">
                                {title.title_task_complete}
                            </ReactTooltip>
                            {props.myProject.countReadyTasks}</span>
                        <span className='designPropertiesProject' data-tip data-for="task_count">
                            /{props.myProject.countTasks}
                            <ReactTooltip data-tip id="task_count" place="bottom" effect="solid">
                                {title.title_count_task}
                            </ReactTooltip></span>
                    </span>
                    <CellDescription description='Task' />
                </td>
                <td>
                    <div className='divProgress'>
                        <div class="progressProject" ref={refToProject}>
                            <div role="progressbar" class="progressProject-bar " style={{ "width": complited + "%", background: complitedColor }}
                                aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" data-tip data-for="percentage" ></div>
                        </div>
                        <ReactTooltip data-tip id="percentage" place="bottom" effect="solid">
                            {title.title_percentage}
                        </ReactTooltip>
                        {/* <ProgressBar now={60} style={{ "height": "5px", "width": "54%" }} /> */}
                    </div>
                    <CellDescription description={(complited ? complited : 0) + '% complete'} />
                </td>

                {/* {props.myProject.members.length ?
                    <td style={{ 'text-align': 'center' }}>
                        <TeamView marginTeam='' imgTeam='https://images1.calcalist.co.il/PicServer3/2019/12/12/954216/1LM.jpg' />
                        <TeamView marginTeam='marginTeam' imgTeam='https://images1.calcalist.co.il/PicServer3/2019/12/12/954216/1LM.jpg' />
                        <TeamView marginTeam='marginTeam' numberTeams={'+' + 3} />

                        <CellDescription description='Team' />
                    </td>
                    : null} */}
                <td className='widthCellInProject'>
                    <Cell item={props.myProject.updateDates[props.myProject.updateDates.length - 1]} />
                    <CellDescription description='Last Update' />
                </td>

                <td className='actionsProject  iconsProjectInLine' onClick={(e) => e.stopPropagation()}>


                    <img style={myStyleIcons} src={require('../../../img/shareNew.svg')}
                        className='iconsProject' data-tip data-for="share"
                        onClick={(event) => openShareProject(event)} src={share} />
                    <ReactTooltip data-tip id="share" place="bottom" effect="solid">
                        {title.title_share}
                    </ReactTooltip>
                    <div style={myStyleStripe} className='stripeActionsProject'>|</div>

                    <img style={myStyleIcons} className='mr-1 iconsProject' onClick={(event) => editProject(props.myProject, event)}
                        src={require('../../../img/pencil-edit.png')} data-tip data-for="edit_" />
                    <ReactTooltip data-tip id="edit_" place="bottom" effect="solid">
                        {title.title_edit}
                    </ReactTooltip>
                    <div style={myStyleStripe} className='stripeActionsProject'>|</div>

                    <img style={myStyleIcons} className='mr-1 iconsProject' onClick={(event) => deleteMyProject(event)}
                        src={require('../../../img/remove.png')} data-tip data-for="delete" />
                    <ReactTooltip data-tip id="delete" place="bottom" effect="solid">
                        {title.title_delete}
                    </ReactTooltip>        </td>

            </tr >
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        indexOfWorkspace: state.public_reducer.indexOfWorkspace,
        projectToDelete: state.project_reducer.project,
        projects: state.project_reducer.projects,
        user: state.public_reducer.userName,
        workspaces: state.public_reducer.workspaces,
        indexCurrentProject: state.public_reducer.indexCurrentProject,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // addProjectTArray: (p) => dispatch(actions.addProjectTArray(p)),
        setProjects: (p) => dispatch(actions.setProjects(p)),
        setCards: (cards) => dispatch(actions.setCards(cards)),
        getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
        deleteProjectInServer: () => dispatch(actions.deleteProjectInServer()),
        setCurrentIndexProject: (index) => dispatch(actions.setCurrentIndexProject(index)),
        saveIndexOfWorkspaceInRedux: (index) => dispatch(actions.saveIndexOfWorkspaceInRedux(index))


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewProject))