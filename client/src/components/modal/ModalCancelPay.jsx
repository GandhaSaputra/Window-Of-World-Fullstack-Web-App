import React from 'react'
import { useHistory } from 'react-router';
import { Modal } from 'react-bootstrap'
const ModalCancelPay = (props) => {

    let history = useHistory()

    const handleToChat = () => {
        history.push('/chat')
    }

    return (
        <>
            <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body className="text-center">
                    <p
                        style={{
                            color: "#383838",
                            fontSize: "24px",
                            fontWeight: "500",
                            marginTop: "20px",
                        }}
                    >
                        You have made a transaction but it was not approved by our admin. <br /> Please chat admin to confirm, click <strong style={{ cursor: "pointer" }} onClick={handleToChat}>here</strong> to go to the chat page
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalCancelPay
