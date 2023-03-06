import React, { useState } from 'react';
import {Button} from "../ui/Button";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {FormField} from "../../helpers/formField";
import 'styles/views/Modal.scss';
import {Alert} from "react-bootstrap";


const ProfileEdit = props => {
    const [show, setShow] = useState(false);
    const [editValues, setEditValues] = useState({ username: props.username, birthday: props.birthday});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [notification, setNotification] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "username" && /\s/.test(value)) {
            setNotification(true);
            return; // Do not update the state if the first name contains spaces
        } else {
            setNotification(false);
        }

        setEditValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submit = () => {
        props.submit(editValues);
        handleClose();
    }

    return (
        <>
            <Button width="100%" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit your information</Modal.Title>
                </Modal.Header>
                <Modal.Body className={"customModal customContainer"} >
                    <Form>
                        <FormField
                        label="Username"
                        type="text"
                        name="username"
                        value={editValues.username}
                        onChange={handleChange}
                    />
                        {notification && <Alert variant={"danger"}>Spaces in the username are not allowed!</Alert>}
                        <FormField
                            label="Birthday"
                            type="date"
                            name="birthday"
                            value={editValues.birthday}
                            onChange={handleChange}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={!editValues.username} onClick={submit}>
                        Edit user
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}; export default ProfileEdit;