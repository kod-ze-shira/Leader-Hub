import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'

export default function ToastDelete1(props) {
    // const [nameDeleted,setNameDeleted]=useState("")
    return (
        <>
         {/* <ToastDelete toOnClose={deleteOrganization}
                toShow={showToast} name={organization.organizationName}></ToastDelete> */}
            <Toast className="toast_delete"
                onClose={props.toOnClose}
                show={props.toShow} delay={3000} autohide>

                <Toast.Header className="toast_header" closeButton={false}>
                    <div className="row">
                        <div className="col-4">
                            <div className="pr-2">{props.name}</div>
                        </div>
                        <div className="col-4">
                            <span className="pr-2">was deleted</span>
                        </div>
                        <div className="col-4 div_btn_undo pr-2">
                            <button className="btn_undo" 
                            onClick={() => { props.toSetShowToastDelete();
                            //  props.toSetDeleted() 
                             }}>Undo</button>
                        </div>
                    </div>




                </Toast.Header>
                {/* <Toast.Body>was deleted</Toast.Body> */}
            </Toast>
        </>
    )
}