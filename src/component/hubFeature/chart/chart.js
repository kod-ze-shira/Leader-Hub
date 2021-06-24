import { Animation, EventTracker, Palette, ValueScale } from '@devexpress/dx-react-chart';
// import {
//     ArgumentAxis,
//     BarSeries,
// Chart,
//     PieSeries,
//     Title,
//     Tooltip,
//     ValueAxis
// } from '@devexpress/dx-react-chart-material-ui';
// import Paper from '@material-ui/core/Paper';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import './chart.css';
import Chart from "react-apexcharts";


function MyChart(props) {
    useEffect(() => {
        props.getTaskStatusesOfProject()
    }, [])

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
            barData.push({ name: status.name, percent: percent, color: status.color })
        })

        // setTimeout(() => {
        //     barData.map((item, index) => {
        //         $(`.chart rect:eq(${index + 1})`).css('fill', item.color);
        //     })
        // }, 100)
    }
    // const labelFunc = () => {
    //     document.getElementsByTagName("rect")[1].innerHTML +='<label id="lbl">tzipi</label>'
    //     // document.getElementsByTagName("div")[76].innerHTML +='<label id="lbl">tzipi</label>'
    // }   
    const optionsSticks = {
        chart: {
            id: "bar",
            height: 100
        },
        xaxis: {
            categories: sticksData.map(bd => bd.name)
        },
        yaxis: {
            title: {
                text: 'Task count',
                rotate: -90,
                offsetX: 5,
                offsetY: 5,
                style: {
                    color: '#8d8e90',
                    opacity: 0.5,
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-title',
                },
            },
        },
        dataLabels: {
            enabled: false
        },
        layout: {
            padding: {
                left: 50,
                right: 130,
                top: 50,
                bottom: 50
            }
        },
        title: {
            text: 'Incomplete tasks by card',
            align: 'left',
            floating: false,

            style: {
                fontSize: '16px',
                margin: 20,
                fontWeight: 'bold'
            },
        },
    }
    const seriesSticks = [
        {
            name: "sticks",
            data: sticksData.map(bd => bd.tasks)
        }
    ]
    const optionsBar = {
        chart: {
            id: "bar"
        },
        xaxis: {
            categories: barData.map(bd => bd.name)
        },
        yaxis: { show: false },
        colors: barData.map(bd => bd.color),
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                colors: ['#fff'],
            },
            formatter: function (val) {
                return Math.round(val) + "%"
            },
            offsetX: 0
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'bottom'
                },
                distributed: true,
            }
        },
        grid: {
            show: false
        },
        title: {
            text: 'All tasks by status',
            align: 'left',
            floating: false,

            style: {
                fontSize: '16px',
                margin: 20,
                fontWeight: 'bold'
            },
        },
    }
    const seriesBar = [
        {
            name: "bar",
            data: barData.map(bd => bd.percent)
        }
    ]
    const optionsPie = {
        chart: {
            type: 'pie',
        },
        series: pieData.map(p => p.val),
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        chartOptions: {
            labels: pieData.map(p => p.category),
          },
        colors: pieData.map(p => p.color),
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                colors: ['#fff']
            },
            formatter: function (val) {
                return Math.round(val) + "%"
            },
            font: function (context) {
                var avgSize = Math.round((context.chart.height + context.chart.width) / 2);
                var size = Math.round(avgSize / 32);
                size = size > 12 ? 12 : size; // setting max limit to 12
                return {
                    size: size,
                    weight: 'bold'
                };
            },
        },
        labels: pieData.map(p => p.category),
        plotOptions: {
            pie: {
                startAngle: 0,
                endAngle: 360,
                expandOnClick: true,
                offsetX: 0,
                offsetY: 0,
                customScale: 0.8,
                dataLabels: {
                    offset: 0,
                    minAngleToShowLabel: 10
                }
            }
        },
        stroke: {
            show:false
        },
        title: {
            text: 'All tasks by completion status',
            align: 'left',
            floating: false,
            style: {
                fontSize: '16px',
                margin: 20,
                fontWeight: 'bold'
            },
        },
    }
    const seriesPie = pieData.map(p => p.val)
    return (
        <>
            <div className='container'>
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
                <div className='row sticks' >
                    <div className='col-12 p-1'>
                        <div className='chartCol'>
                            {/* sticks */}
                            <Chart
                                options={optionsSticks}
                                series={seriesSticks}
                                type="bar"
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 p-1 '>
                        <div className='chartCol mixed-chart'>
                            {/* bar */}
                            <Chart
                                options={optionsBar}
                                series={seriesBar}
                                type="bar"
                            />
                        </div>
                    </div>
                    <div className='col-6 p-1'>
                        <div className='chartCol'>
                            {/* pie */}
                            <Chart
                                options={optionsPie}
                                series={seriesPie}
                                type="pie"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <Paper style={{ width: '100%' }}>
                <div className='container'>
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
                            <div className='chartCol'> */}
            {/* sticks */}
            {/* <Chart
                                    data={sticksData}
                                    height={300}
                                >
                                    <ArgumentAxis />
                                    <ValueAxis allowDecimals={false} />
                                    <BarSeries
                                        valueField="tasks"
                                        argumentField="name"
                                        barWidth={0.2}
                                        color='#99e2e5'
                                    />
                                    <Title text="Incomplete tasks by card" />
                                    <Tooltip />
                                </Chart>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6 p-1 '>
                            <div className='chartCol'> */}
            {/* bar */}
            {/* <Chart className='chart'
                                    data={barData}
                                    height={300}
                                > */}
            {/* <ValueAxis tickSize={10} /> */}
            {/* <BarSeries
                                        valueField="percent"
                                        argumentField="name"
                                        barWidth={0.7}
                                    />
                                    <Title text="All tasks by status" />

                                    <Tooltip />
                                </Chart> */}

            {/* colors palette */}
            {/* <div className='colorDiv d-flex justify-content-between p-5 mx-2'>
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
                            <div className='chartCol'> */}
            {/* pie */}
            {/* <Chart
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
                                </Chart> */}
            {/* colors palette */}
            {/* <div className='colorDiv d-flex justify-content-between p-5'>
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
            </Paper> */}
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