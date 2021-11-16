import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalInsertFile = (props) => {
    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className="text-center">
                    <p
                        style={{
                            color: "#D60000",
                            fontSize: "24px",
                            fontWeight: "500",
                            marginTop: "20px"
                        }}
                    >
                        Please attache file to upload!
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalInsertFile
