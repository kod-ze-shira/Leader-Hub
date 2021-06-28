import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import './gantt.css';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import '../Gantt/gantt.css';
import { LinearProgress } from '@material-ui/core';
import { actions } from '../../redux/actions/action'
import store from '../../redux/Store/Store'

export default class Gantt extends Component {
    constructor(props) {
        super(props);
        this.initZoom();
        this.state = { endDate: 0, startDate: 0 };
    }

    dataProcessor = null;

    initZoom() {
        gantt.ext.zoom.init({
            levels: [
                {
                    name: 'Days',
                    scale_height: 60,
                    min_column_width: 40,

                    scales: [

                        { unit: "month", step: 1, format: "%F %Y" },
                        { unit: "day", step: 1, format: "%j" }
                    ]
                },
            ]
        });
    }

    setZoom(value) {
        gantt.ext.zoom.setLevel(value);
    }
    initGanttDataProcessor() {
        const onDataUpdated = this.props.onDataUpdated;
    }
    componentDidUpdate() {
        console.log(this.state.endDate);
        if (this.props.tasks) {

            gantt.clearAll();
            gantt.config.xml_date = "%Y-%m-%d %H:%i";
            const { tasks } = this.props;

            gantt.config.autoscroll = true;
            // gantt.config.autoscroll_speed = 50;
            gantt.init(this.ganttContainer);
            this.initGanttDataProcessor();
            gantt.parse(tasks);

        }
    }

    componentDidMount() {
        gantt.plugins({
            tooltip: true,
            marker: true
        });

        var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
        var markerId = gantt.addMarker({
            start_date: new Date(),
            css: "today",
            text: "Now",
            title: dateToStr(new Date())
        });
        gantt.getMarker(markerId);


        gantt.templates.task_text = function (start, end, task) {

            if (task.progress > 1) {
                // return task.text;
            }
            else {
                // return task.text + " " + `<b>${(task.progress) * 100}%</b>`;
            }
            if (task.milestones) {
                var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
                var markerId = gantt.addMarker({
                    start_date: task.end_date,
                    css: "milestones_",
                    text: document.createAttribute("img"),
                    // text: "milestone",
                    title: dateToStr(task.end_date)
                });
                gantt.getMarker(markerId);
            }
            return task.text;
        };

        gantt.templates.task_class = function (start, end, task) {
            // if (task.progress > 0 && task.progress < 1) {
            //     // return task.class = "pinkBorder";
            // }
            // if (task.progress === 1) {
            //     // return task.class = "greenBorder vv";
            // }
            // else {
            //     // return task.class = "orangeBorder";
            // }
            // return task.class = "orangeBorder";

            if (task.priority === "High") {
                return task.class = "redBorder";
            }
            if (task.priority === "Low") {
                return task.class = "yellowBorder";
            }
            else {
                return task.class = "orangeBorder";
            }
        };
        gantt.config.columns = [
            { id: "c_1", name: "cardName", label: "Card name", width: 200, template: myFunc },
        ];
        gantt.templates.gantt_cell = function (start, end, task) {
            return task.text = "knkl";
        }
        gantt.templates.grid_row_class = function (columnName, column) {
            return "ll"
        };

        gantt.attachEvent("onTaskDblClick", function (id, e, text) {
            var task = gantt.getTask(id);
            var date = task.date;
            var eDate = gantt.calculateEndDate({ start_date: task.start_date, duration: task.duration, task: task }).toISOString().replace('-', '/').split('T')[0].replace('-', '/');
            // alert(eDate);

            gantt.modalbox({
                // title: task.text + " " + (task.progress) * 100 + "%",
                title: task.text,
                text: `<b>Start date: </b>` + task.start_date.toISOString().replace('-', '/').split('T')[0].replace('-', '/') + `<br><br/>` + `<b>End date: </b>` + eDate,
                buttons: [{ label: "Close", css: "link_cancel_btn", value: "Close" }],
                callback: function (result) {
                }
            });

        });

        // gantt.attachEvent("onBeforeTaskDisplay", function (id, task) {
        //     if (task.priority == "high") {
        //         return true;
        //     }
        //     return false;

        // });
        gantt.attachEvent("onAfterTaskUpdate", function (id, task) {

            let a = new Date(task.end_date)
            a.setDate(a.getDate() + 1);
            let endDate = JSON.stringify(a)
            let ed = JSON.parse(endDate)
            let newEndDate = ed.split("-")[2][0]
                + ed.split("-")[2][1] + '/' + ed.split("-")[1] + '/' + ed.split("-")[0];

            let b = new Date(task.start_date)
            b.setDate(b.getDate() + 1);
            let startDate = JSON.stringify(b)
            let sd = JSON.parse(startDate)

            let newStartDate = sd.split("-")[2][0]
                + sd.split("-")[2][1] + '/' + sd.split("-")[1] + '/' + sd.split("-")[0];

            let editTaskInRedux = {
                "_id": id,
                "dueDate": newEndDate,
                "startDate": newStartDate
            }

            store.dispatch(actions.editTask(editTaskInRedux))
            console.log(editTaskInRedux);

            store.dispatch(actions.setDateTaskFromGantt({ ...editTaskInRedux, card_id: task.card }))
        });


        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        const { tasks } = this.props;
        gantt.init(this.ganttContainer);
        this.initGanttDataProcessor();
        gantt.parse(tasks);

        gantt.templates.scale_cell_class = function (date) {
            return "weekend";
        }

        // gantt.init(this.ganttContainer);


        gantt.templates.tooltip_date_format = function (date) {
            var formatFunc = gantt.date.date_to_str("%Y-%m-%d");
            return formatFunc(date);
        };

        gantt.attachEvent("onGridResizeEnd", function (old_width, new_width) {

            gantt.message("Grid is now <br>" + new_width + "</br>px width");
            return true;
        });

        function myFunc(task) {
            if (task.cardName) {
                return (`<div class='important'>
                <i class="material-icons">
                arrow_drop_down
                </i> 
               ${task.cardName}
                </div>`);
            }
        }

        var data = {
            tasks: [
                { id: "p_1", text: "one card", start_date: "01-04-2020", duration: 18 },
                {
                    id: "t_1", text: "Task #1", start_date: "02-04-2020", duration: 8,
                    parent: "p_1"
                }
            ]
        };
        gantt.open("p_1");
    }
    state = {
        background: '#fff',
        newDatesInTask: {}
    };


    handleChangeComplete = (color) => {

        this.setState({ background: color.hex });
        document.documentElement.style.setProperty('--color1', color)
    };

    componentWillUnmount() {

        if (this.dataProcessor) {
            this.dataProcessor.destructor();
            this.dataProcessor = null;
        }
    }

    render() {
        const { zoom } = this.props;
        this.setZoom(zoom);
        return (
            <>
                <center>
                    <div ref={(input) => {
                        this.ganttContainer = input;
                    }}
                        style={{ width: '100%', height: '80vh' }}
                    >
                    </div>
                </center>
            </>
        );
    }
}
