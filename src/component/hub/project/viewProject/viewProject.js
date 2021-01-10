import React, { useState } from 'react'
import tasksByProject from '../../task/tasksByProject/tasksByProject'

export function ViewProject(props) {
    const [viewTasks, setViewTasks] = useState(false)
    return(
        <>
        <div className="container" onClick={()=>setViewTasks(!viewTasks)}>
            <div className="row">
                <div className="col">
                    <div>name:{props.project.name}</div>
                    <div>description:{props.project.description}</div>
                </div>
            </div>
            <div>
          {viewTasks ? <tasksByProject projectId={props.project._id} /> : null}
        </div>
        </div>
        </>
    )
}
