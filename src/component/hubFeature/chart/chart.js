import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    AreaSeries,
    LineSeries,
    SplineSeries,
    BarSeries,
    Title,
    Tooltip,
    PieSeries,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
import { Animation } from '@devexpress/dx-react-chart';
import { Palette } from '@devexpress/dx-react-chart';
import { actions } from '../../../redux/actions/action'
import './chart.css'

function MyChart(props) {
    useEffect(() => {
        debugger
        props.getTaskStatusesOfProject()
        console.log(props.taskStatusesOfProject);
    }, [])

    const [countTasks, setCountTasks] = useState(props.workspaces[props.workspacesIndex].projects[props.indexCurrentProject].countTasks)
    const [readyTasks, setReadyTasks] = useState(props.workspaces[props.workspacesIndex].projects[props.indexCurrentProject].countReadyTasks)
    const [cards, setCards] = useState(props.cards)
    const schemeSet = ['#1FB9C1', '#6CBAFF']
    const barData = [];
    const pieData = [{ category: 'Completed', val: readyTasks / countTasks}, { category: 'Incompleted', val: 1 - readyTasks / countTasks }];
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
            debugger
            let percent = status.count / countTasks * 100;
            let color = props.cards[props.indexCurrentCard].tasks[props.indexCurrentTask].status.color;
            console.log(color);
            barData.push({ name: status.name, percent: percent, color: color })
        })
    }

    return (
        <>
            <Paper style={{ width: '100%' }}>
                <div className='container'>
                    {/* <div className='row'>
                        <div className='col'>
                            <h1></h1>
                        </div>
                    </div> */}
                    <div className='row'>
                        <div className='col-3 p-1'>
                            <div className='chartCol p-2'><b>Completed tasks</b><br /><b className='bParam'>{readyTasks}</b></div>
                        </div>
                        <div className='col-3 p-1'>
                            <div className='chartCol p-2'><b>Incomplete tasks</b><br /><b className='bParam'>{countTasks - readyTasks}</b></div>
                        </div>
                        <div className='col-3 p-1'>
                            <div className='chartCol p-2'><b>Overdue tasks</b><br /><b className='bParam'>{props.overdueTasks}</b></div>
                        </div>
                        <div className='col-3 p-1'>
                            <div className='chartCol p-2'><b>Total tasks </b><br /> <b className='bParam'>{countTasks}</b></div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 p-1'>
                            <div className='chartCol'>
                                {/* sticks */}
                                <Chart
                                    data={sticksData}
                                    height={350}
                                >
                                    <ArgumentAxis />
                                    <ValueAxis/>
                                    <BarSeries
                                        valueField="tasks"
                                        argumentField="name"
                                        barWidth={0.2}
                                    />
                                    <Chart.Label/>
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
                                >
                                    <ArgumentAxis />
                                    <ValueAxis />
                                    <BarSeries
                                        valueField="percent"
                                        argumentField="name"
                                        // fill={barData.color}
                                        barWidth={0.2}
                                    />
                                    <Title text="All tasks by status" />
                                    <Tooltip />
                                </Chart>
                                {/* <img src={require('../../img/Group22306.png')} /> */}
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