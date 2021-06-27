import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import './chart.css';


function MyChart(props) {
    useEffect(() => {
        props.getTaskStatusesOfProject()
    }, [])

    let countTasks = props.workspaces[props.workspacesIndex].projects[props.indexCurrentProject].countTasks
    let readyTasks = props.workspaces[props.workspacesIndex].projects[props.indexCurrentProject].countReadyTasks
    const [cards, setCards] = useState(props.cards)
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
    const optionsSticks = {
        chart: {
            id: "bar"
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
            enabled: false,
            font: function (context) {
                var width = context.chart.width;
                var size = Math.round(width / 32);

                return {
                    weight: 'bold',
                    size: size
                };
            }
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
        plotOptions: {
            bar: {
                columnWidth: '20%',
            },
        }
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
            font: function (context) {
                var width = context.chart.width;
                var size = Math.round(width / 32);

                return {
                    weight: 'bold',
                    size: size
                };
            },
            formatter: function (val) {
                return Math.round(val) + "%"
            },
            offsetX: 0
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'bottom',
                    font: function (context) {
                        var width = context.chart.width;
                        var size = Math.round(width / 32);

                        return {
                            weight: 'bold',
                            size: size
                        };
                    },
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
            type: 'pie'
        },
        series: pieData.map(p => p.val),
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
            }
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
                    offset: -25,
                    minAngleToShowLabel: 10,
                    dropShadow: {
                        enabled: false
                    }
                }
            }
        },
        stroke: {
            show: false
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
            <div className='container chartContainer'>
                <div className="row divProjectStatistics pt-3 ml-2">
                    <h4>Project Statistics</h4>
                </div>
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
                                height="100%"
                            />
                        </div>
                    </div>
                </div>
                <div className='row barAndPie'>
                    <div className='col-6 p-1 '>
                        <div className='chartCol mixed-chart'>
                            {/* bar */}
                            <Chart
                                options={optionsBar}
                                series={seriesBar}
                                type="bar"
                                height="100%"
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