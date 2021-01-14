import React, { useState } from 'react'
import ReactDOM from "react-dom";

import "./style.css";
import { Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
// קישור מאיפה שלקחתי את הקוד
// https://codesandbox.io/s/ypyxr11109?from-embed=&file=/src/index.js:1094-1101&resolutionWidth=609&resolutionHeight=675
export default function TeamExample(props) {
    const [show, setShow] = useState(true);
    const [permission, setPermission] = useState('viewer');
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [team, setTeam] = useState({
        name: '',
        items: [],
        errorMail: null,
        errorName: false,
        value: "",
    })


    function handleKeyDown(evt) {
        if (["Enter", "Tab", ","].includes(evt.key)) {
            evt.preventDefault();
            var value = team.value.trim();
            if (value && isValid(value)) {
                if (team.items) {
                    setTeam({
                        items: [...team.items, { mail: team.value, permission: permission }],
                        value: "",
                        errorMail: team.errorMail,
                        name: team.name,
                        errorName: team.errorName
                    });

                }
                else setTeam({
                    items: [{ mail: team.value, permission: permission }],
                    value: "",
                    errorMail: team.errorMail,
                    name: team.name,
                    errorName: team.errorName
                });
                setPermission('viewer');
            }
        }
    };

    function handleDelete(item) {
        setTeam({
            items: team.items.filter(i => i.mail !== item)
        });

    };

    function handlePaste(evt) {
        evt.preventDefault();
        debugger
        var paste = evt.clipboardData.getData("text");
        var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

        if (emails) {
            var toBeAdded = emails.filter(email => !isInList(email));

            setTeam({
                items: [...team.items, ...toBeAdded]
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
            setTeam({
                errorMail: error,
                ...team.value,
                items: [...team.items],
                name: team.name,
                errorName: team.errorMail
            });
            return false;
        }

        return true;
    }

    function isInList(email) {

        return team.items.find(el => el.mail == email)

    }

    function isEmail(email) {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }

    function addTeam() {
        if (!team.name) {
            setTeam({
                errorName: true,
                items: [...team.items],
                errorMail: team.errorMail,
                value: team.value
            })

        }
        else {
            setTeam({
                name: team.name,
                errorName: false,
                items: [...team.items],
                errorMail: team.errorMail,
                value: team.value
            })
            console.log(`add tem: ${team.name}, members: ${team.items}`)
        }

        //add team to server
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
                    <Modal.Title>
                        {props.nameWorkspace ? "shared workspace:" + props.nameWorkspace : "add team"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        name team
                        <FormControl
                            className={`inputName ${team.errorName ? "has-error" : null}`}

                            placeholder="name of team"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setTeam({
                                name: e.target.value,
                                errorName: false,
                                items: [...team.items],
                                errorMail: team.errorMail,
                                value: team.value
                            })}

                        />
                        {team.errorName && <p className="error">add name of team</p>}

                    </InputGroup>

                    <Button className={permission == 'viewer' ? "choose" : ""}
                        onClick={() => setPermission('viewer')} variant="primary">
                        viewer
                    </Button>
                    <Button className={permission == 'editor' ? "choose" : ""}
                        onClick={() => setPermission('editor')} variant="primary">
                        editor
                    </Button>
                    <Button className={permission == 'manager' ? "choose" : ""}
                        onClick={() => setPermission('manager')} variant="primary">
                        manager
                    </Button>
                    <br />
                    {team.items && team.items[0] ? team.items.map(item => (
                        <div className="tag-item" key={item.mail}>
                            {item.mail}
                            <button
                                type="button"
                                className="buttonMail"
                                onClick={() => handleDelete(item.mail)}
                            >
                                &times;
            </button>
                        </div>
                    )) : null}

                    <input
                        className={`inputMails ${team.errorMail ? "has-error" : null}`}
                        value={team.value}
                        placeholder="Type or paste email addresses and press `Enter`..."
                        onKeyDown={(e) => handleKeyDown(e)}
                        onChange={(e) => setTeam({
                            value: e.target.value,
                            items: [...team.items],
                            errorMail: null,
                            name: team.name,
                            errorName: team.errorName
                        })}

                        onPaste={(e) => handlePaste(e.target.value)}
                    />

                    {team.errorMail && <p className="error">{team.errorMail}</p>}


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={() => addTeam()}>add teams</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



