import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalHaveTransaction = (props) => {
    return (
        <>
            <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body className="text-center">
                    <p
                        style={{
                            color: "#0cad37",
                            fontSize: "24px",
                            fontWeight: "500",
                            marginTop: "20px"
                        }}
                    >
                        You have made a transaction
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalHaveTransaction
