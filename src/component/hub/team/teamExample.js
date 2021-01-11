import React, { useState } from 'react'
import ReactDOM from "react-dom";

import "./style.css";
import { Button, Modal, Form } from 'react-bootstrap';
// קישור מאיפה שלקחתי את הקוד
// https://codesandbox.io/s/ypyxr11109?from-embed=&file=/src/index.js:1094-1101&resolutionWidth=609&resolutionHeight=675
export default function TeamExample(props) {

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [mail, setMail] = useState({
        items: [],
        value: "",
        error: null
    });


    function handleKeyDown(evt) {
        if (["Enter", "Tab", ","].includes(evt.key)) {
            evt.preventDefault();
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




    function handleDelete(item) {
        setMail({
            items: mail.items.filter(i => i !== item)
        });
    };

    function handlePaste(evt) {
        evt.preventDefault();
        debugger
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
            setMail({ error: error, ...mail.value, items: [...mail.items] });

            return false;
        }

        return true;
    }

    function isInList(email) {
        // if (mail.items)
        return mail.items.includes(email);
        // else return false
    }

    function isEmail(email) {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Share
        </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>shared workspace:
                    {" " + props.nameWorkspace}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    {mail.items && mail.items[0] ? mail.items.map(item => (
                        <div className="tag-item" key={item}>
                            {item}
                            <button
                                type="button"
                                className="buttonMail"
                                onClick={() => handleDelete(item)}
                            >
                                &times;
            </button>
                        </div>
                    )) : null}

                    <input
                        className={`inputMails ${mail.error ? "has-error" : null}`}
                        value={mail.value}
                        placeholder="Type or paste email addresses and press `Enter`..."
                        onKeyDown={(e) => handleKeyDown(e)}
                        onChange={(e) => setMail({ value: e.target.value, items: [...mail.items], error: null })}

                        onPaste={(e) => handlePaste(e.target.value)}
                    />

                    {mail.error && <p className="error">{mail.error}</p>}


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



