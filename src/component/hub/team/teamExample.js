import React, { useState } from 'react'
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action'
import "./style.css";
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
// קישור מאיפה שלקחתי את הקוד
// https://codesandbox.io/s/ypyxr11109?from-embed=&file=/src/index.js:1094-1101&resolutionWidth=609&resolutionHeight=675
// export default
function TeamExample(props) {
    const [show, setShow] = useState(true);
    const [permission, setPermission] = useState('viewer');
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [team, setTeam] = useState({
        name: '',
        emailAndPermissionsArr: [],
        errorMail: null,
        errorName: false,
        value: "",
    })

    function handleKeyDown(evt) {
        if (["Enter", "Tab", ","].includes(evt.key)) {
            evt.preventDefault();
            var value = team.value.trim();
            if (value && isValid(value)) {
                if (team.emailAndPermissionsArr) {
                    setTeam({
                        emailAndPermissionsArr: [...team.emailAndPermissionsArr, { email: team.value, permission: permission }],
                        value: "",
                        errorMail: team.errorMail,
                        name: team.name,
                        errorName: team.errorName
                    });

                }
                else setTeam({
                    emailAndPermissionsArr: [{ email: team.value, permission: permission }],
                    value: "",
                    errorMail: team.errorMail,
                    name: team.name,
                    errorName: team.errorName
                });
                setPermission('viewer');
            }
        }
    }

    function handleDelete(item) {
        setTeam({
            emailAndPermissionsArr: team.emailAndPermissionsArr.filter(i => i.email !== item)
        });

    }

    function handlePaste(evt) {
        evt.preventDefault();
        debugger
        var paste = evt.clipboardData.getData("text");
        var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

        if (emails) {
            var toBeAdded = emails.filter(email => !isInList(email));

            setTeam({
                emailAndPermissionsArr: [...team.emailAndPermissionsArr, ...toBeAdded]
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
                emailAndPermissionsArr: [...team.emailAndPermissionsArr],
                name: team.name,
                errorName: team.errorMail
            });
            return false;
        }

        return true;
    }

    function isInList(email) {

        return team.emailAndPermissionsArr.find(el => el.email == email)

    }

    function isEmail(email) {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }

    function addTeam(props) {
        if (!team.name) {
            setTeam({
                errorName: true,
                emailAndPermissionsArr: [...team.emailAndPermissionsArr],
                errorMail: team.errorMail,
                value: team.value
            })

        }
        else {
            setTeam({
                name: team.name,
                errorName: false,
                emailAndPermissionsArr: [...team.emailAndPermissionsArr],
                errorMail: team.errorMail,
                value: team.value
            })
            console.log(`add tem: ${team.name}, members: ${team.emailAndPermissionsArr}`)
            props.createNewTeam({ teamName: team.name, emailAndPermissionsArr: [...team.emailAndPermissionsArr] })
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
                                emailAndPermissionsArr: [...team.emailAndPermissionsArr],
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
                    <Button className={permission == 'admin' ? "choose" : ""}
                        onClick={() => setPermission('admin')} variant="primary">
                        admin
                    </Button>
                    <br />
                    {team.emailAndPermissionsArr && team.emailAndPermissionsArr[0] ? team.emailAndPermissionsArr.map(item => (
                        <div className="tag-item" key={item.email}>
                            {item.email}
                            <button
                                type="button"
                                className="buttonMail"
                                onClick={() => handleDelete(item.email)}
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
                            emailAndPermissionsArr: [...team.emailAndPermissionsArr],
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
                        onClick={() => addTeam(props)}>add teams</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => {
    return {

        team: state.team_reducer.workspace,
    }
}

function mapDispatchToProps(dispatch) {
    return {//props.createNewTeam
        createNewTeam: (props) => dispatch(actions.createNewTeam(props)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamExample)