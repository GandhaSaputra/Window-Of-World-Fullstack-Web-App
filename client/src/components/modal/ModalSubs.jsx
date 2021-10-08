import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalSubs = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide} centered >
          <Modal.Body><p className="subs-modal-text">Thank you for subscribing to premium, your premium package will be active after our admin approves your transaction, thank you</p></Modal.Body>
        </Modal>
    )
}

export default ModalSubs
