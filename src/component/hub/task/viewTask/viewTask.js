import React from 'react'

export function ViewTask(props) {
    return (
        <>
            <div className="continer">
                <div className="row">
                    <div className="col-2">subject:{props.task.subject}</div>
                    <div className="col"><button>view details</button></div>
                </div>
            </div>
        </>
    )
}