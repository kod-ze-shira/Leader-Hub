import $ from 'jquery';
import React from 'react';
import * as mdb from 'mdb-ui-kit'; // lib
import { Input } from 'mdb-ui-kit'; // module
import { Bar, Doughnut, Line, Scatter } from 'react-chartjs-2';
import './chart.css'

export default function Chart(props) {

    //doughnut
    var data = {
        datasets: [{
            data: [10, 20],
            backgroundColor: ["blue", "lightblue"],
            hoverBackgroundColor: ["darkblue", "#5AD3D1"]
        }],
        labels: [
            'Complete',
            'Incomplete'
        ]
    }

    //graph
    const graphData = {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
            {
                label: 'Complete',
                data: [12, 19, 3, 5, 2, 3],
                fill: true,
                backgroundColor: 'blue',
                borderColor: "blue",
                yAxisID: 'y-axis-1',
            },
            {
                label: 'Imcomplete',
                data: [1, 2, 1, 1, 2, 2],
                fill: true,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
                yAxisID: 'y-axis-2',
            },
        ],
    };

    //balls graph
    const ballsData = {
        datasets: [{
            label: 'Completed',
            data: [{
                x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }, {
                x: 0.5,
                y: 5.5
            }],
            backgroundColor: 'blue'
        }],
    };
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    return (
        <>
            <div className="container">
                <div className="row row1">
                    <div className="col-4"></div>
                    <div className="col-4"></div>
                    <div className="col-4"></div>
                    <div className="col-4"></div>
                </div>
                <div className="row row2">
                    <div className="col-6">
                        <Bar
                            data={data}
                            width={100}
                            height={50}
                            options={{ maintainAspectRatio: false }}
                        />
                    </div>
                    <div className="col-6">
                        <div className="col-7">
                            <Doughnut
                                data={data}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="row row3">
                    <div className="col-6">
                    <Scatter data={ballsData} options={options} />
                    </div>
                    <div className="col-6">
                        <Line
                            data={graphData}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Average Rainfall per month',
                                    fontSize: 20
                                },
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}