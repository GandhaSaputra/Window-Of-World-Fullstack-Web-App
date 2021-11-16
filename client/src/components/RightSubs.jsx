import React, { useContext, useState } from 'react'
import { attache, smallWow } from '../assets/assets';
import { Form, Button } from 'react-bootstrap';
import ModalSubs from './modal/ModalSubs';
import { API } from '../config/api/api';
import ModalInsertFile from './modal/ModalInsertFile';
import { UserContext } from '../config/UserContext/UserContext';
import ModalPending from './modal/ModalPending';
import ModalHaveTransaction from './modal/ModalHaveTransaction';
import ModalCancelPay from './modal/ModalCancelPay';

const RightSubs = () => {
    const [showModalPending, setShowModalPending] = useState(false)
    const [showModalInsertFile, setShowModalInsertFile] = useState(false);
    const [showModalSubs, setShowModalSubs] = useState(false);
    const [showModalHaveTransaction, setShowModalHaveTransaction] = useState(false);
    const [showModalCancel, setShowModalCancel] = useState(false)

    const [state] = useContext(UserContext);

    // variable state to handle preview image
    const [preview, setPreview] = useState(null);

    //variabel state to store form value
    const [form, setForm] = useState({
        accountNumber: "",
        transferProof: null,
    });

    //handle form value change
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

    // handle submit form
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        // variable config
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
            },
        };

        //create new FormData classes to handle file upload
        const formData = new FormData();

        // if file image not attache => show modal insert file
        if (form.transferProof === null) {
            setShowModalInsertFile(true)
            setPreview(null)
            setForm({
                accountNumber: "",
                transferProof: null,
            })
        } else {
            const transactionCheck = await API.get(`/transaction/${state.user.id}`)
            //if the user has made a transaction but it has not been approved by the admin => show modal pending
            if (transactionCheck?.data?.data?.transaction?.paymentStatus === "Pending") {
                setShowModalPending(true)
                setPreview(null)
                setForm({
                    accountNumber: "",
                    transferProof: null,
                })
                //if the user has made a transaction and has been approved by the admin => show modal have transaction
            } else if (transactionCheck?.data?.data?.transaction?.paymentStatus === "Approved") {
                setShowModalHaveTransaction(true)
                setPreview(null)
                setForm({
                    accountNumber: "",
                    transferProof: null,
                })
            } else if (transactionCheck?.data?.data?.transaction?.paymentStatus === "Cancel") {
                setShowModalCancel(true)
                setPreview(null)
                setForm({
                    accountNumber: "",
                    transferProof: null,
                })
            } else {
                formData.set("transferProof", form.transferProof[0], form.transferProof[0].name);
                const response = await API.post('/transaction', formData, config);
                console.log(response);
                setPreview(null)
                setForm({
                    accountNumber: "",
                    transferProof: null,
                })
                setShowModalSubs(true);
            }
        }
    }


    return (
        <div className="right right-subs">
            <div className="subs-box">
                <p className="subs-box-title">
                    Premium
                </p>
                <p className="subs-box-desc">
                    Pay now and access all the latest books from
                    <img
                        src={smallWow}
                        alt="wow"
                    />
                </p>
                <p className="subs-box-number">
                    <img
                        src={smallWow}
                        alt="wow"
                    /> : 0981312323
                </p>

                <Form onSubmit={handleOnSubmit}>
                    <Form.Group
                        className="mb-3"
                        controlId="formAccountNumber"
                    >
                        <Form.Control
                            required
                            className="input-subs"
                            value={form.accountNumber}
                            id="accNumb"
                            type="number"
                            name="accountNumber"
                            onChange={handleChange}
                            placeholder="Input Your Account Number"
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formTransferProof"
                    >
                        <Form.Label
                            className="file-label"
                            for="file"
                        >
                            Attache proof of transfer
                            <img
                                className="attache-icon"
                                src={attache}
                                alt="attache" />
                        </Form.Label>

                        <Form.Control
                            type="file"
                            id="file"
                            name="transferProof"
                            onChange={handleChange}
                            hidden
                        />

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

                    <Button
                        type="submit"
                        variant="danger"
                        className="btn-submit-send"
                    >
                        Send
                    </Button>

                </Form>
            </div>

            <ModalSubs
                show={showModalSubs}
                onHide={() => setShowModalSubs(false)}
            />

            <ModalPending
                show={showModalPending}
                onHide={() => setShowModalPending(false)}
            />

            <ModalInsertFile
                show={showModalInsertFile}
                onHide={() => setShowModalInsertFile(false)}
            />

            <ModalHaveTransaction
                show={showModalHaveTransaction}
                onHide={() => setShowModalHaveTransaction(false)}
            />

            <ModalCancelPay
                show={showModalCancel}
                onHide={() => setShowModalCancel(false)}
            />

        </div>
    )
}

export default RightSubs
