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
import './chart.css'

function MyChart(props) {
    useEffect(() => {
        if (props.workspaces.length == 0)
            props.getAllWorkspaces()
    }, [])

    const [countTasks, setCountTasks] = useState(props.workspaces[props.workspacesIndex].projects[props.indexCurrentProject].countTasks)
    const [readyTasks, setReadyTasks] = useState(props.workspaces[props.workspacesIndex].projects[props.indexCurrentProject].countReadyTasks)
    const [cards, setCards] = useState(props.cards)

    const barData = [
        // { status: 'Open', percent: 2.018 },
        { status: 'Done', percent: `${readyTasks}%`, color: '#5ddae0' },
        { status: 'At work', percent: `${100 - readyTasks}%`, color: '#99e2e5' }
    ];
    const pieData = [{ category: 'Completed', val: `${readyTasks / countTasks}` }, { category: 'Incompleted', val: `${1 - readyTasks / countTasks}` }];
    const schemeSet = ['#1FB9C1', '#6CBAFF']
    const sticksData = []
    cards.map(c => {
        let ta = []
        c.tasks.map(t => ta.push(t))
        let notDone = ta.filter(t => t.complete === false)
        sticksData.push({ name: c.name, tasks: notDone.length })
    })

    return (
        <>
            <Paper style={{ width: '100%' }}>
                <div className='container'>
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
                                >
                                    <ArgumentAxis/>
                                    <ValueAxis tickInterval={10}/>
                                    <BarSeries
                                        valueField="tasks"
                                        argumentField="name"
                                        barWidth={0.2}
                                    />
                                    <Title text="Incomplete tasks by card" />
                                    {/* <EventTracker /> */}
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
                                    <BarSeries
                                        valueField="percent"
                                        argumentField="status"
                                        // fill={barData.color}
                                        barWidth={0.2}
                                    />
                                    <Title text="all tasks by status" />
                                    {/* <EventTracker /> */}
                                    <Tooltip />
                                </Chart>
                                <img src={require('../../img/Group22306.png')} />
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
                                <div className='colorDiv d-flex justify-content-between p-5'>
                                    <div>
                                        <div style={{ backgroundColor: '#1FB9C1', width: '3vw', height: '3vw' }}></div>
                                        <p> Completed</p>
                                    </div>
                                    <div>
                                        <div style={{ backgroundColor: '#6CBAFF', width: '3vw', height: '3vw' }}></div>
                                        <p> Incomplete</p>
                                    </div>
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
        indexCurrentCard: state.public_reducer.indexCurrentCard,
        overdueTasks: state.overview_reducer.overdueTasks
    }
}

export default connect(mapStateToProps)(MyChart)