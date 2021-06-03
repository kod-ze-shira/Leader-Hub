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
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
import { Animation } from '@devexpress/dx-react-chart';
import { Palette } from '@devexpress/dx-react-chart';
import './chart.css'

// export default function MyChart() {

//doughnut

// var data = {
//     datasets: [{
//         data: [10, 20],
//         backgroundColor: ["blue", "lightblue"],
//         hoverBackgroundColor: ["darkblue", "#5AD3D1"]
//     }],
//     labels: [
//         'Complete',
//         'Incomplete'
//     ]
// }

//graph
// const graphData = {
//     labels: ['1', '2', '3', '4', '5', '6'],
//     datasets: [
//         {
//             label: 'Complete',
//             data: [12, 19, 3, 5, 2, 3],
//             fill: true,
//             backgroundColor: 'blue',
//             borderColor: "blue",
//             yAxisID: 'y-axis-1',
//         },
//         {
//             label: 'Imcomplete',
//             data: [1, 2, 1, 1, 2, 2],
//             fill: true,
//             backgroundColor: 'rgb(54, 162, 235)',
//             borderColor: 'rgba(54, 162, 235, 0.2)',
//             yAxisID: 'y-axis-2',
//         },
//     ],
// };

// //balls graph
// const ballsData = {
//     datasets: [{
//         label: 'Completed',
//         data: [{
//             x: -10,
//             y: 0
//         }, {
//             x: 0,
//             y: 10
//         }, {
//             x: 10,
//             y: 5
//         }, {
//             x: 0.5,
//             y: 5.5
//         }],
//         backgroundColor: 'blue'
//     }],
// };
// const options = {
//   scales: {
//     yAxes: [
//       {
//         ticks: {
//           beginAtZero: true,
//         },
//       },
//     ],
//   },
// };

//     return (
//         <>
//             <div className="container">
//                 <div className="row row1">
//                     <div className="col-4"></div>
//                     <div className="col-4"></div>
//                     <div className="col-4"></div>
//                     <div className="col-4"></div>
//                 </div>
//                 <div className="row row2">
//                     <div className="col-6">
//                         {/* <Bar
//                             data={data}
//                             width={100}
//                             height={50}
//                             options={{ maintainAspectRatio: false }}
//                         /> */}
//                     </div>
//                     <div className="col-6">
//                         <div className="col-7">
//                             {/* <Doughnut
//                                 data={data}
//                                 options={{
//                                     responsive: true,
//                                     maintainAspectRatio: true,
//                                 }}
//                             /> */}
//                         </div>
//                     </div>
//                 </div>
//                 {/* <div className="row row3">
//                     <div className="col-6">
//                     <Scatter data={ballsData} options={options} />
//                     </div>
//                     <div className="col-6">
//                         <Line
//                             data={graphData}
//                             options={{
//                                 title: {
//                                     display: true,
//                                     text: 'Average Rainfall per month',
//                                     fontSize: 20
//                                 },
//                                 legend: {
//                                     display: true,
//                                     position: 'right'
//                                 }
//                             }}
//                         />
//                     </div>
//                 </div> */}
//             </div>
//         </>
//     )
// }

const generateData = (start, end, step) => {
    const data = [];
    for (let i = start; i < end; i += step) {
        data.push({ splineValue: Math.sin(i) / i, lineValue: ((i / 15) ** 2.718) - 0.2, argument: i });
    }
    return data;
};
function MyChart(props) {
    useEffect(() => {
        if (props.workspaces.length == 0)
            props.getAllWorkspaces()
    }, [])
    // const data = React.useMemo(
    //     () => [
    //         {
    //             label: 'Series 1',
    //             data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
    //         },
    //         {
    //             label: 'Series 2',
    //             data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
    //         }
    //     ],
    //     []
    // )

    // const axes = React.useMemo(
    //     () => [
    //         { primary: true, type: 'time', position: 'bottom' },
    //         { type: 'linear', position: 'left' }
    //     ],
    //     []
    // )


    // const { data2, randomizeData } = useChartConfig({
    //     series: 10
    //   })
    //   const series = React.useMemo(
    //     () => ({
    //       showPoints: false
    //     }),
    //     []
    //   )
    //   const axes2 = React.useMemo(
    //     () => [
    //       { primary: true, type: 'time', position: 'bottom' },
    //       { type: 'linear', position: 'left' }
    //     ],
    //     [])
    // $(function () {
    //     var ctx = document.getElementById('myChart').getContext('2d');
    //     var myChart = new Chart(ctx, {
    //         type: 'bar',
    //         data: {
    //             labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //             datasets: [{
    //                 label: '# of Votes',
    //                 data: [12, 19, 3, 5, 2, 3],
    //                 backgroundColor: [
    //                     'rgba(255, 99, 132, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(255, 206, 86, 0.2)',
    //                     'rgba(75, 192, 192, 0.2)',
    //                     'rgba(153, 102, 255, 0.2)',
    //                     'rgba(255, 159, 64, 0.2)'
    //                 ],
    //                 borderColor: [
    //                     'rgba(255, 99, 132, 1)',
    //                     'rgba(54, 162, 235, 1)',
    //                     'rgba(255, 206, 86, 1)',
    //                     'rgba(75, 192, 192, 1)',
    //                     'rgba(153, 102, 255, 1)',
    //                     'rgba(255, 159, 64, 1)'
    //                 ],
    //                 borderWidth: 1
    //             }]
    //         },
    //         options: {
    //             scales: {
    //                 y: {
    //                     beginAtZero: true
    //                 }
    //             }
    //         }
    //     })
    // })
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
    const sticksData = [];
    cards.map(c => {
        let ta = []
        c.tasks.map(t => ta.push(t))
        let notDone = ta.filter(t => t.complete === false)
        sticksData.push({ name: c.name, tasks: notDone.length })
    })
    
    return (
        <>
            <Paper>
                <div className='container'>
                    <div className='row'>
                        <div className='col-3 p-1'>
                            <div className='chartCol p-2'><b>Completed tasks</b><br /><b className='bParam'>{readyTasks}</b></div>
                        </div>
                        <div className='col-3 p-1'>
                            <div className='chartCol p-2'><b>Incomplete tasks</b><br /><b className='bParam'>{countTasks-readyTasks}</b></div>
                        </div>
                        <div className='col-3 p-1'>
                            <div className='chartCol p-2'><b>Overdue tasks</b><br /><b className='bParam'>1</b></div>
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
                                    <ArgumentAxis tickSize={10} />
                                    <ValueAxis />
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
    }
}

export default connect(mapStateToProps)(MyChart)