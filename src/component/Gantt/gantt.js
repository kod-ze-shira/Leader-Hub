import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import './gantt.css';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import '../Gantt/gantt.css';
import { LinearProgress } from '@material-ui/core';

export default class Gantt extends Component {
    constructor(props) {
        debugger
        super(props);
        this.initZoom();
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
        // const onDataUpdated = this.props.onDataUpdated;
    }
    componentDidMount() {

        gantt.templates.task_text = function (start, end, task) {
            if (task.progress > 1) {
                return task.text;
            }
            else {
                return task.text + " " + `<b>${(task.progress) * 100}%</b>`;
            }
        };
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
                title: task.text + " " + (task.progress) * 100 + "%",


                text: `<b>Start date: </b>` + task.start_date.toISOString().replace('-', '/').split('T')[0].replace('-', '/') + `<br><br/>` + `<b>End date: </b>` + eDate,
                buttons: [{ label: "Close", css: "link_cancel_btn", value: "Close" }],
                callback: function (result) {
                }
            });
        });

        gantt.plugins({
            tooltip: true,
        });
        gantt.attachEvent("onBeforeTaskDisplay", function (id, task) {
            if (task.priority == "high") {
                return true;
            }
            return false;
        });
        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        const { tasks } = this.props;
        gantt.init(this.ganttContainer);
        this.initGanttDataProcessor();
        gantt.parse(tasks);

        gantt.templates.scale_cell_class = function (date) {
            return "weekend";
        }
        gantt.templates.task_class = function (start, end, task) {

            if (task.progress > 0 && task.progress < 1) {
                return task.class = "pinkBorder";
            }
            if (task.progress === 1) {
                return task.class = "greenBorder vv";
            }
            else {
                return task.class = "orangeBorder";
            }
        };
        gantt.templates.tooltip_date_format = function (date) {
            var formatFunc = gantt.date.date_to_str("%Y-%m-%d");
            return formatFunc(date);
        };

        gantt.attachEvent("onGridResizeEnd", function (old_width, new_width) {

            gantt.message("Grid is now <br>" + new_width + "</br>px width");
            return true;
        });

        function myFunc(task) {
            if (task.cardName)
                return `<div class='important'><i class="material-icons">
                arrow_drop_down
                <br/>

    </i>${task.cardName}</div>`;
        }
        gantt.config.columns = [
            { id: "c_1", name: "cardName", label: "Card name", width: 200, template: myFunc },
        ];
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
                    <div ref={(input) => { this.ganttContainer = input }}
                        style={{ width: '100%', height: '80vh' }}>
                    </div>
                </center>
            </>
        );
    }
}