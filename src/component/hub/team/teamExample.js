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
    const [mail, setMail] = useState({
        items: [""],
        value: "",
        error: null
    });
    // setMail({ items: ['ff@hhh.hh'] })
    // state = {
    //     items: [],
    //     value: "",
    //     error: null
    // };

    function handleKeyDown(evt) {
        if (["Enter", "Tab", ","].includes(evt.key)) {
            evt.preventDefault();
            // ?????????????????
            // מה זה אומר this 
            // האם אפשר להשמיט אותו בהקשר פה? 
            var value = mail.value.trim();
            console.log(value);
            if (value && isValid(value)) {
                if (mail.items) {
                    setMail({
                        items: [...mail.items, mail.value],
                        value: ""
                    });
                }

                else setMail({
                    items: [mail.value],
                    value: ""
                });
            }
        }
    };
    // const handleChange = evt => {
    //     this.setMail({
    //         value: evt.target.value,
    //         error: null
    //     });
    // };




    // handleDelete = item => {
    //     this.setMail({
    //         items: this.mail.items.filter(i => i !== item)
    //     });
    // };

    function handlePaste(evt) {
        evt.preventDefault();

        var paste = evt.clipboardData.getData("text");
        var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

        if (emails) {
            var toBeAdded = emails.filter(email => !isInList(email));

            setMail({
                // items: [...mail.items, ...toBeAdded]
                items: [...mail.items, ...toBeAdded]
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
            setMail({ error });

            return false;
        }

        return true;
    }

    function isInList(email) {
        if (mail.items)
            return mail.items.includes(email);
        else return false
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

                    {/* {this.mail.items.map(item => (
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
                        className={`inputMails ${mail.error ? "has-error" : null}`}
                        // value={this.mail.value}
                        placeholder="Type or paste email addresses and press `Enter`..."
                        onKeyDown={(e) => handleKeyDown(e)}
                        // onKeyDown={this.handleKeyDown}
                        // onChange={handleChange}
                        onChange={(e) => setMail({ value: e.target.value })}

                        onPaste={(e) => handlePaste(e.target.value)}
                    />

                    {/* {this.mail.error && <p className="error">{this.mail.error}</p>} */}


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



