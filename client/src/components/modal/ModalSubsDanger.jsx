import React from 'react'

import { Modal } from 'react-bootstrap'

const ModalSubsDanger = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide} centered >
          <Modal.Body><p className="subs-modal-text-danger">Please make a payment to read the latest books</p></Modal.Body>
        </Modal>
    )
}

export default ModalSubsDanger
