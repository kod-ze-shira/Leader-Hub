import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './shureDelete.css';



export default function SureDelete(props) {
    // let i = props.objectToDelete.length?props.objectToDelete.length-1:props.objectToDelete.length
    let type = props.objectToDelete.type ? props.objectToDelete.type : 'object'

    const [showModal, setShowModal] = useState(true);
    useEffect(() => {
        // setShowModal(props.showModal)

    }, [props.showModal])

    function deleteObject() {
        // setShowModal(false)
        props.closeModal(false)

        if (props.objectToDelete.type === "Card") {
            $(`#${props.objectToDelete.object._id} `).css({ "display": "none" })
            // $(`#${props.objectToDelete.object._id} `).addClass("displayNone")
            $(`#${props.objectToDelete.object._id} `).removeClass("mt-4")
            $(`#${props.objectToDelete.object._id} `).removeClass("col-3")
        }
        else $(`#${props.objectToDelete.object._id}`).css("display", "none")

        props.showToastDelete(true)
    }


    return (
        <>
            <Modal
                show={showModal}
                size="sm"
                onHide={(e) => props.closeModal(false)}
                backdrop="static"
                keyboard={false}
                className='borderTop'
            >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    Are you shure you want to delete this {type}?
                </Modal.Body>
                <Modal.Footer className='justify-content-between'>
                    <Button className='cancelModalDelete' onClick={(e) => props.closeModal(false)}>
                        Cancel
                    </Button>
                    <Button className='deleteInModalDelete' onClick={(e) => deleteObject()}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}




