// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import $ from "jquery";
import ReactTooltip from 'react-tooltip';
import title from '../../../../Data/title.json';
import { actions } from '../../../../redux/actions/action';
import share from '../../../../assets/img/share.svg';
import Cell from './cell';
import CellDescription from './cellDescription';
import './viewProject.css';
import TeamView from '../../teamView/teamView'
import ProjectStyle from "../projectStyle";
import userfriend from '../../../../assets/img/userfriend.png'

function ViewProject(props) {

    let complited = props.myProject.countReadyTasks
        , complitedColor;
    const [myStyleIcons, setMyStyleIcons] = useState({ 'opacity': '0' });
    const [myStyleStripe, setMyStyleStripe] = useState({ 'color': 'white' });
    // props.setProject(props.myProject)
    let refToProject = useRef('')
    useEffect(() => {
    }, [props.indexOfWorkspace])

    const routeToCards = (e) => {
        let idProject = props.myProject._id;
        props.getCardsByProjectId(props.myProject._id)
        props.setCurrentIndexProject(props.indexProject)
        props.history.push("/" + props.user + "/hub/projectPlatform/" + idProject)
    }

    function editProject(project, event) {
        let index = props.workspaces.findIndex(w => w.projects.find(project => project._id == props.myProject._id))
        props.saveIndexOfWorkspaceInRedux(index)
        props.setCurrentIndexProject(props.indexProject)
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
    const [membersPlus, setMembersPlus] = useState(0)
    const members = props.myProject.members.length ?
        props.myProject.members.map((member, index) => {
            return index < 2 ?
                <TeamView marginTeam='' imgTeam={member.contact.thumbnail} />
                : <></>
        }) : null


    complitedColor = complited < 30 ? '#8ce5e7' : complited < 60 ? '#1fb9c1' : '#358a8d'
    return (
        <>
            <tr
                className='projectForWorkspace col-12 '
                onClick={(e) => routeToCards(e)}
                onMouseOver={(e) => overProject(props.myProject._id)}
                onMouseOut={(e) => outOver(props.myProject._id)}
                id={props.myProject._id}>
                {/* <div className="col-12" > */}
                <td className='nameProjectInList' >
                    {/* <ProjectStyle color={props.myProject.color}></ProjectStyle> */}
                    {/* <span class="dot" style={{ 'background-color': props.myProject.color }} ></span> */}
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
                <td style={{ width: '5%' }}  >
                    <div data-tip data-for="card_n"><Cell item={props.myProject.cards.length ?
                        props.myProject.cards.length : "0"} /></div>
                    <ReactTooltip className="tooltip-style" data-tip id="card_n" place="bottom" effect="solid">
                        {title.title_number_of_cards}
                    </ReactTooltip>
                    <CellDescription description='cards' />
                </td>
                <td>
                    <span className='task widthCellInProject' >
                        <span className='designPropertiesProject' style={{ 'font-weight': 'bold' }} data-tip data-for="task_c">
                            <ReactTooltip className="tooltip-style" data-tip id="task_c" place="bottom" effect="solid">
                                {title.title_task_complete}
                            </ReactTooltip>
                            {props.myProject.countReadyTasks}</span>
                        <span className='designPropertiesProject' data-tip data-for="task_count">
                            /{props.myProject.countTasks}
                            <ReactTooltip className="tooltip-style" data-tip id="task_count" place="bottom" effect="solid">
                                {title.title_count_task}
                            </ReactTooltip></span>
                    </span>
                    <CellDescription description='Tasks' />
                </td>
                <td>
                    <div className='divProgress'>
                        <div class="progressProject" ref={refToProject}>
                            <div role="progressbar" class="progressProject-bar " style={{ "width": complited + "%", background: complitedColor }}
                                aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" data-tip data-for="percentage" ></div>
                        </div>
                        <ReactTooltip className="tooltip-style" data-tip id="percentage" place="bottom" effect="solid">
                            {title.title_percentage}
                        </ReactTooltip>
                        {/* <ProgressBar now={60} style={{ "height": "5px", "width": "54%" }} /> */}
                    </div>
                    <CellDescription description={(complited ? complited : 0) + '% complete'} />
                </td>
                <td className='widthCellInProject' style={{ 'text-align': 'center' }}>
                    {members}
                    {props.myProject.members.length > 2 ?
                        <TeamView marginTeam='marginTeam' numberTeams={'+' + (props.myProject.members.length - 2)} />
                        : null
                    }

                    <CellDescription description='Team' />
                </td>
                <td className='widthCellInProject'>
                    <Cell item={props.myProject.updateDates[props.myProject.updateDates.length - 1]} />
                    <CellDescription description='Last Update' />
                </td>

                <td className='actionsProject  iconsProjectInLine' onClick={(e) => e.stopPropagation()}>


                    <img style={myStyleIcons} src={require('../../../../assets/img/shareNew.svg')}
                        className='iconsProject' data-tip data-for="share"
                        onClick={(event) => openShareProject(event)} src={share} />
                    <ReactTooltip className="tooltip-style" data-tip id="share" place="bottom" effect="solid">
                        {title.title_share}
                    </ReactTooltip>
                    <div style={myStyleStripe} className='stripeActionsProject'>|</div>

                    <img style={myStyleIcons} className='mr-1 iconsProject' onClick={(event) => editProject(props.myProject, event)}
                        src={require('../../../../assets/img/pencil-edit.png')} data-tip data-for="edit_" />
                    <ReactTooltip className="tooltip-style" data-tip id="edit_" place="bottom" effect="solid">
                        {title.title_edit}
                    </ReactTooltip>
                    <div style={myStyleStripe} className='stripeActionsProject'>|</div>

                    <img style={myStyleIcons} className='mr-1 iconsProject' onClick={(event) => deleteMyProject(event)}
                        src={require('../../../../assets/img/remove.png')} data-tip data-for="delete" />
                    <ReactTooltip className="tooltip-style" data-tip id="delete" place="bottom" effect="solid">
                        {title.title_delete}
                    </ReactTooltip>        </td>

                {props.fromShare ? <td><img src={userfriend}></img></td> : null}

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