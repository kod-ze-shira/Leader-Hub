import React from 'react'
import TimeLine from 'react-gantt-timeline'
import './gantt.css'
export default function GanttDesign() {




    let d1 = new Date();
    let d2 = new Date();
    d2.setDate(d2.getDate() + 5);
    let d3 = new Date();
    d3.setDate(d3.getDate() + 8);
    let d4 = new Date();
    d4.setDate(d4.getDate() + 20);

    let data = [{
        id: 1, start: d1, end: d2, name: 'Demo Task 1', style: { "border": "red 1px solid !important" }
    },
    { id: 2, start: d3, end: d4, name: 'Demo Task 2' }]
    let links = [{ id: 1, start: 1, end: 2 },
    { id: 2, start: 1, end: 3 }]
    return (
        <>
            <div className="time-line-container">
                <TimeLine data={data} links={links} />
            </div>
        </>
    )

}