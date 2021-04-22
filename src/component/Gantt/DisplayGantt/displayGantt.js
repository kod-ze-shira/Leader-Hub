
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Gantt from '../gantt';
import { connect } from 'react-redux'
import './displayGantt.css'
import workspaces from '../workspace.json'


function DisplayGantt(props) {

    useEffect(() => {

    }, [props.workspaces, props.indexOfWorkspace, props.indexCurrentProject])

    const cardsInproject = props.workspaces[props.indexOfWorkspace].projects[props.indexCurrentProject]
    const allWorkspace = { workspaces };
    console.log(allWorkspace);
    const allTheWorkspaces = allWorkspace.workspaces.workspaces.projects;
    const allTheWorkspaceFromRedux = props.workspaces
    const theCards = []
    const theTasks = []
    const mone = []


    cardsInproject.cards.map((card) => {
        {
            theCards.push(card);
        }
    })
    console.log("theCards", theCards)

    theCards.map((card, index) => {
        card.tasks.map((task) => {
            let startDate = task.startDate.split("/")[2] + '-' + task.startDate.split("/")[1] + '-' + task.startDate.split("/")[0];
            theTasks.push({ cardName: card.name, priority: "high", id: task._id, text: task.name, start_date: startDate, duration: 5, progress: 0.3 })
        })
        mone.push(index)
    })
    console.log("mone", mone);
    let currDate;

    theTasks.push(

        {
            "id": 2985730,
            "text": "first",
            "start_date": currDate,
            "duration": 3,
            "progress": 0.6,
        })


    console.log("theTasks", theTasks);

    let minYear = "3000-01-01";
    let maxYear = "1000-01-01";


    {
        theTasks.map((item) => {
            if (item) {
                let year = item.start_date.split('-')[0];
                if (year > maxYear.split('-')[0]) {
                    currDate = year
                    console.log("papapap", year);
                    year = year.concat('-01-01')
                    console.log("tttt", year);
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

    currDate = parseInt(currDate)
    currDate = currDate + 2
    currDate = currDate.toString();
    currDate = currDate.concat('-01-01')
    maxYear = currDate;

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
        <div className="body">
            <div>
                <div>
                    <Gantt
                        tasks={data}
                        zoom={currentZoom}
                        onDataUpdated={logDataUpdate}
                    />
                </div>
            </div>
        </div>
    );



}
const mapStateToProps = (state) => {

    return {
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
