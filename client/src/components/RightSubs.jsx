import React, { useContext, useState } from 'react'

import { attache, smallWow } from '../assets/assets';
import {Form, Button} from 'react-bootstrap';
import { UserContext } from '../config/UserContext/UserContext';
import ModalSubs from './modal/ModalSubs';
import { API } from '../config/api/api';

const RightSubs = () => {

    const [showModalSubs, setShow] = useState(false);
    const handleCloseModalSubs = () => setShow(false);
    const handleShowModalSubs = () => setShow(true);

    // const [state, dispatch] = useContext(UserContext);

    const [preview, setPreview] = useState(null);

    // const user = state.user;

    const [form, setForm] = useState({
        transferProof: "",
    });

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
        if (e.target.type === "file") {
          const url = URL.createObjectURL(e.target.files[0]);
          setPreview(url);
        }
    };
    

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        
        const config = {
            headers: {
              "Content-type": "multipart/form-data",
            },
        };

        const formData = new FormData();
        formData.set("transferProof", form.transferProof[0], form.transferProof[0].name);

        const response = await API.post('/transaction', formData, config);
        console.log(response);

        // history.push("/admin");
    }

    // console.log(user)

    return (
        <div className="right right-subs">
            <div className="subs-box">
                <p className="subs-box-title">Premium</p>
                <p className="subs-box-desc">Pay now and access all the latest books from <img src={smallWow} alt="wow"/></p> 
                <p className="subs-box-number"><img src={smallWow} alt="wow"/> : 0981312323</p>
                <Form.Group className="mb-3" controlId="formAccountNumber">
                    <Form.Control className="input-subs" id="accNumb" type="text" placeholder="Input Your Account Number" />
                </Form.Group>
                <Form onSubmit={handleOnSubmit}>
                    <Form.Group className="mb-3" controlId="formTransferProof">
                        <Form.Label className="file-label" for="file">Attache proof of transfer <img className="attache-icon" src={attache} alt="attache"/></Form.Label>
                        <Form.Control type="file" id="file" name="transferProof" onChange={handleChange} hidden/>
                    </Form.Group>
                    {preview && (
                        <div>
                            <img
                            src={preview}
                            style={{
                                maxWidth: "250px",
                                maxHeight: "250px",
                                objectFit: "cover",
                                marginBottom: "10px",
                                marginLeft: "160px"
                            }}
                            alt="preview"
                            />
                        </div>
                    )}
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
