import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {FormField} from "../../helpers/formField";
import 'styles/views/Modal.scss';


const ProfileEdit = props => {
    const [show, setShow] = useState(false);
    const [editValues, setEditValues] = useState({ username: props.username, birthday: props.birthday});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (event) => {
        const { name, value } = event.target;
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
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
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
                    <Button variant="primary" onClick={submit}>
                        Edit user
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}; export default ProfileEdit;