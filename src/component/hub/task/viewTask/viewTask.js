import React from 'react'

export function ViewTask(props) {
    return (
        <>
            <div className="continer">
                <div className="row">
                    <div className="col">{props.task.subject}</div>
                </div>
            </div>
        </>
    )
}