import React from 'react'
export function ToastDelete() {
    return (
        <>
            <Toast className="toast_delete"
                onClose={DeleteWorkspace}
                show={showToast}
                delay={10000} autohide>
                {/* <span
            className="close_remove"
            onClick={out_remove_workspace}>×</span> */}

                <Toast.Header className="tost" closeButton={false}>

                    <div className="row">
                        <div className="col-4">
                            <div className="pr-2"></div>
                        </div>
                        <div className="col-10">
                            {workspace.name} was deleted
                    </div>
                        <div className="col-4 div_btn_undo pr-2">
                            <button className="btn_undo" onClick={() => { setShowToast(false); setDeleted(false) }}>Undo</button>
                        </div>
                    </div>
                </Toast.Header>
            </Toast>
        </>
    )
}

