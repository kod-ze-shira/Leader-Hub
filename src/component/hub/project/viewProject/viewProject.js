import React, { useState } from 'react'
import TasksByProject from '../../task/tasksByProject/tasksByProject'

export function ViewProject(props) {
    const [viewTasks, setViewTasks] = useState(false)
    return(
        <>
        <div className="container">
            <div className="row" onClick={()=>setViewTasks(!viewTasks)}>
                <div className="col">
                    <div>name:{props.project.name}</div>
                    <div>description:{props.project.description}</div>
                </div>
            </div>
            <div>
          {viewTasks ? <TasksByProject projectId={props.project._id} /> : null}
        </div>
        </div>
        </>
    )
}
