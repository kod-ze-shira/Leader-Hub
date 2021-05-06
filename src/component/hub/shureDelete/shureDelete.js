import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import './shureDelete.css'
import { actions } from '../../../redux/actions/action'
import { Button, Modal } from 'react-bootstrap';
import $ from 'jquery'

const mapStateToProps = (state) => {
    return {
        // close: state.public_reducer.close,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    function SureDelete(props) {


        let type = props.type ? props.type : 'object'

        const [show, setShow] = useState(true);

        const handleClose = () => {
            setShow(false)
            // $('.modal-backdrop').css('background-color', '#000')
        };
        const handleShow = () => {
            setShow(true);
            // $('.modal-backdrop').css({ 'background-color': '#00000059' })
        }
        function deleteObject() {
            setShow(false)
            $(`#${props.object._id}`).css("display", "none")
            // props.setShowToastDeleteWhenClickDelete({ 'type': props.type, 'object': props.object })

        }
        return (
            <>
                {/* <Button variant="primary" onClick={handleShow}>
                    Launch static backdrop modal
            </Button> */}

                <Modal
                    show={show}
                    size="sm"
                    onHide={handleClose}
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
                        <Button className='cancelModalDelete' onClick={handleClose}>
                            Cancel
                </Button>
                        <Button className='deleteInModalDelete' onClick={() => deleteObject()}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );

    })




