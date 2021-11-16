import React from 'react'
import { Modal } from 'react-bootstrap'
import { useHistory } from 'react-router';

const ModalPending = (props) => {
    let history = useHistory();

    const handleToChat = () => {
        history.push('/chat')
    }

    return (
        <>
            <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body className="text-center">
                    <p
                        style={{
                            color: "#a3a31a",
                            fontSize: "24px",
                            fontWeight: "500",
                            marginTop: "20px"
                        }}
                    >
                        Your transaction is being processed by admin, please wait or click <strong style={{ cursor: "pointer" }} onClick={handleToChat}>here</strong> to ask the admin
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalPending
