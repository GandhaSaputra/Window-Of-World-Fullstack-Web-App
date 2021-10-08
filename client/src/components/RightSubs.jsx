import React, { useContext, useState } from 'react'

import { attache, smallWow } from '../assets/assets';
import {Form, Button} from 'react-bootstrap';
import { UserContext } from '../config/UserContext/UserContext';
import ModalSubs from './modal/ModalSubs';

const RightSubs = () => {

    const [showModalSubs, setShow] = useState(false);
    const handleCloseModalSubs = () => setShow(false);
    const handleShowModalSubs = () => setShow(true);

    const [state, dispatch] = useContext(UserContext);

    const user = state.user;

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const accountNumber = document.getElementById('accNumb').value;
        user.accNumber = accountNumber;
        user.statusSubs = 'Subscribed';

        dispatch({
            type: 'SUBSCRIBED',
            payload: user
          });
    }

    // console.log(user)

    return (
        <div className="right right-subs">
            <div className="subs-box">
                <p className="subs-box-title">Premium</p>
                <p className="subs-box-desc">Pay now and access all the latest books from <img src={smallWow} alt="wow"/></p> 
                <p className="subs-box-number"><img src={smallWow} alt="wow"/> : 0981312323</p>
                <Form onSubmit={handleOnSubmit}>
                    <Form.Group className="mb-3" controlId="formAccountNumber">
                        <Form.Control className="input-subs" id="accNumb" type="text" placeholder="Input Your Account Number" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTransferProof">
                        <Form.Label className="file-label" for="file">Attache proof of transfer <img className="attache-icon" src={attache} alt="attache"/></Form.Label>
                        <Form.Control type="file" placeholder="Password" id="file" hidden/>
                    </Form.Group>

                    <Button type="submit" variant="danger" className="btn-submit-send" onClick={handleShowModalSubs}>
                        Send
                    </Button>
                </Form>
            </div>
            <ModalSubs show={showModalSubs} onHide={handleCloseModalSubs}/>
        </div>
    )
}

export default RightSubs
