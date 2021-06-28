
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Gantt from '../gantt';
import { connect } from 'react-redux'
import './displayGantt.css'
import workspaces from '../workspace.json'
import { gantt } from 'dhtmlx-gantt';


function DisplayGantt(props) {

    useEffect(() => {

    }, [props.cards])

    const allWorkspace = { workspaces };
    console.log(allWorkspace);

    const theCards = []
    const theTasks = []
    const mone = []


    props.cards.map((card, index) => {
        if (index == 0 & theCards.length > 0)
            theCards.clear()
        {
            theCards.push(card);
        }
    })

    console.log("theCards", theCards)

    function calculateDiff(end, start) {
        let endDate = end.split("/")[1] + "/" + end.split("/")[0] + "/" + end.split("/")[2]
        let startDate = start.split("/")[1] + "/" + start.split("/")[0] + "/" + start.split("/")[2]
        let date1 = new Date(endDate);
        let date2 = new Date(startDate);
        let Difference_In_Time = date1.getTime() - date2.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        return Difference_In_Days
    }
    theCards.map((card, index) => {
        card.tasks.map((task, index1) => {
            let diffDays = calculateDiff(task.dueDate, task.startDate)
            let startDate = task.startDate.split("/")[2] + '-' + task.startDate.split("/")[1] + '-' + task.startDate.split("/")[0];
            let cardName
            let a = theTasks.find(task => task.cardName == card.name)

            if (a)
                cardName = null
            else
                cardName = card.name
            theTasks.push({
                indexCard: index,
                indexTask: index1,
                card: card._id,
                cardName: cardName,
                priority: task.priority ? task.priority.level : "Low",
                id: task._id, text:
                    task.name, start_date:
                    startDate,
                duration: diffDays,
                progress: 0.3,
                milestones: task.milestones
            })
        })
        mone.push(index)
    })
    console.log("mone", mone);
    let currDate;




    console.log("theTasks", theTasks);

    let minYear = "3000-01-01";
    let maxYear = "1000-01-01";


    {
        theTasks.map((item) => {
            if (item.start_date) {
                let year = item.start_date.split('-')[0];
                if (year > maxYear.split('-')[0]) {
                    currDate = year
                    year = year.concat('-01-01')
                    maxYear = year;
                } else if (year < minYear) {
                    minYear = year
                }
                else {
                    return
                }
            }
        })
    }

    currDate = currDate == undefined ?  2023:parseInt(currDate) 
    currDate = currDate + 2
    currDate = currDate.toString();
    currDate = currDate.concat('-01-01')
    maxYear = currDate;
    theTasks.push(
        {
            "indexCard": -1,
            "indexTask": -1,
            "card": -1,
            "cardName": "",
            "priority": "ggg",
            "id": 2985730,
            "text": "first",
            "start_date": currDate ? currDate : '2022-01-01',
            "duration": 3,
            "progress": 0.6,
            "milestones": null


            // "id": 2985730,
            // "text": "first",
            // "start_date": currDate,
            // "duration": 3,
            // "progress": 0.6,
        })
    const state = {
        currentZoom: 'Days',
        messages: []
    };
    const data = {
        data: theTasks,
        links: [
            { id: 1, source: 7, target: 7, type: '0' }
        ]
    };

    const logDataUpdate = (type, action, item, id) => {
        let text = item && item.text ? ` (${item.text})` : '';
        let message = `${type} ${action}: ${id} ${text}`;
        if (type === 'link' && action !== 'delete') {
            message += ` ( source: ${item.source}, target: ${item.target} )`;
        }
        this.addMessage(message);
    }

    const handleZoomChange = (zoom) => {
        this.setState({
            currentZoom: zoom
        });
    }

    const { currentZoom, messages } = state;

    return (
        <div className="bodyGant">
            <div>
                <div>
                    <Gantt
                        tasks={data}
                        zoom={currentZoom}
                        onDataUpdated={logDataUpdate} />
                </div>
            </div>
        </div>
    );



}
const mapStateToProps = (state) => {

    return {
        cards: state.public_reducer.cards,
        workspaces: state.public_reducer.workspaces,
        indexCurrentProject: state.public_reducer.indexCurrentProject,
        indexOfWorkspace: state.public_reducer.indexOfWorkspace,
        project: state.project_reducer.project
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayGantt)
