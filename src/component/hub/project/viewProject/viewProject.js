import React, { useState } from 'react'
import TasksByProject from '../../task/tasksByProject/tasksByProject'
import DetailsProject from '../detailsProject/detailsProject'
import ReactDOM from 'react-dom'

export default function ViewProject(props) {
    function detailsProject() {
        set_getProjectById(false);
    }
    const [getProjectById, set_getProjectById] = useState(true);
    const [viewTasks, setViewTasks] = useState(false)
    return(
        <>
      <div className="container">
                {getProjectById ?
                        <div className="col-2"><button onClick={detailsProject}>projectDEtels</button></div>
                    : <DetailsProject projectId={props.project._id} />
                        

                    }
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





// import ReactDOM from 'react-dom'
// import React, { useState } from 'react'
// import TasksByProject from '../../task/tasksByProject/tasksByProject'
// import DetailsProject from '../detailsProject/detailsProject'

// // function detailsProject() {
// //     setViewTasks(false);
// // }

// export default function ViewProject(props) {
//     // const [getProjectById, set_getProjectById] = useState(true);
//     const [viewTasks, set_ViewTasks] = useState(false);
//     return (
//         <>

//             <div className="container">
//                 <div className="row" onClick={() => setViewTasks(!viewTasks)}>
//                     <div className="col-2">
//                         <div>name:{props.project.name}</div>
//                         <div>description:{props.project.description}</div>
//                     </div>

//                     {/* {getProjectById ?
//                         <div className="col-2"><button onClick={detailsProject}></button></div>
//                         : <DetailsProject />

//                     } */}
//                 </div>
//                 <div>
//                     {viewTasks ? <TasksByProject projectId={props.project._id} /> : null}
//                 </div>
//             </div>
//         </>
//     )
// }
