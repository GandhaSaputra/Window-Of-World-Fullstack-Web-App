import React, {useEffect, useState} from 'react'

import {Modal, Form, Button} from 'react-bootstrap'
import { useHistory, Redirect } from 'react-router'
import { AttacheGrey } from '../../assets/assets'
import { API } from '../../config/api/api'

const ModalEditProfile = (props) => {
    let history = useHistory();
    const [previewAvatar, setPreviewAvatar] = useState(null);

    const [form, setForm] = useState({
        gender: "",
        phone: "",
        address: "",
        userPhoto: "",
    });

    const getProfile = async () => {
        try {
            const response = await API.get('/get-user-profile/');
            setForm({
                phone: response.data.data.phone,
                address: response.data.data.address,
                userPhoto: response.data.data.userPhoto,
            })
        } catch (error) {
            console.log(error)
        }
    };

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
        if (e.target.type === "file") {
          setPreviewAvatar(e.target.files);
        }
    };

    console.log(previewAvatar)

    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
          const config = {
            headers: {
              "Content-type": "multipart/form-data",
            },
          };
  
          const formData = new FormData();
          formData.set("gender", form.gender);
          formData.set("phone", form.phone);
          formData.set("address", form.address);
          formData.set("userPhoto", form.userPhoto[0], form.userPhoto[0]?.name);
  
          const response = await API.patch('/update-profile', formData, config);
          console.log(response);
          props.getProfile();
          props.onHide();
          history.push('/home')
  
        } catch (error) {
          console.log(error)
        }
    };

    useEffect(() => {
        getProfile();
    }, [])

    return (
        <>
            <Modal show={props.show} onHide={props.onHide} className="modal-signin" centered>
                <Modal.Title>Edit Profile</Modal.Title>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group style={{background:"#bcbcbc40"}} className="input-gender">
                            <Form.Label column sm={2} style={{display: "inline"}}>Gender : </Form.Label>
                            <Form.Check label="Male" type="radio" name="gender" value="Male" onChange={handleChange} inline/>
                            <Form.Check label="Female" type="radio" name="gender" value="Female" onChange={handleChange} inline/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Control className="input-phone" id="phone" value={form.phone}  name="phone" type="text" placeholder="Phone" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Control as="textarea" className="input-address" value={form.address} id="address"  name="address" type="text" placeholder="Address" onChange={handleChange}/>
                        </Form.Group>
                        {!previewAvatar ? (
                                <div>
                                    <img
                                    src={form.userPhoto}
                                    style={{
                                        maxWidth: "200px",
                                        maxHeight: "200px",
                                        objectFit: "cover",
                                        marginBottom: "10px",
                                        marginLeft: "20px"
                                    }}
                                    alt="preview"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <img
                                    src={URL.createObjectURL(previewAvatar[0])}
                                    style={{
                                        maxWidth: "200px",
                                        maxHeight: "200px",
                                        objectFit: "cover",
                                        marginBottom: "10px",
                                        marginLeft: "20px"
                                    }}
                                    alt="preview"
                                    />
                                </div>
                        )}
                        <Form.Group className="mb-3" controlId="formAttacheAvatar">
                            <Form.Label className="input-label-user-photo" for="uploadAvatar">Change Avatar <img className="attache-icon-add-book" src={AttacheGrey} alt="attache"/></Form.Label>
                            <Form.Control type="file" placeholder="avatar" id="uploadAvatar" name="userPhoto" onChange={handleChange} hidden/>
                        </Form.Group>
                        <Button variant="danger" type="submit" className="btn-submit-signup">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalEditProfile
