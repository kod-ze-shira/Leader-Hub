import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    BarSeries,
    Title,
    Tooltip,
    PieSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
import { Animation } from '@devexpress/dx-react-chart';
import { Palette } from '@devexpress/dx-react-chart';
import { actions } from '../../../redux/actions/action'
import Members from '../Overview/members/members'
import './chart.css'
import $ from 'jquery';

function MyChart(props) {

    let countTasks = props.workspaces[props.workspacesIndex].projects[props.indexCurrentProject].countTasks
    let readyTasks = props.workspaces[props.workspacesIndex].projects[props.indexCurrentProject].countReadyTasks
    const [cards, setCards] = useState(props.cards)
    const schemeSet = ['#38b1b5', '#99e2e5']
    const barData = [];
    const pieData = [{ category: 'Completed', val: readyTasks / countTasks, color: '#38b1b5' }, { category: 'Incompleted', val: 1 - readyTasks / countTasks, color: '#99e2e5' }];
    const sticksData = []

    if (cards) {
        cards.map(c => {
            let ta = []
            c.tasks.map(t => ta.push(t))
            let notDone = ta.filter(t => t.complete === false)
            sticksData.push({ name: c.name, tasks: notDone.length })
        })
    }
    if (props.taskStatusesOfProject) {
        props.taskStatusesOfProject.map((status) => {
            let percent = status.count / countTasks * 100;
            let color = props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status.color;
            console.log(color);
            barData.push({ name: status.name, percent: percent, color: status.color })
        })

        // barData.map((rect, index) => {


        // })
    }
    let colors = []
    barData.map(i => {
        colors.push(i.color)
    })


    return (
        <>

            <Paper style={{ width: '100%'}}>
                <div className='container'>
                    {/* <div className='row'>
                        <div className='col'>
                            <h1></h1>
                        </div>
                    </div> */}
                    <div className='row'>
                        <div className='col-3 p-1'>
                            <div className='chartCol p-2 h100'><b>Completed tasks</b><br /><b className='bParam'>{readyTasks}</b></div>
                        </div>
                        <div className='col-3 p-1'>
                            <div className='chartCol p-2 h100'><b>Incomplete tasks</b><br /><b className='bParam'>{countTasks - readyTasks}</b></div>
                        </div>
                        <div className='col-3 p-1'>
                            <div className='chartCol p-2 h100'><b>Overdue tasks</b><br /><b className='bParam'>{props.overdueTasks}</b></div>
                        </div>
                        <div className='col-3 p-1'>
                            <div className='chartCol p-2 h100'><b>Total tasks </b><br /> <b className='bParam'>{countTasks}</b></div>
                        </div>
                    </div>
                    <div className='row' >
                        <div className='col-12 p-1'>
                            <div className='chartCol'>
                                {/* sticks */}
                                <Chart
                                    data={sticksData}
                                    height={300}
                                >
                                    <ArgumentAxis />
                                    <ValueAxis tickSize={10} />
                                    <BarSeries
                                        valueField="tasks"
                                        argumentField="name"
                                        barWidth={0.2}
                                        color='#99e2e5'
                                    />
                                    <Chart.Label />
                                    <Title text="Incomplete tasks by card" />
                                    <Tooltip />
                                </Chart>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6 p-1 '>
                            <div className='chartCol'>
                                {/* bar */}
                                <Chart
                                    data={barData}
                                    height={300}
                                >
                                    <ArgumentAxis />
                                    <ValueAxis tickSize={10} />
                                    <BarSeries
                                        valueField="percent"
                                        argumentField="name"
                                        barWidth={0.2}
                                        color={colors[3]}
                                    />
                                    <Title text="All tasks by status" />
                                    <Tooltip />
                                </Chart>

                                {/* colors palette */}
                                <div className='colorDiv d-flex justify-content-between p-5'>
                                    {barData.map(data => (
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div
                                                key={data.name}
                                                style={{ backgroundColor: data.color, width: '3vh', height: '3vh' }}
                                            />
                                            <p className='colorName'>{data.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='col-6 p-1'>
                            <div className='chartCol'>
                                {/* pie */}
                                <Chart
                                    data={pieData}
                                    height={300}
                                >
                                    <Palette scheme={schemeSet} />
                                    <PieSeries
                                        valueField="val"
                                        argumentField="category"
                                    />
                                    <Title text="All tasks by completion status" />
                                    <EventTracker />
                                    <Tooltip />
                                    <Animation />
                                </Chart>
                                {/* colors palette */}
                                <div className='colorDiv d-flex justify-content-between p-5'>
                                    {pieData.map(data => (
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div
                                                key={data.category}
                                                style={{ backgroundColor: data.color, width: '3vh', height: '3vh' }}
                                            />
                                            <p className='colorName'>{data.category}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        workspacesIndex: state.public_reducer.indexOfWorkspace,
        workspaces: state.public_reducer.workspaces,
        indexCurrentProject: state.public_reducer.indexCurrentProject,
        cards: state.public_reducer.cards,
        indexCurrentTask: state.public_reducer.indexCurrentTask,
        indexCurrentCard: state.public_reducer.indexCurrentCard,
        overdueTasks: state.overview_reducer.overdueTasks,
        taskStatusesOfProject: state.overview_reducer.taskStatusesOfProject
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getTaskStatusesOfProject: () => dispatch(actions.getTaskStatusesOfProject())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyChart)