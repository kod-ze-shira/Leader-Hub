import React, { useState } from 'react'
// import Button from 'react-bootstrap/Button';
import ReactDOM from "react-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

import "./style.css";
import { Button, Modal, Form } from 'react-bootstrap';

export default function TeamExample() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let [state, setState] = useState(false);

    state = {
        items: [],
        value: "",
        error: null
    };

    function handleKeyDown(evt) {
        if (["Enter", "Tab", ","].includes(evt.key)) {
            evt.preventDefault();

            var value = this.state.value.trim();

            if (value && this.isValid(value)) {
                this.setState({
                    items: [...this.state.items, this.state.value],
                    value: ""
                });
            }
        }
    };
    // const handleChange = evt => {
    //     this.setState({
    //         value: evt.target.value,
    //         error: null
    //     });
    // };

    // handleKeyDown = evt => {
    //     if (["Enter", "Tab", ","].includes(evt.key)) {
    //         evt.preventDefault();

    //         var value = this.state.value.trim();

    //         if (value && isValid(value)) {
    //             this.setState({
    //                 items: [...this.state.items, this.state.value],
    //                 value: ""
    //             });
    //         }
    //     }
    // };



    // handleDelete = item => {
    //     this.setState({
    //         items: this.state.items.filter(i => i !== item)
    //     });
    // };

    function handlePaste(evt) {
        evt.preventDefault();

        var paste = evt.clipboardData.getData("text");
        var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

        if (emails) {
            var toBeAdded = emails.filter(email => !isInList(email));

            this.setState({
                items: [...this.state.items, ...toBeAdded]
            });
        }
    }

    function isValid(email) {
        let error = null;

        if (isInList(email)) {
            error = `${email} has already been added.`;
        }

        if (!isEmail(email)) {
            error = `${email} is not a valid email address.`;
        }

        if (error) {
            this.setState({ error });

            return false;
        }

        return true;
    }

    function isInList(email) {
        return this.state.items.includes(email);
    }

    function isEmail(email) {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Share
        </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>shared workspace</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.

                    {/* {this.state.items.map(item => (
                    <div className="tag-item" key={item}>
                        {item}
                        <button
                            type="button"
                            className="buttonMail"
                        // onClick={() => this.handleDelete(item)}
                        >
                            &times;
            </button>
                    </div>
                ))} */}
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                    </Form>
                    <input
                        className={"inputMails "}
                        //+ (this.state.error && " has-error")}
                        // value={this.state.value}
                        placeholder="Type or paste email addresses and press `Enter`..."
                        onKeyDown={(e) => handleKeyDown(e)}
                        // onKeyDown={this.handleKeyDown}
                        // onChange={handleChange}
                        onChange={(e) => setState({ value: e.target.value })}

                        onPaste={(e) => handlePaste(e.target.value)}
                    />

                    {/* {this.state.error && <p className="error">{this.state.error}</p>} */}


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary">add teams</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



