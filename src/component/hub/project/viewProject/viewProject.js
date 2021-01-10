import React from 'react'

export function ViewProject(project) {
    
    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <div>{project.name}</div>
                </div>
            </div>
        </div>
        </>
    )
}
