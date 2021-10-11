import React from 'react'

import {Modal, Form, Button} from 'react-bootstrap'

const ModalEditProfile = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.onHide} className="modal-signin" centered>
                <Modal.Title>Edit Profile</Modal.Title>
                <Modal.Body>
                    <Form>
                        <Form.Group style={{background:"#bcbcbc40", }}>
                            <Form.Label as="legend" column sm={2}>Gender </Form.Label>
                            <Form.Check label="Male" type="radio" name="gender-radio" inline/>
                            <Form.Check label="Female" type="radio" name="gender-radio" inline/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control className="input-signin" id="password" value="" name="password" onChange="" type="password" placeholder="Password"/>
                        </Form.Group>
                        <Button variant="danger" type="submit" className="btn-submit-signup">
                            Sing In
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalEditProfile
