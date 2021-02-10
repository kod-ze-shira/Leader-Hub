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
function ViewProject(props) {

    function detailsProject() {
        set_getProjectById(false);
    }
    const routeToCards = (e) => {
        let idProject = props.myProject._id;
        props.history.push("/" + props.user + "/projectPlatform/" + idProject)
    }
    // const div = styled.div`
    // background: #32AABA
    // `
    const [getProjectById, set_getProjectById] = useState(true);
    const [viewTasks, setViewTasks] = useState(false)
    let complited = 20;
    complited = complited < 30 ? '#29EFFF' : complited < 60 ? '#32AABA' : 'black'
    return (
        <>
            <tr className='projectForWorkspace' onClick={(e) => routeToCards(e)}>
                <td >
                    <span class="dot" style={{ 'background-color': props.myProject.color }} ></span>
                    <span style={{ 'color': props.myProject.color }}>
                        {props.myProject.name}</span>
                    {/* <span class='stripeProject'
                        // style={{ 'background-color': props.project.color }}></span>
                        style={{ 'background-color': props.myProject.color }}></span> */}
                </td>
                <td>
                    <Cell item={props.myProject.dueDate} />
                    <CellDescription description='Due date' />
                </td>
                <td>
                    <Cell item={props.myProject.cards.length ? props.myProject.cards.length : "0"} />
                    <CellDescription description='card' />
                </td>
                <td>
                    <span className='task'>
                        <span style={{ 'font-weight': 'bold' }}>
                            7</span>
                        <span>
                            /20</span>
                    </span>
                    <CellDescription description='Task' />
                </td>
                <td>

                    <div className='divProgress'>
                        <div class="progressProject" >
                            <div role="progressbar" class="progressProject-bar" style={{ "width": 20 + "%", background: complited }}
                                aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        {/* <ProgressBar now={60} style={{ "height": "5px", "width": "54%" }} /> */}
                    </div>
                    <CellDescription description='50% comlete' />
                </td>
                <td style={{ 'text-align': 'center' }}>
                    <TeamView marginTeam='' imgTeam='https://images1.calcalist.co.il/PicServer3/2019/12/12/954216/1LM.jpg' />
                    <TeamView marginTeam='marginTeam' imgTeam='https://images1.calcalist.co.il/PicServer3/2019/12/12/954216/1LM.jpg' />
                    <TeamView marginTeam='marginTeam' numberTeams={'+' + 3} />

                    <CellDescription description='Team' />
                </td>
                <td>
                    <Cell item={props.myProject.updateDates.length ? props.myProject.updateDates[props.myProject.updateDates.length - 1] : '12/12/2023'} />
                    <CellDescription description='Last update' />
                </td>



            </tr >

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

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewProject))